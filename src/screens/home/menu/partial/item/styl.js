import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor} from '@root/app.json';
import {stylDefault} from '@src/stylDefault';
export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: cor['07'],
    paddingVertical: normalize(spaces['01']),
  },
  icon: {
    color: cor['08'],
  },
  p: {
    ...stylDefault.p,
    flex: 1,
  },
  checkbox: {
    marginRight: normalize(spaces['01']),
  },
});
