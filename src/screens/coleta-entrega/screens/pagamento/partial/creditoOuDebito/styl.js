import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {radius, spaces, cor, size, font} from '@root/app.json';
export default StyleSheet.create({
  container: {
    backgroundColor: cor['28'],
    borderTopRightRadius: normalize(radius['02']),
    borderTopLeftRadius: normalize(radius['02']),
  },
  warp: {
    flexDirection: 'row',
    backgroundColor: cor['26'],
    marginHorizontal: normalize(spaces['02']),
    marginTop: normalize(spaces['02']),
    borderRadius: normalize(radius['02']),
  },
  titulo: {
    color: cor['08'],
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    fontWeight: 'bold',
  },
  h1: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['04'],
    marginTop: normalize(spaces['03']),
  },
  btn: {
    alignSelf: 'center',
    minWidth: normalize(50),
    justifyContent: 'center',
    backgroundColor: cor['07'],
    borderRadius: normalize(radius['02']),
    margin: 1,
    padding: normalize(spaces['01']),
  },
  btnDeactived: {
    backgroundColor: cor['26'],
  },
  txtDeactived: {
    color: cor['05'],
  },
});
