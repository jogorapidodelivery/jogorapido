import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
function Header(props) {
  return (
    <View style={styl.container}>
      <Text style={styl.titulo}>Valor recebido</Text>
    </View>
  );
}
export default memo(Header);
