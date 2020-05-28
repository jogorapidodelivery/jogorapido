import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
function Header({titulo, subtitulo}) {
  return (
    <View style={styl.container}>
      <Text style={styl.titulo}>{titulo}</Text>
      {subtitulo && <Text style={styl.subtitulo}>{subtitulo}</Text>}
    </View>
  );
}
export default memo(Header);
