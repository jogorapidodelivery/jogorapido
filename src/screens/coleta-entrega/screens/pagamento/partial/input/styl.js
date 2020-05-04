import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, radius, font, cor, size} from '@root/app.json';
export default StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: normalize(spaces['03']),
  },
  titulo: {
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    color: cor['04'],
    marginBottom: normalize(spaces['01']),
    fontWeight: 'normal',
  },
  groupItens: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: normalize(60),
  },
  warpInput: {
    width: normalize(115),
    borderRadius: normalize(radius['02']),
    backgroundColor: cor['26'],
  },
  inputText: {
    flex: 1,
    textAlign: 'center',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['07']),
    color: cor['08'],
    fontWeight: 'normal',
  },
});
