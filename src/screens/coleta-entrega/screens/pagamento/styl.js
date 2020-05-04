import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    flexGrow: 1,
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
  lista: {
    backgroundColor: cor['07'],
    marginBottom: 10,
  },
  footer: {
    marginBottom: normalize(50),
  },
});
