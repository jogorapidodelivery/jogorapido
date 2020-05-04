import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {cor, spaces, size, hButton} from '@root/app.json';

export default StyleSheet.create({
  warp: {
    marginBottom: normalize(spaces['02']),
    left: -normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  warpAsa: {
    right: -normalize(15),
    zIndex: 2,
    height: normalize(70),
    width: normalize(70),
    borderRadius: normalize(35),
    borderWidth: normalize(3),
    borderColor: 'rgba(255,255,255, .3)',
  },
  updateFoto: {
    left: -normalize(10),
    height: normalize(hButton['01']),
    width: normalize(hButton['01']),
    borderRadius: normalize(hButton['01'] / 2),
    borderWidth: normalize(3),
    borderColor: 'rgba(255,255,255, .3)',
  },
  bgAsa: {
    flex: 1,
    borderRadius: normalize(35),
    backgroundColor: cor['07'],
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  foto: {
    height: normalize(120 - 6),
    width: normalize(120 - 6),
    backgroundColor: cor['02'],
    borderRadius: normalize(60),
  },
  warpFoto: {
    backgroundColor: cor['25'],
    justifyContent: 'center',
    alignContent: 'center',
    height: normalize(120),
    width: normalize(120),
    borderRadius: normalize(60),
    borderWidth: normalize(3),
    borderColor: 'rgba(255,255,255, .3)',
  },
  iconAsa: {
    position: 'absolute',
    width: normalize(40),
    height: normalize(47),
    right: normalize(spaces['01']),
    bottom: normalize(spaces['01']),
  },
  camera: {
    color: cor['08'],
    fontFamily: 'icomoon',
    fontSize: normalize(size['07']),
  },
  moto: {
    color: cor['07'],
    textAlign: 'center',
    fontFamily: 'icomoon',
    fontSize: normalize(110),
  },
});
