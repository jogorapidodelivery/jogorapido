import React, {memo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styl from './styl';
function renderBtn({actived, name}, key, action) {
  const stylKey = actived ? 'Actived' : 'Deactived';
  return (
    <TouchableOpacity
      onPress={() => action(key)}
      key={`${stylKey}-${key}`}
      style={[styl.btn, styl[`btn${stylKey}`], {flex: name.length}]}>
      <Text style={[styl.titulo, styl[`txt${stylKey}`]]}>{name}</Text>
    </TouchableOpacity>
  );
}
function Filtro({filter, action}) {
  return (
    <View style={styl.container}>
      <View style={styl.warp}>
        {filter.map((v, k) => renderBtn(v, k, action))}
      </View>
    </View>
  );
}
export default memo(Filtro);
