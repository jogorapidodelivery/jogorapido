import {useEffect, useState, useCallback} from 'react';
import requestBluetoothPermission from '../commands/request-bluetooth-permission';
import {bluetooth} from 'react-native-mpos-native';
import {Platform, PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const {BLUETOOTH_STATES} = bluetooth;
export const useBluetoothPair = ({
  setMsg,
  setIc,
  setIcColor,
  setLoading,
  listaDeMaquininhas,
  setListaDeMaquininhas,
  maquininhaSelecionada,
  setMaquininhaSelecionada,
}) => {
  const [conectadoBluetooth, setConectadoBluetooth] = useState(false);
  const [cancelPair, setCancelPair] = useState(false);
  const handlerSelectDevice = key => {
    setMaquininhaSelecionada(listaDeMaquininhas[key]);
  };
  const startBluetoothScan = useCallback(() => {
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
          const data = [...prevDevices, deviceItem];
          console.log('1) dados da conexão');
          console.log(data);
          AsyncStorage.setItem('@device-bluetooth', JSON.stringify(data));
          return data;
        }
        console.log('2) dados da conexão');
        console.log(prevDevices);
        return prevDevices;
      });
    };
    const handleOnPairResult = ({result}) => {
      if (result === BLUETOOTH_STATES.android.BONDED) {
        setConectadoBluetooth(true);
        bluetooth.stopScan();
      }
    };
    const handleOnPairTimeout = () => {
      setLoading(false);
      setMsg('Falha ao listar equipamentos bluethooth');
      setIcColor('09');
      setIc('');
      bluetooth.stopScan();
      setCancelPair(true);
    };
    bluetooth.setUp(
      handleOnReceiveNewDevice,
      handleOnPairResult,
      handleOnPairTimeout,
    );
    const buscandoPinpadCache = async () => {
      try {
        const data = await AsyncStorage.getItem('@device-bluetooth');
        if (data !== null) {
          const decript = JSON.parse(data);
          if (decript === null || decript.length === 0) {
            throw 'Não tinha sincronização previa';
          } else {
            console.log('dados do cache');
            console.log(decript);
            setMsg(
              'Estes são os equipamentos\nque estão disponíveis para conectar.',
            );
            setIc('');
            setIcColor('22');
            setLoading(false);
            setListaDeMaquininhas(decript);
          }
        } else {
          throw 'Não tinha sincronização previa';
        }
      } catch (e) {
        console.log(e);
      }
    };
    buscandoPinpadCache();
    bluetooth.startScan();
    return () => {
      bluetooth.stopScan();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (maquininhaSelecionada) {
      setLoading(true);
      setMsg('Conectando equipamento bluethooth');
      setIcColor('10');
      setIc('');
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
      bluetooth.stopScan();
    };
  }, [startBluetoothScan]);
  return {
    handlerSelectDevice,
    setConectadoBluetooth,
    cancelPair,
    conectadoBluetooth,
  };
};
