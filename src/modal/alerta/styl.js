import {Platform, StyleSheet} from 'react-native';
import {size, font, cor} from '@root/app.json';
import {normalize} from '@sd/uteis/NumberUteis';
export default StyleSheet.create({
  text: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['20'],
  },
  strong: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['08'],
    fontWeight: 'bold',
  },
  b: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['08'],
    fontWeight: 'bold',
  },
});
