import React from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
import Botoes from './partial/botoes';
import Horarios from './partial/horarios';

export default function ItemColeta(props) {
  if (!('titulo' in props)) {
    return null;
  }
  const {
    titulo: {bold, normal},
    distancia,
    nome,
    endereco,
    horarios,
    buttons,
  } = props;
  return (
    <View style={styl.item}>
      <Text style={[styl.titulo, styl.coleta, styl.tituloSpace]}>
        {bold} <Text style={styl.regular}>{normal}</Text>
      </Text>
      <View style={styl.border}>
        <Text style={styl.titulo}>
          {nome}{' '}
          {distancia && <Text style={styl.distancia}>{distancia} m</Text>}
        </Text>
        <Text style={[styl.titulo, styl.regular]}>{endereco}</Text>
        <Horarios data={horarios} />
      </View>
      <Botoes data={buttons} />
    </View>
  );
}
