import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, size, font, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    margin: normalize(spaces['03']),
    alignItems: 'center',
  },
  texto: {
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['05']),
    color: cor['20'],
    fontWeight: 'normal',
  },
  valor: {
    fontWeight: 'bold',
    color: cor['09'],
  },
  detalhe: {
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['22'],
    fontWeight: 'normal',
  },
});
