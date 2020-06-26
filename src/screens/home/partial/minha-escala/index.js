import React, {PureComponent, Fragment} from 'react';
import Button from '@sd/components/button';
import {stylDefault} from '@src/stylDefault';
import {
  View as AnimatableView,
  Text as AnimatableText,
} from 'react-native-animatable';
import styl from './styl';
import {empty} from '@sd/uteis/StringUteis';
import MinhaEscalaItem from '@screens/disponibilidade/partial/minhaescala';
export default class MinhaEscala extends PureComponent {
  _loadedData = false;
  _submit = () => {
    this.props.navigation.push('disponibilidade');
  };
  render() {
    const {disponibilidade: disponibilidades} = this.props;
    return (
      <Fragment>
        <AnimatableText
          animation="fadeInUp"
          useNativeDriver={true}
          delay={800}
          style={[stylDefault.h1, styl.minhaEscala]}>
          Minha escala para hoje
        </AnimatableText>
        <AnimatableView
          style={styl.warpDisponibilidade}
          animation="flipInX"
          useNativeDriver={true}
          delay={1500}>
          {disponibilidades.map(
            ({icone, cor, data, ativo, disponibilidade, horario}, index) => {
              const props = {
                index,
                icone,
                ativo,
                cor,
                disponibilidade,
                horario,
                delay: 100 * index,
                hasDelay: false, // activedDelay,
                actived: !empty(data),
              };
              return <MinhaEscalaItem {...props} />;
            },
          )}
        </AnimatableView>
        <AnimatableView animation="flipInX" useNativeDriver={true} delay={1800}>
          <Button
            style={styl.btnDisponibilizar}
            text={{
              value: 'Disponibilidade',
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
