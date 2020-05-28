import React, {memo, useContext} from 'react';
import {View, Text, Button} from 'react-native';
import AutenticarContext from './api';
function Receber({navigation: {navigate}}) {
  const props = useContext(AutenticarContext);
  const handlerToogle = () => {
    navigate('ListarMaquininhas');
  };
  const handlerPopToTop = () => {
    console.log(props);
  };
  return (
    <View>
      <Text>Receber</Text>
      <Button onPress={handlerToogle} title="Receber" color="#841584" />
      <Button onPress={handlerPopToTop} title="PopToTop" color="#841584" />
    </View>
  );
}
export default memo(Receber);
