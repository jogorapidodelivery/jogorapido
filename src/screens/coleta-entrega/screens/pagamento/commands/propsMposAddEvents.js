import {mpos} from 'react-native-mpos-native';
import {Platform} from 'react-native';
const tiposPagamento = {
  CreditCard: 'Crédito',
  DebitCard: 'Débito',
};

export const propsMposAddEvents = ({
  setTransactionStatus,
  setTransactionError,
  receber,
  transactionError,
  receiveCardHash: receiveCardHashResponse,
  creditoOuDebito,
}) => {
  const onTransactionSuccess = (transaction, shouldFinishTransaction) => {
    // Caso o sinalizador seja mapeado para `true ', você deve chamar` finishTransaction` no pinpad.
    if (shouldFinishTransaction) {
      console.log('onTransactionSuccess/shouldFinishTransaction');
      mpos.finishTransaction(
        true,
        parseInt(transaction.acquirer_response_code, 10),
        transaction.card_emv_response,
      );
    } else {
      console.log('onTransactionSuccess/PAGAMENTO FINALIZADO');
      // Lembre-se de sempre chamar `mpos.close` quando a transação terminar.
      mpos.close('PAGAMENTO FINALIZADO');
    }
    setTransactionStatus(null);
  };

  const onTransactionError = shouldFinishTransaction => {
    if (shouldFinishTransaction) {
      console.log('onTransactionError/shouldFinishTransaction');
      mpos.finishTransaction(false, 0, null);
    } else {
      console.log('onTransactionError/PAGAMENTO RECUSADO');
      mpos.close('PAGAMENTO RECUSADO');
    }

    setTransactionStatus(null);
  };
  return {
    // A implementação deste ouvinte é necessária apenas para Android.
    bluetoothConnected: () => {
      setTransactionStatus('Bluetooth conectado, inicializando o TAX...');
      mpos.initialize();
    },
    bluetoothDisconnected: () => {
      setTransactionStatus('Conexão bluetooth perdida...');
    },
    bluetoothErrored: error => {
      setTransactionStatus(`Um erro ocorreu: ${error}`);
    },
    // Esta função é chamada assim que o pinpad estiver conectado e pronto para iniciar [recebendo mensagens].
    receiveInitialization: () => {
      mpos.downloadEmvTablesToDevice(false);
      setTransactionStatus('Verificando atualizações de tabelas');
      mpos.displayText('ATUALIZANDO');
    },
    // Chamado como resultado de `downloadEmvTablesToDevice` quando houver uma confirmação de que as tabelas emv dentro do TAX estão atualizadas ou foram recarregadas.
    receiveTableUpdated: () => {
      setTransactionStatus(
        'As tabelas TAX estão atualizadas. Inserir cartão de crédito...',
      );

      const method = mpos.PaymentMethod[creditoOuDebito]; // `CreditCard` ou  `DebitCard`.
      mpos.payAmount(receber, method);
    },
    // Chamado após a geração do hash do cartão. Aqui é onde uma transação deve ser criada na API do pagar.me.
    receiveCardHash: async response => {
      const tipo_pagamento = tiposPagamento[creditoOuDebito];
      mpos.displayText('PROCESSANDO...');
      setTransactionStatus('Hash do cartão recebido. Criando transação...');
      try {
        const transaction = await receiveCardHashResponse({
          body_rsa: {
            maquina_tid: response.result.localTransactionId,
            tipo_pagamento: tipo_pagamento,
            valor: receber,
            operadora: response.result.cardBrand,
          },
          transaction: {
            receber,
            tipo_pagamento,
            ...response.result,
          },
        });
        onTransactionSuccess(transaction, response.shouldFinishTransaction);
      } catch (_err) {
        setTransactionError(_err);
        onTransactionError(response.shouldFinishTransaction);
      }
    },
    // Chamado como resultado de `finishTransaction`.
    receiveFinishTransaction: () => {
      if (transactionError) {
        // Isso apenas apresentará um alerta e fechará o pinpad.
        onTransactionError(false);
      } else {
        onTransactionSuccess(null, false);
      }
    },
    receiveError: error => {
      const errorCode = Platform.OS === 'ios' ? error.code : error;
      setTransactionStatus(`Um erro ocorreu [code ${errorCode}]`);
      mpos.close(`ERROR: ${errorCode}`);
    },
    receiveClose: () => {
      console.log('receiveClose/mpos.dispose()');
      // Descarte recursos e invalide retornos de chamada após concluir uma transação.
      mpos.dispose();
    },
    // Chamado toda vez que o TAX envia uma notificação de volta para o aplicativo..
    receiveNotification: notification => null,
    // Esses são ouvintes opcionais.
    receiveOperationCancelled: () => null,
    receiveOperationCompleted: () => null,
  };
};
