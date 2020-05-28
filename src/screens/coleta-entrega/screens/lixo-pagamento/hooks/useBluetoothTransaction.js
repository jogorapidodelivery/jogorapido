import {useState, useCallback, useEffect} from 'react';
import {mpos} from 'react-native-mpos-native';
import {taxApiKey as api_key} from '@root/app.json';
import {propsMposAddEvents} from '../commands/propsMposAddEvents';
import {actionPagar} from '@actions/';
export const useBluetoothTransaction = props => {
  const {popToTop, coleta_id, total_pedido = 0} = props;
  const [receber, setReceber] = useState(parseFloat(total_pedido));
  const [creditoOuDebito, setCreditoOuDebito] = useState(null);
  const [transactionStatus, setTransactionStatus] = useState('');
  const [transactionError, setTransactionError] = useState(null);
  const [numeroDeCartoesNaTransacao, setNumeroDeCartoesNaTransacao] = useState(
    [],
  );
  useEffect(() => {
    if (transactionStatus !== '') {
      console.log(`apresentando status da transação: [${transactionStatus}]`);
    }
  }, [transactionStatus]);
  const onSubmitAmount = useCallback(() => {
    if (receber > 0 && creditoOuDebito !== null) {
      const amount = receber * 100;
      mpos.addListeners(
        propsMposAddEvents({
          setTransactionError,
          setTransactionStatus,
          amount,
          transactionError,
          receiveCardHash: async ({transaction, body_rsa, callBack}) => {
            const postPagarme = {
              amount,
              api_key,
              card_hash: transaction.cardHash,
              local_time: new Date().toString(),
            };
            console.log({postPagarme});
            try {
              const responsePagarme = await fetch(
                'https://api.pagar.me/1/transactions',
                postPagarme,
              ).then(res => res.json());
              console.log('responsePagarme.errors');
              console.log({responsePagarme: responsePagarme.errors});
              setNumeroDeCartoesNaTransacao([
                ...numeroDeCartoesNaTransacao,
                transaction,
              ]);
              callBack({type: 'sucesso', result: responsePagarme});
            } catch (erro) {
              callBack({type: 'erro', result: erro});
            }
            if (false) {
              await actionPagar({
                ...body_rsa,
                coleta_id,
                api_tid: 'Zwu7pc2GxcQe66/r7RbwGdiSvZ',
              });
              popToTop('home');
            }
          },
          creditoOuDebito,
        }),
      );
      // Inicia o fluxo de trabalho de pagamento.
      mpos.openConnection(true);
    }
  }, [
    coleta_id,
    creditoOuDebito,
    numeroDeCartoesNaTransacao,
    popToTop,
    receber,
    transactionError,
  ]);
  return {
    ...props,
    setReceber,
    onSubmitAmount,
    setCreditoOuDebito,
    creditoOuDebito,
    transactionStatus,
    transactionError,
    numeroDeCartoesNaTransacao,
  };
};
