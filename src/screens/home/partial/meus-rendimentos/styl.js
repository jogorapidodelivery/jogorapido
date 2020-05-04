import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, size, cor, radius} from '@root/app.json';
export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  meusRendimentos: {
    color: cor['20'],
  },
  btnRendimentos: {
    marginTop: normalize(spaces['01']),
    marginBottom: normalize(spaces['02']),
  },
  warpItem: {
    borderRadius: normalize(radius['01']),
    margin: normalize(spaces['01'] / 2),
    padding: normalize(spaces['01']),
    backgroundColor: cor['06'],
  },
  h1: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: normalize(size['07']),
  },
  span: {
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  preco: {
    color: cor['08'],
  },
});
