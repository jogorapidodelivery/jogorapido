import React, {useContext, useEffect} from 'react'; // , useContext
import {ActivityIndicator} from 'react-native';
import styl from './styl';
import BotaoParearMaquininha from './partial/botaoparearmaquininha';
import ConexaoStatus from '../partial/conexaoStatus';
import AutenticarContext from '../../api';
import Button from '@sd/components/button';
import {cor} from '@root/app.json';
import {useBluetoothPair} from '../../api/hooks/useBluetoothPair';
function ListarMaquininhas({navigation: {navigate}}) {
  const context = useContext(AutenticarContext);
  const {
    conectadoBluetooth,
    handlerSelectDevice,
    cancelPair,
  } = useBluetoothPair(context);
  const {listaDeMaquininhas, msg, ic, icCor, loading, pop} = context;
  useEffect(() => {
    if (conectadoBluetooth) {
      navigate('ReceberPagamento');
    }
  }, [conectadoBluetooth, navigate]);
  return (
    <ConexaoStatus msg={msg} ic={ic} icCor={icCor}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={styl.loading}
          color={cor['08']}
        />
      ) : (
        listaDeMaquininhas.map(({name, address}, key) => (
          <BotaoParearMaquininha
            key={`pinpad-${key}`}
            chave={address}
            nome={name}
            onPress={() => handlerSelectDevice(key)}
          />
        ))
      )}
      {cancelPair && (
        <Button
          style={styl.btn}
          text={{
            value: 'Parear novamente',
            color: '07',
          }}
          rightIcon={{
            value: '',
            color: '07',
          }}
          bg="14"
          onPress={pop}
        />
      )}
    </ConexaoStatus>
  );
}
export default ListarMaquininhas;
