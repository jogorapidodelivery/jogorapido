import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styl from './styl';
function renderAction({icone, titulo, color, action}, index) {
  return (
    <TouchableOpacity style={styl.btnWarp} onPress={action} key={index}>
      {icone && <Text style={[styl.icone, {color}]}>{icone}</Text>}
      {titulo && <Text style={styl.p}>{titulo}</Text>}
    </TouchableOpacity>
  );
}
function Botoes({data}) {
  return <View style={styl.warp}>{data.map(renderAction)}</View>;
}
export default memo(Botoes);
