import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
function ValorPago({index}) {
  let style = [styl.container];
  if (index === 0) {
    style.push(styl.containerFirst);
  }
  return (
    <View style={style}>
      <Text style={styl.texto}>
        <Text>Crétido </Text>
        <Text style={styl.operadora}>( VISA )</Text>
      </Text>
      <Text style={styl.total}>190,00</Text>
    </View>
  );
}
export default memo(ValorPago);
