import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {cor, spaces} from '@root/app.json';
export default StyleSheet.create({
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
});
