import React, {PureComponent} from 'react';
import {Text} from 'react-native';
import {View as ViewAnimatable} from 'react-native-animatable';
import styl from './styl';
import {stylDefault} from '@src/stylDefault';
export default class AlertTipoToast extends PureComponent {
  render() {
    const {titulo} = this.props;
    return (
      <ViewAnimatable
        useNativeDriver={true}
        delay={200}
        animation="fadeInDown"
        style={styl.container}>
        <Text style={[stylDefault.span, styl.mensagem]}>{titulo}</Text>
      </ViewAnimatable>
    );
  }
}
