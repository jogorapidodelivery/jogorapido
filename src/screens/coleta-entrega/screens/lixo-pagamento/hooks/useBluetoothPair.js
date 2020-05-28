import {useState, useEffect} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import requestBluetoothPermission from '../commands/request-bluetooth-permission';
import {bluetooth, mpos} from 'react-native-mpos-native';
import {taxEncryptionKey} from '@root/app.json';
import {GrupoRotas} from '@sd/navigation/revestir';
const {BLUETOOTH_STATES} = bluetooth;
export const useBluetoothPair = ({numeroDeCartoesNaTransacao}) => {
  // Ganbiarra do redux global
  let stateGlobal = GrupoRotas.store.getState();
  stateGlobal.tax = stateGlobal.tax || [];
  // Lista de devices conectados no bluetooth
  const [devices, setDevices] = useState(stateGlobal.tax);
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
        stateGlobal.tax = [...prevDevices, deviceItem];
        return stateGlobal.tax;
      }
      stateGlobal.tax = prevDevices;
      return stateGlobal.tax;
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
      console.log('useBluetoothPair::mpos.createMpos()');
      mpos.createMpos(selectedDevice, taxEncryptionKey);
    }
    () => {
      console.log('useBluetoothPair::mpos.dispose()');
      mpos.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resultDeviceID, numeroDeCartoesNaTransacao]);

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
    selectedDevice,
    requestPermission,
    devices,
    handlerPairWith,
  };
};
