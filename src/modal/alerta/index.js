import React, {PureComponent} from 'react';
import Base from '../base';
import styl from './styl';
import HTML from 'react-native-render-html';
/*
this.props.navigation.push("alerta", {params:{
    titulo:"JogoRápido",
    mensagem: "Os seguintes campos não foram preenchidos corretamente:"
}}) */
export default class Alerta extends PureComponent {
  isClose = false;
  _onPress = acao => {
    this.isClose = true;
    const {
      navigation: {
        goBack,
        state: {
          params: {
            params: {onPress},
          },
        },
      },
    } = this.props;
    goBack();
    if (onPress) {
      onPress({acao: 'cancelar'});
    }
  };
  componentWillUnmount() {
    const {
      navigation: {
        state: {
          params: {
            params: {onPress},
          },
        },
      },
    } = this.props;
    if (!this.isClose) {
      if (onPress) {
        onPress({acao: 'cancelar'});
      }
    }
  }
  render() {
    const {
      navigation: {
        state: {
          params: {
            params: {titulo, mensagem},
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
      </Base>
    );
  }
}
