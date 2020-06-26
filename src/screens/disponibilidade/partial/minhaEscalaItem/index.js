import React, {memo} from 'react';
import {cor as corApp} from '@root/app.json';
import MinhaEscalaItem from '@screens/disponibilidade/partial/minhaescala';
import Shimmer from 'react-native-shimmer-placeholder';
import {empty} from '@sd/uteis/StringUteis';
import styl from '../../styl';
import {toogleSelectDisponibilidade} from '@actions/disponibilidade';
const MinhaEscalaItemProps = ({push, item, index}) => {
  const handleToogleHorario = async data => {
    try {
      await toogleSelectDisponibilidade(data);
    } catch ({message}) {
      push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem: message,
        },
      });
    }
  };
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
  const {icone, cor, data, disponibilidade, horario, ativo} = item;
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
  return <MinhaEscalaItem onPress={handleToogleHorario} {...props} />;
};
export default memo(MinhaEscalaItemProps);
