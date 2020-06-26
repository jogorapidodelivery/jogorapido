import {StyleSheet} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {hButton, radius, cor, size, spaces} from '@root/app.json';
import {stylDefault} from '@src/stylDefault';
export default StyleSheet.create({
  info: {
    marginVertical: normalize(spaces['02']),
    textAlign: 'center',
    fontSize: normalize(size['02']),
  },
  warpBtn: {
    borderRadius: normalize(radius['01']),
    height: normalize(hButton['02']),
  },
  legenda: {
    ...stylDefault.p,
    marginRight: normalize(spaces['01']),
  },
  bold: {
    color: cor['08'],
    fontWeight: 'bold',
  },
  warp: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(spaces['02']),
    marginBottom: normalize(spaces['03']),
  },
  span: {
    color: cor['13'],
  },
  icone: {
    fontFamily: 'icomoon',
    fontSize: normalize(size['07']),
  },
  icCorAtoa: {color: cor['04']},
  icCorPendente: {color: cor['12']},
  icCorAprovado: {color: cor['10']},
  icCorReprovado: {color: cor['09']},
});
