import React, {memo} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import styl from './styl';
const icDeactive = '';
const icActive = ''; // cor["08"] : cor["05"]
import Shimmer from 'react-native-shimmer-placeholder';
import {cor} from '@root/app.json';
function ItemCheckoutUnidade({
  checkbox,
  titulo,
  valor,
  qtd,
  actived,
  index,
  sectionIndex,
  onChange,
}) {
  const radios = index === 0 ? styl.radius : {};
  const onPress = () => {
    onChange({sectionIndex, index});
  };
  return (
    <View style={[styl.container, radios]}>
      <TouchableOpacity
        style={styl.btn}
        onPress={actived !== -1 && checkbox ? onPress : null}>
        {checkbox && (
          <Shimmer
            colorShimmer={cor['27']}
            style={styl.checkIconLoading}
            autoRun={actived === -1}
            visible={actived !== -1}>
            <Text style={styl.icon}>{actived ? icActive : icDeactive}</Text>
          </Shimmer>
        )}
        <View style={styl.warp}>
          <Shimmer
            colorShimmer={cor['27']}
            style={styl.tituloLoading}
            autoRun={actived === -1}
            visible={actived !== -1}>
            <Text style={[styl.titulo, styl.produto]}>{titulo}</Text>
          </Shimmer>
          <Shimmer
            colorShimmer={cor['27']}
            style={styl.precoLoading}
            autoRun={actived === -1}
            visible={actived !== -1}>
            <View style={styl.col}>
              <Text style={styl.titulo}>
                {qtd} unidade{qtd > 1 ? 's' : ''}
              </Text>
              <Text style={[styl.titulo, styl.total]}>{valor}</Text>
            </View>
          </Shimmer>
        </View>
      </TouchableOpacity>
    </View>
  );
}
export default memo(ItemCheckoutUnidade);
