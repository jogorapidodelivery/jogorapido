import {useEffect, useState, useCallback} from 'react';
import {bluetooth, mpos} from 'react-native-mpos-native';
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
    } else {
      console.log('TENTOU PAGAR COM NULL');
    }
  }, [pop, postPagarJogoRapido]);
  useEffect(() => {
    receberEmJogoRapido();
  }, [postPagarJogoRapido, receberEmJogoRapido]);
  useEffect(() => {
    setIc('');
    setIcColor('12');
    setTitulo('BLUETOOTH CONECTADO');
    setMsg('Prepare-se para inserir o cartão');
    const onTransactionSuccess = (transaction, shouldFinishTransaction) => {
      if (shouldFinishTransaction) {
        mpos.finishTransaction(
          true,
          parseInt(transaction.acquirer_response_code, 10),
          transaction.card_emv_response,
        );
      } else {
        mpos.close('PAGAMENTO EFETUADO');
      }
    };

    const onTransactionError = shouldFinishTransaction => {
      if (shouldFinishTransaction) {
        mpos.finishTransaction(false, 0, null);
      } else {
        mpos.close('PAGAMENTO RECUSADO');
      }
    };
    console.log('0) mpos.createMpos(maquininhaSelecionada, taxEncryptionKey)');
    mpos.createMpos(maquininhaSelecionada, taxEncryptionKey);
    let timeout = null;
    let timeoutBoot = setTimeout(() => {
      timeout = setTimeout(() => {
        timeout = null;
        setLoading(false);
        setMsg('Falha ao processar o pagamento e/ou na conexão com o pinpad');
        setIcColor('12');
        setIc('');
      }, 1000 * 130);
      mpos.addListeners({
        bluetoothConnected: () => {
          setIc('');
          setIcColor('10');
          setMsg('Bluetooth conectado.\nInicializando o pinpad...');
          mpos.initialize();
        },
        bluetoothDisconnected: () => {
          setIc('');
          setIcColor('04');
          setMsg('Conexão bluetooth perdida');
          setLoading(false);
          setReconect(true);
        },
        bluetoothErrored: error => {
          setIc('');
          setIcColor('09');
          setMsg(`Erro na conexão bluetooth: [ code ${error} ]`);
          setLoading(false);
          setReconect(true);
        },
        receiveInitialization: () => {
          mpos.downloadEmvTablesToDevice(false);
          setIc('');
          setIcColor('22');
          setMsg('Verificando atualizações de tabelas');
          mpos.displayText('CHECKING UPDATES');
        },
        receiveTableUpdated: () => {
          setIc('');
          setIcColor('10');
          setMsg('Inserir cartão de crédito');
          setLoading(false);
          const method = mpos.PaymentMethod[tipoPagamentoValue];
          mpos.payAmount(amount, method);
        },
        receiveCardHash: async ({
          result: {localTransactionId, cardBrand},
          shouldFinishTransaction,
          cardHash: card_hash,
        }) => {
          if (timeout !== null) {
            clearTimeout(timeout);
            timeout = null;
          }
          mpos.displayText('PROCESSING...');
          setIc('');
          setIcColor('08');
          setMsg('Dados do cartão recebido.\nCriando transação…');
          setLoading(true);
          const postPagarme = {
            amount,
            api_key,
            card_hash,
            local_time: new Date().toString(),
          };
          const postJogoRapido = {
            maquina_tid: localTransactionId,
            tipo_pagamento: tipoPagamentoLabel,
            valor: valorTotal,
            coleta_id,
            api_tid: 'Zwu7pc2GxcQe66/r7RbwGdiSvZ',
            operadora: cardBrand,
          };
          try {
            const responsePagarme = await fetch(
              'https://api.pagar.me/1/transactions',
              postPagarme,
            ).then(res => res.json());
            onTransactionSuccess(responsePagarme, shouldFinishTransaction);
            if (responsePagarme.errors.length > 0) {
              const [{message: mensagem}] = responsePagarme.errors;
              if (false) {
                throw {mensagem, shouldFinishTransaction};
              }
            }
            setIc('');
            setIcColor('22');
            setMsg('Sincronizando pagamento com JogoRápido…');
            setLoading(true);
            setPostPagarJogoRapido(postJogoRapido);
          } catch (erro) {
            console.log('3)', erro);
            const {mensagem, codeFinishTransacttion} = erro;
            if (codeFinishTransacttion) {
              onTransactionError(codeFinishTransacttion);
            }
            setIc('');
            setIcColor('09');
            setMsg(mensagem);
            setLoading(false);
            setReconect(true);
          }
        },
        receiveFinishTransaction: () => {
          // ?
        },
        receiveError: error => {
          const errorCode = Platform.OS === 'ios' ? error.code : error;
          setIc('');
          setIcColor('09');
          setMsg(`Erro ao receber os dados [ code ${errorCode} ]`);
          setLoading(false);
          mpos.close(`ERROR: ${errorCode}`);
          setReconect(true);
        },
        receiveClose: () => {
          console.log('1) mpos.dispose()');
          mpos.dispose();
        },
      });
      mpos.openConnection(true);
    }, 1000);
    bluetooth.stopScan();
    return () => {
      if (timeoutBoot !== null) {
        clearTimeout(timeoutBoot);
        timeoutBoot = null;
      }
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      console.log('2) mpos.dispose()');
      mpos.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return {...props, erroHttpJogoRapido, receberEmJogoRapido, reconect};
};
