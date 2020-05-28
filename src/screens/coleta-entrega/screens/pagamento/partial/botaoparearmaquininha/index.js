import React, {memo, Fragment} from 'react'; // , useContext
import {Text} from 'react-native';
import Button from '@sd/components/button';
import styl from './styl';
function BotaoParearMaquininha({chave, nome, onPress}) {
  return (
    <Fragment>
      <Text style={styl.chave}>
        {chave}
        <Text style={styl.nome}> {nome}</Text>
      </Text>
      <Button
        style={styl.btn}
        text={{
          value: 'Conectar',
          color: '07',
        }}
        rightIcon={{
          value: '',
          color: '07',
        }}
        bg="14"
        onPress={onPress}
      />
    </Fragment>
  );
}
export default memo(BotaoParearMaquininha);
