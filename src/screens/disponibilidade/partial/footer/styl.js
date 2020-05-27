import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {hButton, radius, spaces} from '@root/app.json';
export default StyleSheet.create({
  info: {
    marginVertical: normalize(spaces['01']),
    textAlign: 'center',
  },
  warpBtn: {
    borderRadius: normalize(radius['01']),
    height: normalize(hButton['02']),
  },
});
