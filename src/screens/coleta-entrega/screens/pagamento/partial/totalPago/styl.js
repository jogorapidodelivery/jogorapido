import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, radius, size, cor, font} from '@root/app.json';
export default StyleSheet.create({
  container: {
    marginHorizontal: normalize(spaces['02']),
    backgroundColor: cor['26'],
    borderBottomLeftRadius: normalize(radius['02']),
    borderBottomRightRadius: normalize(radius['02']),
    padding: normalize(spaces['01']),
  },
  texto: {
    textAlign: 'right',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['04']),
    color: cor['20'],
  },
  valor: {
    fontWeight: 'bold',
    color: cor['10'],
  },
});
