import {coletaCheckInUnidade} from '@actions/';
import {SDNavigation} from '@sd/navigation';
import {km2String} from '@sd/uteis/StringUteis';
import {GrupoRotas} from '@sd/navigation/revestir';
export const actionCheckInUnidade = ({
  coleta_ids,
  entregador_id,
  dentroDoRaio,
  raio,
}) => {
  const {push, navigate} = SDNavigation.navegar;
  if (dentroDoRaio) {
    coletaCheckInUnidade({
      body_rsa: {
        entregador_id,
        coleta_id: coleta_ids,
        coluna: 'data_checkin_unidade',
      },
    }).catch(({status, mensagem}) => {
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
        push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
      }
    });
  } else {
    push('alerta', {
      params: {
        titulo: 'JogoRápido',
        mensagem: `Só é possivel fazer checkin no estabelecimento à uma distância máxima de ${km2String(
          raio,
        )}.`,
      },
    });
  }
};
export const actionCheckOutUnidade = () => {
  SDNavigation.navegar.push('coletaCheckoutUnidade');
};
