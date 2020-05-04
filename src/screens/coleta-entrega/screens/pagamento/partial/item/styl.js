import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {radius, spaces, font, size, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    marginHorizontal: normalize(spaces['02']),
    padding: normalize(spaces['01']),
    borderLeftColor: cor['26'],
    borderLeftWidth: 1,
    borderRightColor: cor['26'],
    borderRightWidth: 1,
    borderBottomColor: cor['26'],
    borderBottomWidth: 1,
  },
  containerFirst: {
    borderTopColor: cor['26'],
    borderTopWidth: 1,
    borderTopLeftRadius: normalize(radius['02']),
    borderTopRightRadius: normalize(radius['02']),
  },
  texto: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['20'],
  },
  total: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['04']),
    color: cor['10'],
    fontWeight: 'bold',
  },
  operadora: {
    fontWeight: 'bold',
  },
});
