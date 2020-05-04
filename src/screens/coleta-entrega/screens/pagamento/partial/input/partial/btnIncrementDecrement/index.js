import React, {memo} from 'react';
import {Text} from 'react-native';
import styl from './styl';
import {TouchableOpacity} from 'react-native-gesture-handler';
function BtnIncrementDecrement({value, action}) {
  return (
    <TouchableOpacity style={styl.container} onPress={action}>
      <Text style={styl.texto}>{value}</Text>
    </TouchableOpacity>
  );
}
export default memo(BtnIncrementDecrement);
