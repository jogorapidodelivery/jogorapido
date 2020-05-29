import {PermissionsAndroid} from 'react-native';
import {bluetooth} from 'react-native-mpos-native';

async function requestBluetoothPermission() {
  const isBluetoothOn = await bluetooth.isTurnedOn();

  if (!isBluetoothOn) {
    await bluetooth.turnOn();
  }

  const bluetoothPermission =
    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION;
  const isPermissionGranted = await PermissionsAndroid.check(
    bluetoothPermission,
  );

  if (!isPermissionGranted) {
    return PermissionsAndroid.request(bluetoothPermission, {
      title: 'Permitir Bluetooth',
      message:
        'Para conectar uma maquininha, você deve aceitar permissões de bluetooth para este aplicativo.',
      buttonPositive: 'OK',
      buttonNegative: 'Cancel',
    });
  }

  return PermissionsAndroid.RESULTS.GRANTED;
}

export default requestBluetoothPermission;
