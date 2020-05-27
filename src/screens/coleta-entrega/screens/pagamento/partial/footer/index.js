import React, {memo} from 'react';
import {View} from 'react-native';
import Button from '@sd/components/button';
import {whatsapp} from '@screens/home/menu/partial/item/commands';
import styl from './styl';
function Footer({onPress, titulo: value, actived}) {
  return (
    <View style={styl.container}>
      <Button
        onPress={onPress}
        text={{
          value,
          color: '07',
        }}
        bg={actived ? '14' : '15'}
      />
      <Button
        onPress={whatsapp}
        style={styl.btnAjuda}
        text={{value: 'Preciso de ajuda', color: '07'}}
        leftIcon={{value: '', color: '07'}}
        styleName="pequeno"
        bg={'09'}
      />
    </View>
  );
}
export default memo(Footer);
