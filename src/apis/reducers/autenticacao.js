import AsyncStorage from '@react-native-community/async-storage';
import {
  ENTREGADOR_GEOFENCE,
  ENTREGADOR_ATUALIZAR_ESCALA,
  ALTERAR_SENHA,
  AUTENTICAR,
  CHECAR_SIMBOLO_EMAIL,
  RECUPERAR_SENHA,
  CONECTAR,
  CRIAR_CONTA,
  CONECTAR_FACEBOOK,
  SALVAR_DISPONIBILIDADE,
} from '@constants/';
import {moeda} from '@sd/uteis/form/MaskString';
import moment from 'moment';
import {menu} from '@apis/json/menu.json';
import {encodeCipherCaesar} from '@sd/uteis/CipherCaesar';
import {empty} from '@sd/uteis/StringUteis';
import {hasDev} from '@sd/fetch/baseUrl';
export default {
  defaultProps: {
    menu,
    autenticacao: 'nome',
  },
  reducers: {
    autenticacao: {
      [SALVAR_DISPONIBILIDADE]: (state, {posted}) => {
        const weekDayNumber = new Date().getDay().toString();
        const list = posted.disponibilidade.filter(
          ({dia_semana}) => dia_semana === weekDayNumber,
        );
        const ids = list.map(({disponibilidade_id}) =>
          Number(disponibilidade_id),
        );
        const disponibilidade = state.disponibilidade.map(v => {
          const _idUpdate = ids.indexOf(v.disponibilidade_id);
          if (_idUpdate >= 0) {
            const item = list[_idUpdate];
            v.actived = true;
            v.ativo = item.ativo === '1';
            v.data = new Date().toString();
          } else {
            v.actived = false;
            v.ativo = false;
            v.data = null;
          }
          return v;
        });
        console.log('atualizando reducer de disponibilidade para a home');
        return {...state, disponibilidade};
      },
      [CONECTAR_FACEBOOK]: (state, _action) => {
        return state;
      },
      [RECUPERAR_SENHA]: (state, _action) => {
        return state;
      },
      [CHECAR_SIMBOLO_EMAIL]: (state, _action) => {
        return state;
      },
      [ENTREGADOR_GEOFENCE]: (state, _action) => {
        return state;
      },
      [ENTREGADOR_ATUALIZAR_ESCALA]: (state, {response}) => {
        if (response.disponibilidade) {
          response.disponibilidade = response.disponibilidade.map(v => {
            v.horario = `${moment(v.hora_inicio, 'H:mm:ss').format(
              'H',
            )}h ${moment(v.hora_fim, 'H:mm:ss').format('H')}h`;
            return v;
          });
        }
        return {...state, ...response};
      },
      [[ALTERAR_SENHA, CONECTAR, AUTENTICAR, CRIAR_CONTA]]: (
        state,
        {response, posted},
      ) => {
        const {social_id, senha, usuario} = posted;
        response.total_frete_semana = moeda(response.total_frete_semana, '');
        if (response.disponibilidade) {
          response.disponibilidade = response.disponibilidade.map(v => {
            v.horario = `${moment(v.hora_inicio, 'H:mm:ss').format(
              'H',
            )}h ${moment(v.hora_fim, 'H:mm:ss').format('H')}h`;
            return v;
          });
        }
        response = {...response, social_id, senha, usuario};

        if (!empty(usuario) && (!empty(senha) || !empty(social_id))) {
          const _chifed = encodeCipherCaesar({social_id, senha, usuario});
          AsyncStorage.setItem(AUTENTICAR, _chifed).catch(_err => {});
        }
        let menuClone = [...state.menu];
        const indice = menuClone.findIndex(
          ({commandAction}) => commandAction === 'toogleAdmin',
        );
        if (indice >= 0) {
          const beta = hasDev();
          menuClone[indice].checkbox = beta;
          menuClone[indice].titulo = beta ? 'Admin Beta' : 'Admin produção';
        }
        return {...state, ...response, menu: menuClone, usuario, senha};
      },
    },
  },
};
