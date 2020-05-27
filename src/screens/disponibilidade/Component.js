import React, {PureComponent} from 'react';
import {
  Platform,
  FlatList,
  SafeAreaView,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import Footer from './partial/footer';
import HeaderDay from './partial/header';
import Header from '../../screens/coleta-entrega/partial/header';
import styl from './styl';
import MinhaEscalaItem from '@screens/disponibilidade/partial/minhaescala/index';
import Shimmer from 'react-native-shimmer-placeholder';
import {empty} from '@sd/uteis/StringUteis';
import {
  toogleSelectDisponibilidade,
  toogleTabDisponibilidade,
} from '@actions/disponibilidade';
import {cor as corApp} from '@root/app.json';
const behavior = Platform.select({
  android: 'height',
  ios: 'padding',
});
export default class Component extends PureComponent {
  activedDelay = true;
  _toogleHorario = data => {
    this.activedDelay = false;
    toogleSelectDisponibilidade(data);
  };
  _renderScale = ({item, index}) => {
    if (item.horario === undefined) {
      return (
        <Shimmer
          colorShimmer={corApp['27']}
          style={styl.loader}
          autoRun={true}
          visible={false}
        />
      );
    }
    const {icone, cor, data, disponibilidade, horario} = item;
    const props = {
      index,
      icone,
      cor,
      disponibilidade,
      horario,
      delay: 100 * index,
      hasDelay: this.activedDelay,
      actived: !empty(data),
    };
    return <MinhaEscalaItem onPress={this._toogleHorario} {...props} />;
  };
  _toogleDay = data => {
    this.activedDelay = true;
    toogleTabDisponibilidade(data);
  };
  _extractHorario = ({data}, index) => {
    const {diaSelecionado} = this.props.data;
    return `index-${index}-${diaSelecionado || '0'}-${data || '0'}`;
  };
  render() {
    const {pop, semana, diaSelecionado, itemsSelecionados} = this.props.data;
    if (semana === null || semana.length < diaSelecionado) {
      return null;
    }
    const {dia, data} = semana[diaSelecionado];

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
                  toogleDay={this._toogleDay}
                  dia={dia}
                  semana={semana}
                  diaSelecionado={diaSelecionado}
                />
              }
              ListFooterComponent={<Footer data={this.props.data} />}
              showsVerticalScrollIndicator={false}
              data={data}
              numColumns={2}
              style={styl.warpData}
              contentContainerStyle={styl.warpItems}
              keyExtractor={this._extractHorario}
              renderItem={this._renderScale}
            />
          </SafeAreaView>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
