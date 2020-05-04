import React, {Fragment, memo} from 'react';
import {
  FlatList,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styl from './styl';
import Header from '../../partial/header';
import Item from './partial/item';
import Footer from './partial/footer';
import HeaderList from './partial/header';
import Input from './partial/input';
import Mensagem from './partial/mensagem';
import TotalPago from './partial/totalPago';
const behavior = Platform.select({
  android: 'height',
  ios: 'padding',
});
function Pagamento(props) {
  const {
    navigation: {
      pop,
      state: {
        params: {
          params: {total, coleta_id, entregador_id},
        },
      },
    },
  } = props;
  console.log({total, coleta_id, entregador_id});
  return (
    <KeyboardAvoidingView style={styl.container} behavior={behavior} enabled>
      <ImageBackground
        source={require('@images/gradiente.png')}
        style={styl.warpBackground}
        imageStyle={styl.imageBackground}>
        <SafeAreaView style={styl.container}>
          <Header titulo="Pagamento" goto={pop} />
          <FlatList
            ListFooterComponentStyle={styl.footer}
            ListHeaderComponent={<HeaderList />}
            ListFooterComponent={
              <Fragment>
                <TotalPago />
                <Mensagem />
                <Input />
                <Footer />
              </Fragment>
            }
            data={[{id: 'a'}, {id: 'b'}, {id: 'c'}]}
            renderItem={({item, index}) => <Item index={index} {...item} />}
            keyExtractor={item => item.id}
            style={styl.lista}
          />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
export default memo(Pagamento);
