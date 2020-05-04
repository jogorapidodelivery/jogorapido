import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, radius, font, size, cor} from '@root/app.json';
export default StyleSheet.create({
  container: {
    borderBottomColor: cor['26'],
    borderBottomWidth: 1,
    borderLeftColor: cor['26'],
    borderLeftWidth: 1,
    borderRightColor: cor['26'],
    borderRightWidth: 1,
  },
  radius: {
    borderTopColor: cor['26'],
    borderTopWidth: 1,
    borderTopRightRadius: normalize(radius['02']),
    borderTopLeftRadius: normalize(radius['02']),
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: normalize(spaces['01']),
  },
  warp: {
    flex: 1,
  },
  col: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  checkIconLoading: {
    marginRight: normalize(spaces['02']),
    width: normalize(size['08']),
    height: normalize(size['08']),
    borderRadius: normalize(radius['02']),
  },
  tituloLoading: {
    width: '80%',
    height: normalize(size['03'] * 1.5),
  },
  precoLoading: {
    width: 70,
    marginTop: normalize(spaces['01']),
    height: normalize(size['03'] * 1.5),
  },
  icon: {
    fontFamily: 'icomoon',
    fontSize: normalize(size['08']),
    marginRight: normalize(spaces['02']),
    color: cor['05'],
    alignSelf: 'flex-start',
  },
  titulo: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['04'],
    fontWeight: 'normal',
  },
  produto: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: cor['08'],
  },
  total: {
    // fontWeight:"bold",
    color: cor['20'],
  },
  valor: {
    alignSelf: 'flex-end',
    fontWeight: 'bold',
    color: cor['09'],
  },
});
