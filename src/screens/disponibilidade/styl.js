import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {hButton, radius, spaces, size, cor} from '@root/app.json';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  warpData: {
    backgroundColor: cor['07'],
    flex: 1,
    padding: normalize(spaces['02']),
  },
  warpBackground: {
    flex: 1,
  },
  imageBackground: {
    resizeMode: 'cover',
    bottom: null,
    flexGrow: 1,
    minHeight: 300,
  },
  p: {
    textAlign: 'center',
  },
  span: {
    textAlign: 'center',
    color: cor['13'],
    marginBottom: normalize(spaces['02']),
  },
  dia: {
    textAlign: 'center',
  },
  warpLegenda: {
    marginVertical: normalize(spaces['02']),
    height: normalize(size['02'] * 3),
  },
  loader: {
    flexBasis: 0,
    flexGrow: 1,
    height: normalize(65),
    borderRadius: normalize(radius['01']),
    margin: normalize(spaces['01'] / 2),
  },
  info: {
    marginVertical: normalize(spaces['01']),
    textAlign: 'center',
  },
  warpBtn: {
    borderRadius: normalize(radius['01']),
    height: normalize(hButton['02']),
  },
});
