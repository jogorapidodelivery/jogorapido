import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  list: {
    flex: 1,
    backgroundColor: cor['07'],
  },
  warpBackground: {
    flex: 1,
    backgroundColor: cor['07'],
  },
  imageBackground: {
    resizeMode: 'cover',
    bottom: null,
    flexGrow: 1,
    minHeight: 350,
  },
  btnAjuda: {
    alignSelf: 'center',
    marginVertical: normalize(spaces['02']),
  },
});
