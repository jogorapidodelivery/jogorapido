import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, radius, size, cor, font} from '@root/app.json';
export default StyleSheet.create({
  container: {
    marginTop: normalize(spaces['01']),
    marginHorizontal: normalize(spaces['02']),
    flexDirection: 'row',
    padding: normalize(spaces['02']),
    borderWidth: 1,
    borderRadius: normalize(radius['02']),
    borderColor: cor['26'],
  },
  warpText: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: normalize(4),
    marginRight: normalize(spaces['02']),
  },
  loadAddress: {
    height: normalize(size['03'] * 1.2),
    marginVertical: normalize(2),
    width: '80%',
  },
  loadName: {
    height: normalize(size['03'] * 1.2),
    width: '60%',
  },
  txtAddress: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    lineHeight: normalize(size['03']),
    color: cor['20'],
    fontWeight: 'bold',
  },
  txtName: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['04']),
    lineHeight: normalize(size['04']),
    color: cor['20'],
  },
  warpGradient: {
    height: normalize(35),
    width: normalize(100),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(radius['02']),
  },
  txtParear: {
    fontWeight: 'bold',
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['03']),
    lineHeight: normalize(size['03']) + 2,
    color: cor['07'],
    marginLeft: normalize(spaces['02']),
  },
  txtIcone: {
    fontFamily: 'icomoon',
    color: cor['07'],
    width: normalize(size['08'] * 0.8),
    fontSize: normalize(size['08']),
  },
});
