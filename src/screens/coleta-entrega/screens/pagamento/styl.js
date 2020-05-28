import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  warpList: {
    flex: 1,
    backgroundColor: cor['07'],
    paddingHorizontal: normalize(spaces['02']),
  },
  list: {},
  warpBackground: {
    flex: 1,
  },
  imageBackground: {
    resizeMode: 'cover',
    bottom: null,
    flexGrow: 1,
    minHeight: 350,
  },
  warpRoutes: {
    flexGrow: 1,
    backgroundColor: cor['07'],
  },
});
