import {coletaCheckOutUnidade} from '@actions/';
import {SDNavigation} from '@sd/navigation';
import {GrupoRotas} from '@sd/navigation/revestir';
export const actionClickCheckout = async ({coleta_ids, entregador_id}) => {
  const {push, navigate, pop} = SDNavigation.navegar;
  try {
    await coletaCheckOutUnidade({
      body_rsa: {
        entregador_id,
        coleta_id: coleta_ids,
        coluna: 'data_checkout_unidade',
      },
    });
    pop();
  } catch ({status, mensagem}) {
    if (status === 'listapedido') {
      push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem,
          onPress: () => {
            let store = GrupoRotas.store.getState();
            store.autenticacao.coleta = [];
            navigate('home');
          },
        },
      });
    } else {
      // eslint-disable-next-line no-ex-assign
      mensagem = mensagem || 'Página não encontrada status[500]';
      push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
    }
  }
};
