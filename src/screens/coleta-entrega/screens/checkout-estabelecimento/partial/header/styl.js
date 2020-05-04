import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, radius, cor, font, size} from '@root/app.json';
export default StyleSheet.create({
  container: {
    marginTop: normalize(spaces['02']),
    marginBottom: normalize(spaces['01']),
    paddingHorizontal: normalize(spaces['02']),
    backgroundColor: cor['07'],
  },
  loader: {
    width: normalize(100),
    borderRadius: normalize(radius['01']),
    marginTop: normalize(spaces['02']),
    marginBottom: normalize(spaces['01']),
    height: normalize(size['03'] * 1.5),
    marginHorizontal: normalize(spaces['01']),
  },
  titulo: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),

    color: cor['20'],
    fontWeight: 'bold',
  },
  qtd: {
    color: cor['04'],
    fontWeight: 'normal',
  },
});
