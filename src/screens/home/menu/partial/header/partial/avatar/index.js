import React from 'react';
import {
  PermissionsAndroid,
  Platform,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styl from './styl';
const _asa = require('@images/asa.png');
import * as Sentry from '@sentry/react-native';
import {SDNavigation} from '@sd/navigation';
const requestExternalStoreageRead = async () => {
  if (Platform.OS === 'ios') {
    return true;
  }
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'JogoRápido Avatar',
        message: 'O APP precisa acessar o armazenamento externo',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (_err) {
    Sentry.addBreadcrumb({
      action: 'home/Menu/partial/header',
      mensagem: 'Falha na solicitação da permissão READ_EXTERNAL_STORAGE',
    });
    console.log(_err);
    return false;
  }
};
export default function AvatarViewUpdate({foto}) {
  const {push} = SDNavigation.navegar;
  const upDateFotos = async () => {
    if (await requestExternalStoreageRead()) {
      push('camera');
    } else {
      push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem: 'Sem permissão para acessar sua galeria de fotos ou câmera',
        },
      });
    }
  };
  return (
    <View style={styl.warp}>
      <View style={styl.warpAsa}>
        <View style={styl.bgAsa}>
          <Image style={styl.iconAsa} resizeMode="contain" source={_asa} />
        </View>
      </View>
      <TouchableOpacity style={styl.warpFoto} onPress={upDateFotos}>
        {foto === null && <Text style={styl.moto}></Text>}
        {foto !== null && (
          <Image resizeMode="cover" style={styl.foto} source={{uri: foto}} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styl.updateFoto} onPress={upDateFotos}>
        <View style={styl.bgAsa}>
          <Text style={styl.camera}></Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
