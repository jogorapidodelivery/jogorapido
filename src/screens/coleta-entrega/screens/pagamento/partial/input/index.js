import React, {memo} from 'react';
import {View, Text, TextInput} from 'react-native';
import styl from './styl';
import BtnIncrementDecrement from './partial/btnIncrementDecrement';
function ItensPagos(props) {
  function decrement() {}
  function increment() {}
  return (
    <View style={styl.container}>
      <Text style={styl.titulo}>quero pagar</Text>
      <View style={styl.groupItens}>
        <BtnIncrementDecrement value="-" action={decrement} />
        <View style={styl.warpInput}>
          <TextInput
            style={styl.inputText}
            placeholder="Valor"
            underlineColorAndroid="transparent"
            keyboardType={'numeric'}
          />
        </View>
        <BtnIncrementDecrement value="+" action={increment} />
      </View>
    </View>
  );
}
export default memo(ItensPagos);
