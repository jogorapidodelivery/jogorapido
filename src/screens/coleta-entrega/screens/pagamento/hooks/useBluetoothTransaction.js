import {useState, useCallback, useEffect} from 'react';
import {mpos} from 'react-native-mpos-native';
import {taxApiKey} from '@root/app.json';
import {propsMposAddEvents} from '../commands/propsMposAddEvents';
import {actionPagar} from '@actions/';
export const useBluetoothTransaction = ({
  push,
  pop,
  popToTop,
  coleta_id,
  total_pedido = 0,
}) => {
  const [receber, setReceber] = useState(total_pedido);
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
      push('carregando');
      mpos.addListeners(
        propsMposAddEvents({
          setTransactionError,
          setTransactionStatus,
          receber,
          transactionError,
          receiveCardHash: async ({transaction, body_rsa}) => {
            const responsePagarme = await fetch(
              'https://api.pagar.me/1/transactions',
              {
                amount: receber,
                api_key: taxApiKey,
                card_hash: transaction.cardHash,
                local_time: new Date().toString(),
              },
            ).then(res => res.json());
            console.log({...responsePagarme.errors});
            setNumeroDeCartoesNaTransacao([
              ...numeroDeCartoesNaTransacao,
              transaction,
            ]);
            if (false) {
              await actionPagar({
                ...body_rsa,
                coleta_id,
                api_tid: 'Zwu7pc2GxcQe66/r7RbwGdiSvZ',
              });
              popToTop('home');
            }
            pop();
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
    pop,
    popToTop,
    push,
    receber,
    transactionError,
  ]);
  return {
    setReceber,
    onSubmitAmount,
    setCreditoOuDebito,
    creditoOuDebito,
    transactionStatus,
    transactionError,
    numeroDeCartoesNaTransacao,
  };
};
