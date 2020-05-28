import {StyleSheet} from 'react-native';
import {cor, radius} from '@root/app.json';
import {stylDefault} from '../../stylDefault';
import {normalize} from '@sd/uteis/NumberUteis';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
});
