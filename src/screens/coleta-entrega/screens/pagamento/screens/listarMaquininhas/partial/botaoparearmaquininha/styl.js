import {StyleSheet} from 'react-native';
import {stylDefault} from '@src/stylDefault';
import {normalize} from '@sd/uteis/NumberUteis';
import {spaces} from '@root/app.json';
export default StyleSheet.create({
  chave: {
    ...stylDefault.p,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: normalize(spaces['03']),
    marginBottom: normalize(spaces['01']),
  },
  nome: {
    ...stylDefault.p,
  },
  btn: {
    marginHorizontal: normalize(spaces['02']),
  },
});
