import React, {memo} from 'react';
import ChecarToken from '@screens/partial/checar-token';
import {actionChecarTokenEmail} from '@actions/';
import {useSelector} from 'react-redux';
function MeusDadosChecarTokenEmail({navigation}) {
  const {usuario_id, entregador_id} = useSelector(
    ({autenticacao}) => autenticacao,
  );
  const {
    navigate,
    push,
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
      navigate('meusDadosAlterarSenha', {
        params: {
          ..._s.body_rsa,
        },
      });
    } catch ({mensagem}) {
      push('alerta', {
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
export default memo(MeusDadosChecarTokenEmail);
