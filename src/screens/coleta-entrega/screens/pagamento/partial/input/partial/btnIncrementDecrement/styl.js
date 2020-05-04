import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {font, cor, size} from '@root/app.json';
export default StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    width: normalize(60),
  },
  texto: {
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['06']),
    color: cor['22'],
    fontWeight: 'bold',
  },
});
