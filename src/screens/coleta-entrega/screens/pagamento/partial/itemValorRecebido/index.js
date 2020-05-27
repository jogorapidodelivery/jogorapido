import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
function ItemValorRecebido({index, tipo_pagamento, cardBrand, receber}) {
  let style = [styl.container];
  if (index === 0) {
    style.push(styl.containerFirst);
  }
  return (
    <View style={style}>
      <Text style={styl.texto}>
        <Text>{tipo_pagamento} </Text>
        <Text style={styl.operadora}>( {cardBrand} )</Text>
      </Text>
      <Text style={styl.total}>{receber}</Text>
    </View>
  );
}
export default memo(ItemValorRecebido);
