import {StyleSheet} from 'react-native';
import {cor, spaces, radius} from '@root/app.json';
import {stylDefault} from '../../../../../../stylDefault';
import {normalize} from '@sd/uteis/NumberUteis';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: cor['07'],
    alignItems: 'center',
  },
  warp: {
    width: normalize(130),
    height: normalize(130),
    borderRadius: normalize(radius['02']),
    backgroundColor: cor['19'],
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...stylDefault.p,
    color: cor['07'],
  },
  erro: {
    ...stylDefault.p,
    marginHorizontal: normalize(spaces['03']),
    color: cor['12'],
    textAlign: 'center',
    marginTop: normalize(spaces['03']),
  },
  info: {
    ...stylDefault.p,
    marginHorizontal: normalize(spaces['03']),
    color: cor['13'],
    textAlign: 'center',
    marginTop: normalize(spaces['03']),
  },
});
