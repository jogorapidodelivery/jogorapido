import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces, size, cor} from '@root/app.json';
import {stylDefault} from '@src/stylDefault';
export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginVertical: normalize(spaces['03']),
  },
  btnAjuda: {
    alignSelf: 'center',
    alignContent: 'flex-end',
    marginTop: normalize(spaces['03']),
  },
  warpMsg: {},
  warpIcon: {
    alignSelf: 'center',
    borderRadius: normalize(50),
    width: normalize(100),
    height: normalize(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: cor['26'],
  },
  icon: {
    ...stylDefault.icon,
    fontSize: normalize(100),
  },
  bgMsg: {
    marginTop: normalize(spaces['02']),
    backgroundColor: cor['26'],
  },
  msg: {
    ...stylDefault.p,
    textAlign: 'center',
    fontSize: normalize(size['03']),
    padding: normalize(spaces['01']),
  },
});
