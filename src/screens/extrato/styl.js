import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor} from '@root/app.json';
import {stylDefault} from '@src/stylDefault';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  list: {
    flex: 1,
    backgroundColor: cor['07'],
    paddingRight: normalize(spaces['01']),
    paddingTop: normalize(spaces['01']),
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
  warpEmpty: {
    height: normalize(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textEmpty: {
    ...stylDefault.span,
    textAlign: 'center',
    color: cor['08'],
  },
});
