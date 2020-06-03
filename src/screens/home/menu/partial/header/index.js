import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styl from './styl';
import {stylDefault} from '@src/stylDefault';
import Avatar from './partial/avatar';
export default function Header({
  navigation: {push},
  data: {email, telefone, foto, nome},
}) {
  return (
    <View style={styl.container}>
      <Avatar foto={foto} push={push} />
      <TouchableOpacity style={styl.btn}>
        <Text style={[stylDefault.p, styl.p]}>{email}</Text>
        <Text style={styl.icon}></Text>
      </TouchableOpacity>
      <Text style={[stylDefault.h1, styl.nome]}>{nome}</Text>
      <TouchableOpacity style={styl.btn}>
        <Text style={[stylDefault.p, styl.p]}>{telefone}</Text>
        <Text style={styl.icon}></Text>
      </TouchableOpacity>
    </View>
  );
}
