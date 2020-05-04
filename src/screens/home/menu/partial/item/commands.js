import {GrupoRotas} from '@sd/navigation/revestir';
import AsyncStorage from '@react-native-community/async-storage';
import {Linking} from 'react-native';
import {actionRecuperarSenha} from '@actions/';
import {getItemByKeys} from '@sd/uteis/ArrayUteis';
import BackgroundGeolocation from 'react-native-background-geolocation';
export const logout = navigation => {
  BackgroundGeolocation.stop();
  let state = GrupoRotas.store.getState();
  delete state.autenticacao.usuario;
  delete state.autenticacao.senha;
  delete state.autenticacao.usuario_id;
  delete state.autenticacao.disponibilidade;
  AsyncStorage.clear();
  navigation.navigate('conectar');
};
export const termosDeUso = () => {
  const state = GrupoRotas.store.getState();
  const link = getItemByKeys(state, 'autenticacao.termos_uso');
  if (link) {
    Linking.openURL(link);
  }
};
export const politicaDePrivacidade = () => {
  const state = GrupoRotas.store.getState();
  const link = getItemByKeys(state, 'autenticacao.politica_privacidade');
  if (link) {
    Linking.openURL(link);
  }
};
export const whatsapp = () => {
  const state = GrupoRotas.store.getState();
  const link = getItemByKeys(state, 'autenticacao.whatsapp_ajuda');
  if (link) {
    Linking.openURL(link);
  }
};
export const alterarSenha = navigation => {
  let state = GrupoRotas.store.getState();
  const _s = {
    body_rsa: {
      usuario: state.autenticacao.usuario,
    },
  };
  actionRecuperarSenha(_s)
    .then(_r => {
      navigation.navigate('meusDadosChecarTokenEmail', {
        params: {
          ..._s.body_rsa,
        },
      });
    })
    .catch(({mensagem}) => {
      navigation.push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem,
        },
      });
    });
};
