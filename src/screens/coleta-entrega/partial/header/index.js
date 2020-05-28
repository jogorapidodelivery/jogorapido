import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
import Button from '@sd/components/button';
function Header({titulo, goto}) {
  const textAlign = goto === undefined ? 'center' : 'left';
  const [normal, ...regular] = titulo.toUpperCase().split(' ');
  return (
    <View style={styl.header}>
      {goto && <Button onPress={goto} leftIcon={{value: '', color: '07'}} />}
      <Text style={[styl.titulo, {textAlign}]}>
        {normal} <Text style={styl.normal}>{regular.join(' ')}</Text>
      </Text>
    </View>
  );
}
export default memo(Header);
