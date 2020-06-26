import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {stylDefault} from '@src/stylDefault';
import {View as AnimatableView} from 'react-native-animatable';
import styl from './styl';
import {cor as corApp} from '@root/app.json';
const _aprovado = {
  ic: '',
  icColor: corApp['10'],
};
const _descanso = {
  ic: '',
  icColor: corApp['04'],
};
const _pendente = {
  ic: '',
  icColor: corApp['12'],
};
const getColor = (data, ativo, actived, index) => {
  if (ativo) {
    return _aprovado;
  }
  if (actived) {
    return _pendente;
  }
  return _descanso;
};
export default class MinhaEscalaItem extends PureComponent {
  _press = () => {
    const {onPress, index} = this.props;
    if (onPress) {
      onPress({index});
    }
  };
  render() {
    let {
      data,
      delay,
      hasDelay,
      icone,
      cor,
      disponibilidade,
      horario,
      actived,
      ativo,
      index,
    } = this.props;
    cor = actived ? cor : corApp['05'];
    const corTitulo = actived ? corApp['08'] : corApp['05'];
    const corHorario = actived ? corApp['20'] : corApp['05'];
    const backgroundColor = actived ? corApp['06'] : corApp['26'];
    let {ic, icColor} = getColor(data, ativo, actived, index);
    return (
      <AnimatableView
        animation={hasDelay ? 'fadeInUp' : ''}
        useNativeDriver={true}
        delay={hasDelay ? delay : 0}
        style={styl.containerItem}>
        <TouchableOpacity
          style={[styl.containerItemWarp, {backgroundColor}]}
          activeOpacity={actived ? 0.2 : 1}
          onPress={this._press}>
          <Text style={[stylDefault.icon, {color: cor}]}>{icone}</Text>
          <View>
            <Text style={[stylDefault.span, styl.titulo, {color: corTitulo}]}>
              {disponibilidade}
            </Text>
            <Text style={[stylDefault.span, {color: corHorario}]}>
              {horario}
            </Text>
          </View>
          {ativo !== undefined && (
            <Text style={[styl.actived, {color: icColor}]}>{ic}</Text>
          )}
        </TouchableOpacity>
      </AnimatableView>
    );
  }
}
