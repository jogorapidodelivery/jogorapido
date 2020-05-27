import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor} from '@root/app.json';
export default StyleSheet.create({
  minhaEscala: {
    color: cor['20'],
  },
  warpDisponibilidade: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisponibilizar: {
    marginTop: normalize(spaces['01']),
    marginBottom: normalize(spaces['01']),
  },
});
