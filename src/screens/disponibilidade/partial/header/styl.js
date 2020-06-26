import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {cor, spaces} from '@root/app.json';
export default StyleSheet.create({
  p: {
    textAlign: 'center',
    marginTop: normalize(spaces['01']),
  },
  span: {
    textAlign: 'center',
    color: cor['13'],
    marginBottom: normalize(spaces['02']),
    marginTop: normalize(spaces['01']),
  },
  dia: {
    textAlign: 'center',
    marginVertical: normalize(spaces['01']),
  },
});
