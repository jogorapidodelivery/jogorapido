import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {radius, spaces, cor, size} from '@root/app.json';
import {stylDefault} from '@src/stylDefault';
export default StyleSheet.create({
  container: {
    paddingHorizontal: normalize(spaces['02']),
    backgroundColor: cor['07'],
  },
  btnAjuda: {
    alignSelf: 'center',
    marginVertical: normalize(spaces['02']),
  },
  warpFase: {
    backgroundColor: cor['06'],
    borderRadius: normalize(radius['03']),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    bottom: -normalize(size['06'] / 2 + 2),
    zIndex: 2,
    paddingHorizontal: normalize(spaces['02']),
  },
  parte: {
    ...stylDefault.span,
    color: cor['13'],
    fontWeight: 'bold',
  },
  icon: {
    fontFamily: 'icomoon',
    fontSize: normalize(size['07']),
    color: cor['08'],
  },
});
