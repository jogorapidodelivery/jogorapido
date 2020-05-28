import {StyleSheet, Platform} from 'react-native';
import {normalize} from '@sd/uteis/NumberUteis';
import {font, hButton, cor, size} from '@root/app.json';
export default StyleSheet.create({
  titulo: {
    flex: 1,
    color: cor['07'],
    fontFamily: font[Platform.OS],
    fontSize: normalize(size['04']),
    fontWeight: 'bold',
  },
  normal: {
    fontWeight: 'normal',
  },
  header: {
    height: normalize(hButton['02']),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      android: {
        marginTop: normalize(25),
      },
    }),
  },
});
