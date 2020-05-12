import {Platform, StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {font, radius, spaces, cor, size} from '@root/app.json';
export default StyleSheet.create({
  container: {
    backgroundColor: cor['09'],
    marginTop: spaces['02'],
    padding: spaces['02'],
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: normalize(radius['02']),
  },
  icon: {
    color: cor['07'],
    fontFamily: 'icomoon',
    fontSize: normalize(size['08']),
  },
  bold: {
    fontWeight: 'bold',
  },
  mensagem: {
    flex: 1,
    color: cor['07'],
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    fontWeight: '500',
  },
});
