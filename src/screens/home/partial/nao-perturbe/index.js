import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
const NaoPerturbe = () => {
  return (
    <View style={styl.container}>
      <Text style={styl.icon}></Text>
      <Text style={styl.mensagem}>
        Desabilite o recurso de <Text style={styl.bold}>não perturbe</Text> de
        seu aparelho para <Text style={styl.bold}>ativar o som</Text> e receber
        notificação em segundo plano.
      </Text>
    </View>
  );
};
export default memo(NaoPerturbe);
