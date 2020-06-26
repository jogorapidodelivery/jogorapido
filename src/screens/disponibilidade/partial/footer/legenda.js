import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {View as AnimatableView} from 'react-native-animatable';
import styl from './styl';
function FooterLegenda() {
  return (
    <AnimatableView
      style={styl.warp}
      animation="fadeIn"
      useNativeDriver={true}
      delay={250}>
      <Text style={[styl.icone, styl.icCorAtoa]}></Text>
      <Text style={styl.legenda}>Descanso</Text>
      <Text style={[styl.icone, styl.icCorPendente]}></Text>
      <Text style={styl.legenda}>Pendente</Text>
      <Text style={[styl.icone, styl.icCorAprovado]}></Text>
      <Text style={styl.legenda}>Aprovado</Text>
    </AnimatableView>
  );
}
export default memo(FooterLegenda);
