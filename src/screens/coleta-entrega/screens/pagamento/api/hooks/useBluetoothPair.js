import {useEffect, useState, useCallback} from 'react';
import requestBluetoothPermission from '../commands/request-bluetooth-permission';
import {bluetooth} from 'react-native-mpos-native';
import {Platform, PermissionsAndroid} from 'react-native';
const {BLUETOOTH_STATES} = bluetooth;
export const useBluetoothPair = props => {
  const {
    setMsg,
    setIc,
    setIcColor,
    setLoading,
    listaDeMaquininhas,
    setListaDeMaquininhas,
    maquininhaSelecionada,
    setMaquininhaSelecionada,
  } = props;
  const [cancelPair, setCancelPair] = useState(false);
  const [conectadoBluetooth, setConectadoBluetooth] = useState(false);
  const handlerSelectDevice = key => {
    setMaquininhaSelecionada(listaDeMaquininhas[key]);
  };
  const handleOnReceiveNewDevice = ({name, address}) => {
    const deviceItem = {
      name,
      address,
      config: 'pax_d150',
    };
    setListaDeMaquininhas(prevDevices => {
      const isDeviceAdded = prevDevices.find(
        device => device.address === deviceItem.address,
      );
      if (!isDeviceAdded) {
        setMsg(
          'Estes são os equipamentos\nque estão disponíveis para conectar.',
        );
        setIc('');
        setIcColor('22');
        setLoading(false);
        return [...prevDevices, deviceItem];
      }
      console.log('2) dados da conexão');
      console.log(prevDevices);
      return prevDevices;
    });
  };
  const handleOnPairResult = ({result}) => {
    if (result === BLUETOOTH_STATES.android.BONDED) {
      console.log('EQUIPAMENTO PAREADO setConectadoBluetooth(true);');
      setConectadoBluetooth(true);
    }
  };
  const handleOnPairTimeout = () => {
    setLoading(false);
    setMsg('Falha ao listar equipamentos bluethooth');
    setIcColor('09');
    setIc('');
    setCancelPair(true);
  };
  const startBluetoothScan = useCallback(() => {
    bluetooth.setUp(
      handleOnReceiveNewDevice,
      handleOnPairResult,
      handleOnPairTimeout,
    );
    bluetooth.startScan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (maquininhaSelecionada) {
      setLoading(true);
      setMsg('Conectando equipamento bluethooth');
      setIcColor('10');
      setIc('');
      console.log('mandei conectar nesta aqui', maquininhaSelecionada);
      bluetooth.pairWith(maquininhaSelecionada);
    }
  }, [
    listaDeMaquininhas,
    maquininhaSelecionada,
    setIc,
    setIcColor,
    setLoading,
    setMsg,
  ]);
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestBluetoothPermission().then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          startBluetoothScan();
        }
      });
    } else {
      startBluetoothScan();
    }
    return () => {
      console.log('1) bluetooth.stopScan');
      bluetooth.stopScan();
    };
  }, [startBluetoothScan]);
  return {
    conectadoBluetooth,
    handlerSelectDevice,
    cancelPair,
  };
};
