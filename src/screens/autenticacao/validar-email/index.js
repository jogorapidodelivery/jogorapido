import React, {memo} from 'react';
import {actionValidarEmail} from '@actions/';
import CapturarEmailOuTelefone from '@screens/partial/capturar-email-ou-telefone';
import {useSelector} from 'react-redux';

function ValidarEmail({navigation}) {
  const {entregador_id, usuario_id, email: usuario} = useSelector(
    ({autenticacao}) => autenticacao,
  );
  const enviarCodigo = _s => {
    actionValidarEmail(_s)
      .then(_r => {
        navigation.navigate('checarTokenEmailGoHome', {
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
  return (
    <CapturarEmailOuTelefone
      titulo="EMAIL"
      tituloBold="CONFIRMAR"
      info={[
        'Para manter sua conta segura, é necessário confirmar seu  ',
        'email. ',
        'Para isso, confira se o email abaixo esta correto e clique no botão ',
        'Confirmar email',
      ]}
      tipoInput="email"
      postName="usuario"
      placeHolder="Digite aqui seu email"
      valueButton="Confirmar email"
      valueInput={usuario}
      defaultPost={{body_rsa: {entregador_id, usuario_id}}}
      onSubmit={enviarCodigo}
    />
  );
}
export default memo(ValidarEmail);
