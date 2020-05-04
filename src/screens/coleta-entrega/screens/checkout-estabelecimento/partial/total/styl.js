import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {size, font, radius, spaces, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    width: '100%',
    height: normalize(size['04'] * 1.5 + spaces['01']),
    borderBottomEndRadius: normalize(radius['02']),
    borderBottomStartRadius: normalize(radius['02']),
  },
  warp: {
    backgroundColor: cor['06'],
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  warpTotal: {
    alignItems: 'flex-end',
  },
  warpTotalLoader: {
    borderRadius: normalize(radius['01']),
    width: normalize(100),
    marginTop: normalize(spaces['01']),
    height: normalize(size['04'] * 1.5),
  },
  titulo: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['04']),
    fontWeight: 'bold',
  },
  frete: {
    fontWeight: 'normal',
    paddingRight: spaces['01'],
    color: cor['20'],
  },
  labelTotal: {
    fontSize: normalize(size['03']),
    color: cor['04'],
    fontWeight: 'normal',
  },
  total: {
    textAlign: 'right',
    color: cor['08'],
    paddingTop: normalize(spaces['01']),
    paddingHorizontal: normalize(spaces['01']),
  },
});
