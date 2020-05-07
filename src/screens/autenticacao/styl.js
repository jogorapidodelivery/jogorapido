import {StyleSheet} from 'react-native';
import {spaces, cor} from '@root/app.json';
import {normalize} from '@sd/uteis/NumberUteis';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: normalize(spaces['02']),
    backgroundColor: cor['07'],
  },
  bgIos: {
    height: 277,
    width: '100%',
    marginBottom: normalize(spaces['01']),
  },
  button: {
    marginTop: normalize(spaces['02']),
  },
});
