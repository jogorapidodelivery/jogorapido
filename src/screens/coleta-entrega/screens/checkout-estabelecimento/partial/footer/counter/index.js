import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
function Counter({totalPedidosSelecionado, totalPedidos}) {
  return (
    <View style={styl.warpFase} pointerEvents="none">
      <Text style={styl.icon}></Text>
      <Text style={styl.parte}>
        {totalPedidosSelecionado}/{totalPedidos}
      </Text>
    </View>
  );
}
export default memo(Counter);
