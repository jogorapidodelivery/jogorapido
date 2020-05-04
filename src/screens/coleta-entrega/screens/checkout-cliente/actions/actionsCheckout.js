import {coletaCheckOutCliente} from '@actions/';
import {SDNavigation} from '@sd/navigation';
import {GrupoRotas} from '@sd/navigation/revestir';
export const actionClickCheckout = async ({coleta_id, entregador_id}) => {
  const {push, navigate, pop} = SDNavigation.navegar;
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
    console.warn(err);
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
export const actionGotoPay = params => {
  const {push} = SDNavigation.navegar;
  push('coletaPagamento', {params});
};
