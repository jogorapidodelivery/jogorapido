import React, {Fragment, memo} from 'react';
import {FlatList} from 'react-native';
import styl from './styl';
import Header from '../../partial/header';
import ItemPinpad from './partial/itemPinpad';
import HeaderList from './partial/header';
function PinPad({devices, handlerPairWith, pop}) {
  const data = devices.length === 0 ? [null, null] : devices;
  const subtitulo =
    devices.length === 0
      ? 'Para visualizar os PAX pareados ao JogoRápido é necessário clicar no botão de ligar do equipamento, em seguinda precione a tecla 0'
      : 'Escolha um PAX clicando em Parear para continuar com o pagamento';
  return (
    <Fragment>
      <Header titulo="Parear PAX" goto={pop} />
      <FlatList
        ListFooterComponentStyle={styl.listItensPinpad}
        ListHeaderComponent={
          <HeaderList titulo="Selecione uma PAX" subtitulo={subtitulo} />
        }
        data={data}
        renderItem={({item, index}) => (
          <ItemPinpad onPress={handlerPairWith} index={index} {...item} />
        )}
        keyExtractor={(_item, index) => index}
        style={styl.lista}
      />
    </Fragment>
  );
}
export default memo(PinPad);
