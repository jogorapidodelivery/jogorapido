import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces} from '@root/app.json';
export default StyleSheet.create({
  loading: {
    margin: normalize(spaces['03']),
  },
  btn: {
    marginTop: normalize(spaces['02']),
    marginHorizontal: normalize(spaces['02']),
  },
});
