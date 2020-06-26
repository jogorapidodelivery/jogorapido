import React, {memo} from 'react';
import {
  Platform,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import Footer from './partial/footer';
import HeaderDay from './partial/header';
import Header from '../../screens/coleta-entrega/partial/header';
import styl from './styl';
import MinhaEscalaItem from './partial/minhaEscalaItem';
import {toogleTabDisponibilidade} from '@actions/disponibilidade';
import {cor as corApp} from '@root/app.json';
const behavior = Platform.select({
  android: 'height',
  ios: 'padding',
});
const DisponibilidadeComponent = ({
  refreshing,
  onRefresh,
  data: dataFooter,
}) => {
  const _renderScale = item => {
    if (item.item === null) {
      return null;
    }
    return <MinhaEscalaItem push={dataFooter.push} {...item} />;
  };
  const _toogleDay = data => {
    toogleTabDisponibilidade(data);
  };
  const _extractHorario = ({data, ativo}, index) => {
    const {diaSelecionado} = dataFooter;
    const key = `index-${index}-${diaSelecionado || '0'}-${data || '0'}-${
      ativo ? '0' : '1'
    }`;
    return key;
  };
  const {pop, semana, diaSelecionado, itemsSelecionados} = dataFooter;
  if (semana === null || semana.length < diaSelecionado) {
    return null;
  }
  const {dia, data} = semana[diaSelecionado];
  if (dia === null) {
    return null;
  }
  return (
    <KeyboardAvoidingView style={styl.container} behavior={behavior} enabled>
      <ImageBackground
        source={require('@images/gradiente.png')}
        style={styl.warpBackground}
        imageStyle={styl.imageBackground}>
        <SafeAreaView style={styl.container}>
          <Header titulo="Pagamento" goto={pop} />
          <FlatList
            extraData={itemsSelecionados}
            ListHeaderComponent={
              <HeaderDay
                toogleDay={_toogleDay}
                dia={dia}
                semana={semana}
                diaSelecionado={diaSelecionado}
              />
            }
            refreshControl={
              refreshing ? (
                <RefreshControl
                  tintColor={corApp['07']}
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              ) : null
            }
            ListFooterComponent={<Footer data={dataFooter} />}
            showsVerticalScrollIndicator={false}
            data={data}
            numColumns={2}
            style={styl.warpData}
            contentContainerStyle={styl.warpItems}
            keyExtractor={_extractHorario}
            renderItem={_renderScale}
          />
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};
export default memo(DisponibilidadeComponent);
