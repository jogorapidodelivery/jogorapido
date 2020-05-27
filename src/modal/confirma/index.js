import React, {PureComponent} from 'react';
import Base from '../base';
import styl from './styl';
import {View} from 'react-native';
import HTML from 'react-native-render-html';
import Button from '@sd/components/button';
/*
this.props.navigation.push("confirma", {params:{
    titulo:"JogoRápido",
    mensagem: "Os seguintes campos não foram preenchidos corretamente:"
}}) */
export default class Confirma extends PureComponent {
  isClose = false;
  _onPress = acao => {
    this.isClose = true;
    const {
      navigation: {
        goBack,
        state: {
          params: {
            params: {
              button: {onPress},
            },
          },
        },
      },
    } = this.props;
    goBack();
    if (onPress) {
      onPress(acao);
    }
  };
  componentWillUnmount() {
    const {
      navigation: {
        state: {
          params: {
            params: {
              button: {onPress},
            },
          },
        },
      },
    } = this.props;
    if (!this.isClose) {
      onPress({acao: 'cancelar'});
    }
  }
  render() {
    let {
      navigation: {
        state: {
          params: {
            params: {titulo, mensagem, button},
          },
        },
      },
    } = this.props;
    return (
      <Base
        navigation={this.props.navigation}
        title={titulo}
        closeAction={this._onPress.bind(this, {acao: 'cancelar'})}>
        <HTML html={mensagem} tagsStyles={styl} baseFontStyle={styl.text} />
        <View style={styl.warpBtns}>
          <Button
            {...button}
            styleName="pequeno"
            onPress={this._onPress.bind(this, {acao: 'confirmar'})}
          />
        </View>
      </Base>
    );
  }
}
