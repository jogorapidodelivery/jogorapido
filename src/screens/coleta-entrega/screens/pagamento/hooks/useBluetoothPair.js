import {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import requestBluetoothPermission from '../commands/request-bluetooth-permission';
import {bluetooth, mpos} from 'react-native-mpos-native';
import {taxEncryptionKey} from '@root/app.json';
const {BLUETOOTH_STATES} = bluetooth;
export const useBluetoothPair = (props = {}) => {
  // Lista de devices conectados no bluetooth
  const [devices, setDevices] = useState([]);
  // Device selecionado no onclick
  const [selectedDevice, setSelectedDevice] = useState(null);

  // Result device selecionado
  const [resultDeviceID, setResultDeviceID] = useState(null);

  // Atualizando lista de devices conectados no bluetooth
  const handleOnReceiveNewDevice = ({name, address}) => {
    console.log({type: 'handleOnReceiveNewDevice', name, address});
    const deviceItem = {
      name,
      address,
      config: 'pax_d150',
    };
    setDevices(prevDevices => {
      const isDeviceAdded = prevDevices.find(
        device => device.address === deviceItem.address,
      );
      if (!isDeviceAdded) {
        return [...prevDevices, deviceItem];
      }
      return prevDevices;
    });
  };

  // Evento de seleção de TAX espeficico
  const handlerPairWith = index => {
    if (devices[index] !== null && devices !== devices[index]) {
      setSelectedDevice(devices[index]);
      bluetooth.pairWith(devices[index]);
    }
  };

  // Estabelecendo conexão segura com o PAX
  useEffect(() => {
    if (resultDeviceID !== null) {
      bluetooth.stopScan();
      mpos.createMpos(selectedDevice, taxEncryptionKey);
    }
    return () => {
      console.log('useBluetoothPair::mpos.dispose()');
      mpos.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDeviceID]);

  // Executando configuração da PAX após sua seleção
  const handleOnPairResult = ({result}) => {
    if (result === BLUETOOTH_STATES.android.BONDED) {
      setResultDeviceID(result);
    }
  };

  // Adicionando ouvintes para monitorar a resposta da conexão com a TAX
  const startBluetoothScan = () => {
    if (resultDeviceID === null) {
      console.log({
        type: 'startBluetoothScan',
      });
      bluetooth.setUp(
        handleOnReceiveNewDevice,
        handleOnPairResult,
        handleOnPairTimeout,
      );
      bluetooth.startScan();
    } else {
      console.log('Device selecionado', {resultDeviceID, ...selectedDevice});
    }
  };

  // Falha ao conectar com a PAX. Tem que tratar isto futuramente
  const handleOnPairTimeout = () => {
    console.log({
      type: 'handleOnPairTimeout',
      msg:
        'A conexão expirou (3 seconds) , Verifique se XXX está próximo e ativo e tente novamente.',
    });
  };
  // Solicitando permissão para conectar com a TAX
  const requestPermission = () => {
    console.log('solicitar permissão');
    if (Platform.OS === 'android') {
      requestBluetoothPermission().then(result => {
        if (result === PermissionsAndroid.RESULTS.GRANTED) {
          startBluetoothScan();
        }
      });
    } else {
      startBluetoothScan();
    }
  };

  // Destruindo conexão com a TAX
  const destroy = () => {
    setDevices([]);
    bluetooth.stopScan();
  };
  return {
    destroy,
    ...props,
    selectedDevice,
    requestPermission,
    devices,
    handlerPairWith,
  };
};
