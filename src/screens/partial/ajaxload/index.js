import React from 'react';
import {Container, ImageErro} from './styl';
import Info from '@screens/partial/info';
import Button from '@sd/components/button';
const frase = [
  'O Servidor não está dando conta do recado e os dados que você quer carregar está com instabilidade momentânea.\n',
  'Clique no botão abaixo para tentar novamente.',
];
export default function AjaxLoad({hasErro, callBack, post, children}) {
  if (!hasErro) {
    return children;
  }
  return (
    <Container>
      <ImageErro source={require('@images/erro.png')} />
      <Info data={frase} />
      <Button
        onPress={() => callBack && callBack(post)}
        text={{value: 'Tentar novamente', color: '07'}}
        bg="14"
        rightIcon={{value: '', color: '07'}}
      />
    </Container>
  );
}
