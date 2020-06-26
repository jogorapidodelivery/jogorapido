import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {hButton, spaces} from '@root/app.json';
import {stylDefault} from '@src/stylDefault';

export default StyleSheet.create({
  btn: {
    marginTop: normalize(spaces['02']),
    marginLeft: normalize(hButton['01']),
  },
  warpText: {
    marginBottom: normalize(spaces['03']),
    alignItems: 'flex-end',
  },
  text: {
    ...stylDefault.span,
  },
});
