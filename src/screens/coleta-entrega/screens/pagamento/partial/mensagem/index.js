import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
function DescricaoPagamento(props) {
  return (
    <View style={styl.container}>
      <Text style={styl.texto}>
        <Text>
          Receba <Text style={styl.valor}>R$ 900,00</Text>
          {'\n'}
        </Text>
        <Text>
          Este valor pode ser pago com até 5 cartões de crédito/débito
        </Text>
      </Text>
      <Text style={styl.detalhe}>Valor mínimo R$ 10,00</Text>
    </View>
  );
}
export default memo(DescricaoPagamento);
