import {useEffect, useState, useCallback} from 'react';
import {mpos} from 'react-native-mpos-native';
import {taxEncryptionKey} from '@root/app.json';
import {Platform} from 'react-native';
import {taxApiKey as api_key} from '@root/app.json';
import {actionPagar} from '@actions/';
export const useTransaction = ({
  maquininhaSelecionada,
  setTitulo,
  setLoading,
  valorTotal,
  setMsg,
  setIc,
  setIcColor,
  tipoPagamentoValue,
  tipoPagamentoLabel,
  coleta_id,
  pop,
  ...props
}) => {
  const amount = valorTotal * 100;
  const [reconect, setReconect] = useState(false);
  const [postPagarJogoRapido, setPostPagarJogoRapido] = useState(null);
  const [erroHttpJogoRapido, setErroHttpJogoRapido] = useState(false);
  const receberEmJogoRapido = useCallback(() => {
    const _receberEmJogoRapido = async () => {
      try {
        setErroHttpJogoRapido(false);
        console.log('PAGANDO');
        await actionPagar({
          body_rsa: postPagarJogoRapido,
        });
        console.log('PAGAMENTO EFETUADO COM SUCESSO');
        setPostPagarJogoRapido(null);
        pop(2);
      } catch (_err) {
        // {mensagem}
        console.log('PAGAMENTO COM ERRO');
        console.log(_err);
        setErroHttpJogoRapido(true);
      }
    };
    if (postPagarJogoRapido) {
      console.log('TENTOU PAGAR CORRETAMENTE');
      _receberEmJogoRapido();
    }
  }, [pop, postPagarJogoRapido]);

  // Neste momento o pagamento já foi feito, e é hora de atualizar o pagamento na plataforma jogorapido
  useEffect(() => {
    receberEmJogoRapido();
  }, [postPagarJogoRapido, receberEmJogoRapido]);

  useEffect(() => {
    let timeoutBoot;
    setIc('');
    setIcColor('12');
    setTitulo('BLUETOOTH CONECTADO');
    setMsg('Prepare-se para inserir o cartão');
    try {
      mpos.createMpos(maquininhaSelecionada, taxEncryptionKey);
      timeoutBoot = setTimeout(() => {
        console.log('inicio mpos.addListeners()');
        mpos.addListeners({
          bluetoothConnected: () => {
            console.log('bluetoothConnected');
            setIc('');
            setIcColor('10');
            setMsg('Bluetooth conectado.\nInicializando o pinpad...');
            mpos.initialize();
          },
          bluetoothDisconnected: () => {
            console.log('bluetoothDisconnected');
            setIc('');
            setIcColor('04');
            setMsg('Conexão bluetooth perdida');
            setLoading(false);
            setReconect(true);
          },
          bluetoothErrored: error => {
            console.log('bluetoothErrored', error);
            setIc('');
            setIcColor('09');
            setMsg(`Erro na conexão bluetooth: [ code ${error} ]`);
            setLoading(false);
            setReconect(true);
          },
          receiveInitialization: () => {
            console.log('1) receiveInitialization');
            mpos.downloadEmvTablesToDevice(false);
            console.log('2) receiveInitialization');
            setIc('');
            setIcColor('22');
            setMsg('Verificando atualizações de tabelas');
            mpos.displayText('VERIFICANDO TABELAS');
            console.log('3) receiveInitialization');
          },
          receiveTableUpdated: () => {
            console.log('receiveTableUpdated');
            setIc('');
            setIcColor('10');
            setMsg('Inserir cartão de crédito');
            setLoading(false);
            const method = mpos.PaymentMethod[tipoPagamentoValue];
            mpos.displayText('RECEBENDO DADOS');
            mpos.payAmount(amount, method);
          },
          receiveCardHash: async result => {
            console.log('receiveCardHash', result);

            const {
              result: {localTransactionId, cardBrand},
              shouldFinishTransaction,
              cardHash: card_hash,
            } = result;
            mpos.displayText('PROCESSANDO PGTO');
            setIc('');
            setIcColor('08');
            setMsg('Dados do cartão recebido.\nCriando transação…');
            setLoading(true);
            const postPagarme = {
              amount,
              api_key,
              card_hash,
              local_time: new Date().toString(),
              split_rules: [
                {
                  recipient_id: 're_ckaso8sn309ms826d9q0zx0md',
                  percentage: 12,
                  liable: true,
                  charge_processing_fee: true,
                },
                {
                  recipient_id: 're_ck8pzsni300ax496e4y3duqix',
                  percentage: 88,
                  liable: true,
                  charge_processing_fee: true,
                },
              ],
            };
            const request = {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(postPagarme),
            };
            try {
              const {
                acquirer_response_code,
                errors,
                acquirer_id,
                authorization_code,
                tid,
                card_emv_response,
              } = await fetch(
                'https://api.pagar.me/1/transactions',
                request,
              ).then(res => res.json());
              if (shouldFinishTransaction) {
                mpos.finishTransaction(
                  true,
                  parseInt(acquirer_response_code, 10),
                  card_emv_response,
                );
              } else {
                mpos.close('PGTO EFETUADO');
              }
              if (errors !== undefined && errors.length > 0) {
                const [{message: mensagem}] = errors;
                throw {mensagem};
              }
              setIc('');
              setIcColor('22');
              setMsg('Sincronizando pagamento com JogoRápido…');
              setLoading(true);
              setPostPagarJogoRapido({
                maquina_tid: `${localTransactionId}/${acquirer_id}/${authorization_code}`,
                tipo_pagamento: tipoPagamentoLabel,
                valor: valorTotal,
                coleta_id,
                api_tid: tid,
                operadora: cardBrand,
              });
            } catch (erro) {
              console.log('3)', erro);
              const {mensagem} = erro;
              if (shouldFinishTransaction) {
                mpos.finishTransaction(false, 0, null);
              } else {
                mpos.close('PGTO RECUSADO');
              }
              setIc('');
              setIcColor('09');
              setMsg(mensagem);
              setLoading(false);
              setReconect(true);
            }
          },
          receiveFinishTransaction: () => {
            console.log('receiveFinishTransaction');
            mpos.close('PGTO ACEITO');
          },
          receiveError: error => {
            console.log('receiveError', error);
            const errorCode = Platform.OS === 'ios' ? error.code : error;
            setIc('');
            setIcColor('09');
            setMsg(`Erro ao receber os dados [ code ${errorCode} ]`);
            setLoading(false);
            mpos.close(`ERROR: ${errorCode}`);
            setReconect(true);
          },
        });
        mpos.openConnection(true);
      }, 3000);
    } catch (e) {
      console.log('Falha ao estabelecer conexão bluetooth selecionado');
      console.log(e);
      setIc('');
      setIcColor('04');
      setMsg('Falha ao estabelecer conexão bluetooth selecionado');
      setLoading(false);
      setReconect(true);
    }
    return () => {
      if (timeoutBoot !== null) {
        clearTimeout(timeoutBoot);
        timeoutBoot = null;
      }
      console.log('2) mpos.dispose()');
      mpos.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {...props, erroHttpJogoRapido, receberEmJogoRapido, reconect};
};
