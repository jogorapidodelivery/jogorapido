import React, {memo, Fragment} from 'react';
import {Linking} from 'react-native';
import styl from '../../styl';
import Button from '@sd/components/button';
import Info from '@screens/partial/info';
const confirmarCodigo = () => {
  Linking.openSettings().catch(_err => {
    console.warn('catch', _err);
  });
};
function Falhas({falhas}) {
  const _fraseFinal =
    falhas.length === 1
      ? '\nPara conceder esta permissão\nclique no botão abaixo e reinicie o app.'
      : '\nPara conceder estas permissões\nclique no botão abaixo e reinicie o app.';
  let _f = falhas.length > 2 ? ` e ${falhas.pop()}` : '';
  const msg = falhas.join(', ') + _f;

  return (
    <Fragment>
      <Info
        data={[
          'O App JogoRápido precisa de\nacesso ao(s) seguinte(s) recurso(s):\n',
          msg,
          _fraseFinal,
        ]}
      />
      <Button
        style={styl.button}
        onPress={confirmarCodigo}
        text={{
          value: 'Configurações do APP',
          color: '07',
        }}
        bg="14"
        rightIcon={{
          value: '',
          color: '07',
        }}
      />
    </Fragment>
  );
}
export default memo(Falhas);
