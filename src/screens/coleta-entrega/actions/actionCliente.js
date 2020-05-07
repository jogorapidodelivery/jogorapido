import {coletaCheckInCliente} from '@actions/';
import {GrupoRotas} from '@sd/navigation/revestir';
import {km2String} from '@sd/uteis/StringUteis';
export const actionCheckinCliente = ({
  index,
  coleta_id,
  entregador_id,
  dentroDoRaio,
  raio,
  push,
  navigate,
}) => {
  if (dentroDoRaio) {
    coletaCheckInCliente({
      body_view: {
        index,
      },
      body_rsa: {
        coleta_id,
        entregador_id,
        coluna: 'data_checkin_cliente',
      },
    }).catch(err => {
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
              navigate('home');
            },
          },
        });
      } else {
        // eslint-disable-next-line no-const-assign
        mensagem = mensagem || 'Página não encontrada status[500]';
        push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
      }
    });
  } else {
    push('alerta', {
      params: {
        titulo: 'JogoRápido',
        mensagem: `Só é possivel fazer checkin no cliente à uma distância máxima de ${km2String(
          raio,
        )}.`,
      },
    });
  }
};
