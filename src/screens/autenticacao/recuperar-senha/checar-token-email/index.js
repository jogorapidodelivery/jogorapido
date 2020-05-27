import React, {memo} from 'react';
import {actionChecarTokenEmail} from '@actions/';
import ChecarToken from '@screens/partial/checar-token';
function ChecarTokenEmailGoRecuperarSenha({navigation}) {
  const {
    push,
    state: {
      params: {
        params: {usuario},
      },
    },
  } = navigation;
  const onSubmit = _s => {
    actionChecarTokenEmail(_s)
      .then(_r => {
        push('alterarSenha', {
          params: {
            ..._s.body_rsa,
          },
        });
      })
      .catch(({mensagem}) => {
        push('alerta', {
          params: {
            titulo: 'JogoRápido',
            mensagem,
          },
        });
      });
  };

  const typeReceiver = usuario.charAt(0) === '(' ? 'via sms' : 'no email';
  const info = [
    `Digite o código de verificação que você recebeu ${typeReceiver} `,
    usuario,
    '\npara alterar sua senha.',
  ];
  return (
    <ChecarToken
      info={info}
      usuario={usuario}
      onSubmit={onSubmit}
      navigation={navigation}
    />
  );
}
export default memo(ChecarTokenEmailGoRecuperarSenha);
