import React, {useState} from 'react';
import BaseScreen from '@screens/partial/base';
import styl from './styl';
import GaleriaDevice from './partial/galeria';
import CameraDevice from './partial/camera';
import {CameraKitGallery} from 'react-native-camera-kit';
import ImageResizer from 'react-native-image-resizer';
import {empty} from '@sd/uteis/StringUteis';
const onTapImage = async (_e, pop) => {
  const image = await CameraKitGallery.getImageForTapEvent(_e.nativeEvent);
  if (!empty(image) && !empty(image.imageUri)) {
    _resize(image.imageUri, pop);
  }
};
const _upload = (file, pop) => {
  console.log(file);
  pop();
};
const _resize = (_f, pop) => {
  ImageResizer.createResizedImage(_f, 400, 400, 'JPEG', 80)
    .then(_fNew => {
      _upload(_fNew.uri, pop);
    })
    .catch(_erro => {
      _upload(_f, pop);
    });
};
const _actionsCamera = (_e, setState, pop) => {
  switch (_e.type) {
    case 'left':
      setState(false);
      break;
    case 'capture':
      _resize(`file://${_e.captureImages[0].uri}`, pop);
      break;
    default:
      console.warn('Actions.pop');
      pop();
      break;
  }
};
export default function Camera({navigation}) {
  const [isCamera, setIsCamera] = useState(false);
  return (
    <BaseScreen
      styleImportant={styl.container}
      tituloBold="GALERIA"
      navigation={navigation}
      titulo="DE FOTOS">
      {isCamera ? (
        <CameraDevice
          pop={navigation.pop}
          action={_actionsCamera}
          setIsCamera={setIsCamera}
        />
      ) : (
        <GaleriaDevice
          pop={navigation.pop}
          action={onTapImage}
          actionToogle={setIsCamera}
        />
      )}
    </BaseScreen>
  );
}
