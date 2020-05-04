import {Platform, StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, size, font, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    padding: normalize(spaces['02']),
  },
  titulo: {
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['04']),
    fontWeight: 'bold',
    color: cor['20'],
  },
});
