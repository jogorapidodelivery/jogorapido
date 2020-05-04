import {StyleSheet} from 'react-native';
import {stylDefault} from '@src/stylDefault';
import {cor, spaces} from '@root/app.json';
import {normalize} from '@sd/uteis/NumberUteis';
export default StyleSheet.create({
  warp: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: normalize(spaces['01']),
    marginBottom: 6,
  },
  text: {
    ...stylDefault.p,
    color: cor['07'],
  },
});
