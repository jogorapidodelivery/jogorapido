import React, {useEffect} from 'react'; // useState
import {
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styl from './styl';
import {useSelector} from 'react-redux';
import {mapSelector} from './commands/mapSelector';
import PinPad from './Pinpad';
import Payment from './Payment';
import {useBluetoothPair} from './hooks/useBluetoothPair';
import {useBluetoothTransaction} from './hooks/useBluetoothTransaction';
const behavior = Platform.select({
  android: 'height',
  ios: 'padding',
});
function Pagamento({
  navigation: {
    push,
    pop,
    popToTop,
    state: {
      params: {
        params: {coleta_id}, // entregador_id
      },
    },
  },
}) {
  const coleta = useSelector(mapSelector({coleta_id}));

  const dataBluetoothTransaction = useBluetoothTransaction({
    coleta_id,
    push,
    pop,
    popToTop,
    ...coleta,
  });
  const dataBluetoothPair = useBluetoothPair({
    numeroDeCartoesNaTransacao:
      dataBluetoothTransaction.numeroDeCartoesNaTransacao,
  });
  const {selectedDevice, requestPermission, destroy} = dataBluetoothPair;
  useEffect(() => {
    requestPermission();
    return destroy;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <KeyboardAvoidingView style={styl.container} behavior={behavior} enabled>
      <ImageBackground
        source={require('@images/gradiente.png')}
        style={styl.warpBackground}
        imageStyle={styl.imageBackground}>
        <SafeAreaView style={styl.container}>
          {selectedDevice === null ? (
            <PinPad {...dataBluetoothPair} />
          ) : (
            <Payment
              {...{
                ...dataBluetoothPair,
                ...dataBluetoothTransaction,
              }}
            />
          )}
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
export default Pagamento;
