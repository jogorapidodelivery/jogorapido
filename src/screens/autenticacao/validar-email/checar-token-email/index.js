import React, {memo} from 'react';
import ChecarToken from '@screens/partial/checar-token';
import {actionChecarTokenEmail} from '@actions/';
import {AUTENTICAR} from '@constants/';
import {useSelector} from 'react-redux';
import {encodeCipherCaesar} from '@sd/uteis/CipherCaesar';
import AsyncStorage from '@react-native-community/async-storage';
function ChecarTokenEmailGoHome({navigation}) {
  const {entregador_id, usuario_id, social_id, senha} = useSelector(
    ({autenticacao}) => autenticacao,
  );
  const {
    state: {
      params: {
        params: {usuario},
      },
    },
  } = navigation;
  const typeReceiver = usuario.charAt(0) === '(' ? 'via sms' : 'no email';
  const info = [
    `Digite o código de verificação que você recebeu ${typeReceiver} `,
    usuario,
    '\npara alterar sua senha.',
  ];
  async function onSubmit(_s) {
    try {
      await actionChecarTokenEmail({
        body_rsa: {entregador_id, usuario_id, ..._s.body_rsa},
      });
      const _chifed = encodeCipherCaesar({social_id, senha, usuario});
      AsyncStorage.setItem(AUTENTICAR, _chifed).catch(_err => {});
      navigation.push('home', {
        params: {
          ..._s.body_rsa,
        },
      });
    } catch ({mensagem}) {
      navigation.push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem,
        },
      });
    }
  }
  return (
    <ChecarToken
      info={info}
      usuario={usuario}
      onSubmit={onSubmit}
      navigation={navigation}
    />
  );
}
export default memo(ChecarTokenEmailGoHome);
