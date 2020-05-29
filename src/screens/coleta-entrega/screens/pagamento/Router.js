import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, View} from 'react-native';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import {createAppContainer} from 'react-navigation';
import {AutenticarProvider} from './api';
import ListarMaquininhas from './screens/listarMaquininhas';
import Header from '../../partial/header';
import ReceberPagamento from './screens/receberPagamento';
import styl from './styl';
const gradiente = require('@images/gradiente.png');
const RoutePagamento = createAppContainer(
  createAnimatedSwitchNavigator({
    ListarMaquininhas,
    ReceberPagamento,
  }),
);
function Pagamento({
  navigation: {
    popToTop,
    pop,
    navigate,
    state: {
      params: {params},
    },
  },
}) {
  const [titulo, setTitulo] = useState('LISTAR MAQUININHA');
  const data = {...params, popToTop, pop, navigate, setTitulo};
  return (
    <AutenticarProvider {...data}>
      <ImageBackground
        source={gradiente}
        style={styl.warpBackground}
        imageStyle={styl.imageBackground}>
        <SafeAreaView style={styl.container}>
          <Header titulo={titulo} goto={pop} />
          <View style={styl.warpRoutes}>
            <RoutePagamento />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </AutenticarProvider>
  );
}
export default Pagamento;
