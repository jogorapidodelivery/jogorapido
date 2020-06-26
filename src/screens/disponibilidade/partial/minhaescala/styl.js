import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, cor, radius} from '@root/app.json';
export default StyleSheet.create({
  containerItem: {
    flexBasis: 0,
    flexGrow: 1,
    minWidth: normalize(150),
    margin: normalize(spaces['01'] / 2),
  },
  containerItemWarp: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: normalize(radius['01']),
    padding: normalize(spaces['01']),
  },
  titulo: {
    fontWeight: 'bold',
  },
  actived: {
    position: 'absolute',
    right: normalize(5),
    top: normalize(5),
    fontSize: normalize(30),
    fontFamily: 'icomoon',
  },
});
