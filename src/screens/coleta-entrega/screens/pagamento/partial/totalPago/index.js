import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
function TotalPago(props) {
  return (
    <View style={styl.container}>
      <Text style={styl.texto}>
        <Text>Total recebido </Text>
        <Text style={styl.valor}>380,00</Text>
      </Text>
    </View>
  );
}
export default memo(TotalPago);
