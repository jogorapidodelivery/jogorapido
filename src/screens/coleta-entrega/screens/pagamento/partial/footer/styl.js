import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    paddingHorizontal: normalize(spaces['02']),
    backgroundColor: cor['07'],
    marginVertical: normalize(spaces['03']),
  },
  btnAjuda: {
    alignSelf: 'center',
    marginVertical: normalize(spaces['02']),
  },
});
