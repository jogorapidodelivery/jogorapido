import {coletaCheckOutCliente} from '@actions/';
import {GrupoRotas} from '@sd/navigation/revestir';
export const actionClickCheckout = async ({
  push,
  navigate,
  pop,
  coleta_id,
  entregador_id,
}) => {
  try {
    await coletaCheckOutCliente({
      body_rsa: {
        entregador_id,
        coleta_id,
        coluna: 'data_checkout_cliente',
      },
    });
    pop();
  } catch (err) {
    const {status, mensagem} = err;
    if (status === 'listapedido') {
      push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem,
          onPress: () => {
            let store = GrupoRotas.store.getState();
            store.autenticacao.coleta = [];
            store.autenticacao.produtos = [];
            navigate('home');
          },
        },
      });
    } else {
      // eslint-disable-next-line no-const-assign
      mensagem = mensagem || 'Página não encontrada status[500]';
      push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
    }
  }
};
export const actionGotoPay = ({push, navigate, pop, ...params}) => {
  push('coletaPagamento', {params});
};
