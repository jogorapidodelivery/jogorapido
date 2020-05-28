import {mpos} from 'react-native-mpos-native';
import {Platform} from 'react-native';
import {logerro, logsucesso} from '@sd/uteis/log';
const tiposPagamento = {
  CreditCard: 'Crédito',
  DebitCard: 'Débito',
};

export const propsMposAddEvents = ({
  setTransactionStatus,
  setTransactionError,
  amount,
  transactionError,
  receiveCardHash: receiveCardHashResponse,
  creditoOuDebito,
}) => {
  const onTransactionSuccess = (transaction, shouldFinishTransaction) => {
    // Caso o sinalizador seja mapeado para `true ', você deve chamar` finishTransaction` no pinpad.
    if (shouldFinishTransaction) {
      logsucesso('onTransactionSuccess/shouldFinishTransaction');
      mpos.finishTransaction(
        true,
        parseInt(transaction.acquirer_response_code, 10),
        transaction.card_emv_response,
      );
    } else {
      logsucesso('onTransactionSuccess/PAGAMENTO FINALIZADO');
      // Lembre-se de sempre chamar `mpos.close` quando a transação terminar.
      mpos.close('PAGAMENTO FINALIZADO');
    }
    setTransactionStatus(null);
  };

  const onTransactionError = shouldFinishTransaction => {
    if (shouldFinishTransaction) {
      logerro('onTransactionError/shouldFinishTransaction');
      mpos.finishTransaction(false, 0, null);
    } else {
      logerro('onTransactionError/PAGAMENTO RECUSADO');
      mpos.close('PAGAMENTO RECUSADO');
    }

    setTransactionStatus(null);
  };
  return {
    // A implementação deste ouvinte é necessária apenas para Android.
    bluetoothConnected: () => {
      setTransactionStatus('Bluetooth conectado.\nInicializando o pagamento');
      mpos.initialize();
    },
    bluetoothDisconnected: () => {
      setTransactionStatus('Conexão bluetooth perdida');
    },
    bluetoothErrored: error => {
      setTransactionStatus(`Erro na conexão bluetooth: [ code ${error} ]`);
    },
    // Esta função é chamada assim que o pinpad estiver conectado e pronto para iniciar [recebendo mensagens].
    receiveInitialization: () => {
      mpos.downloadEmvTablesToDevice(false);
      setTransactionStatus('Verificando atualizações de tabelas');
      mpos.displayText('ATUALIZANDO');
    },
    // Chamado como resultado de `downloadEmvTablesToDevice` quando houver uma confirmação de que as tabelas emv dentro do TAX estão atualizadas ou foram recarregadas.
    receiveTableUpdated: () => {
      setTransactionStatus('Inserir cartão de crédito');

      const method = mpos.PaymentMethod[creditoOuDebito]; // `CreditCard` ou  `DebitCard`.
      mpos.payAmount(amount, method);
    },
    // Chamado após a geração do hash do cartão. Aqui é onde uma transação deve ser criada na API do pagar.me.
    receiveCardHash: async response => {
      const tipo_pagamento = tiposPagamento[creditoOuDebito];
      mpos.displayText('PROCESSANDO...');
      setTransactionStatus('Dados do cartão recebido.\nCriando transação…');
      receiveCardHashResponse({
        body_rsa: {
          maquina_tid: response.result.localTransactionId,
          tipo_pagamento: tipo_pagamento,
          valor: amount,
          operadora: response.result.cardBrand,
        },
        transaction: {
          amount,
          tipo_pagamento,
          ...response.result,
        },
        callBack: ({type, result}) => {
          if (type === 'sucesso') {
            onTransactionSuccess(result, response.shouldFinishTransaction);
          } else {
            setTransactionError(result);
            onTransactionError(response.shouldFinishTransaction);
          }
        },
      });
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
      logerro(`Um erro ocorreu [ code = ${errorCode}]`);
      setTransactionStatus(`Um erro ocorreu [ code = ${errorCode}]`);
      mpos.close(`ERROR: ${errorCode}`);
    },
    receiveClose: () => {
      logerro('receiveClose/mpos.dispose()');
      // Descarte recursos e invalide retornos de chamada após concluir uma transação.
      mpos.dispose();
    },
    // Chamado toda vez que o TAX envia uma notificação de volta para o aplicativo..
    receiveNotification: _notification => null,
    // Esses são ouvintes opcionais.
    receiveOperationCancelled: () => null,
    receiveOperationCompleted: () => null,
  };
};
