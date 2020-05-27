import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, radius, font, cor, size} from '@root/app.json';
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: normalize(spaces['03']),
  },
  titulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['04'],
    marginBottom: normalize(spaces['01']),
  },
  warpInput: {
    height: normalize(80),
    width: normalize(300),
    borderRadius: normalize(radius['02']),
    backgroundColor: cor['26'],
  },
  inputText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['08']),
    color: cor['08'],
  },
  detalhe: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['02']),
    color: cor['04'],
    marginTop: normalize(spaces['01']),
  },
});
