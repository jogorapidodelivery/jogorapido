import React, {PureComponent, Fragment} from 'react';
import {View, Text} from 'react-native';
import Button from '@sd/components/button';
import {stylDefault} from '@src/stylDefault';
import styl from './styl';
import {
  View as AnimatableView,
  Text as AnimatableText,
} from 'react-native-animatable';
export default class MeusRendimentos extends PureComponent {
  _submit = () => {
    this.props.navigation.push('extrato');
  };

  render() {
    const {corridas_semana, total_frete_semana} = this.props;
    return (
      <Fragment>
        <AnimatableText
          animation="fadeInUp"
          useNativeDriver={true}
          delay={1800}
          style={[stylDefault.h1, styl.meusRendimentos]}>
          Últimos 7 dias
        </AnimatableText>
        <View style={styl.container}>
          <AnimatableView
            animation="fadeInUp"
            useNativeDriver={true}
            delay={1900}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styl.warpItem, {flex: 1}]}>
            <Text style={[stylDefault.h1, styl.h1]}>
              {corridas_semana || 0}
            </Text>
            <Text style={[stylDefault.span, styl.span]}>viagens</Text>
          </AnimatableView>
          <AnimatableView
            animation="fadeInUp"
            useNativeDriver={true}
            delay={2000}
            // eslint-disable-next-line react-native/no-inline-styles
            style={[styl.warpItem, {flex: 2}]}>
            <Text style={[stylDefault.h1, styl.h1]}>
              <Text style={[stylDefault.span, styl.preco]}>R$</Text>
              {total_frete_semana}
            </Text>
            <Text style={[stylDefault.span, styl.span]}>saldo atual</Text>
          </AnimatableView>
        </View>
        <AnimatableView animation="flipInX" useNativeDriver={true} delay={2100}>
          <Button
            style={styl.btnRendimentos}
            text={{
              value: 'Meus rendimentos',
              color: '07',
            }}
            rightIcon={{
              value: '',
              color: '07',
            }}
            onPress={this._submit}
            bg="14"
          />
        </AnimatableView>
      </Fragment>
    );
  }
}
