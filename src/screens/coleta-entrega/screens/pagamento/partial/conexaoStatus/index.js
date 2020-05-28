import React, {memo} from 'react'; // , useContext
import {View, Text} from 'react-native';
import Button from '@sd/components/button';
import {whatsapp} from '@screens/home/menu/partial/item/commands';
import styl from './styl';
import {cor} from '@root/app.json';
function ConexaoStatus({children, msg, ic, icCor}) {
  return (
    <View style={styl.container}>
      <View style={styl.warpMsg}>
        <View style={styl.warpIcon}>
          <Text style={[styl.icon, {color: cor[icCor]}]}>{ic}</Text>
        </View>
        <View style={styl.bgMsg}>
          <Text style={styl.msg}>{msg}</Text>
        </View>
      </View>
      {children}
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
export default memo(ConexaoStatus);
