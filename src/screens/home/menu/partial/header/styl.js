import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {cor, spaces, size} from '@root/app.json';

export default StyleSheet.create({
  container: {
    marginRight: normalize(spaces['01']),
    backgroundColor: cor['19'],
    borderTopEndRadius: normalize(spaces['01']),
    paddingBottom: normalize(spaces['02']),
  },
  btn: {
    right: -normalize(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    color: cor['13'],
    fontFamily: 'icomoon',
    fontSize: normalize(size['07']),
  },
  p: {
    color: cor['07'],
  },
  nome: {
    textTransform: 'capitalize',
    marginTop: 0,
    marginBottom: 0,
    textAlign: 'center',
    color: cor['07'],
  },
});
