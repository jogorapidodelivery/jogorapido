import React, {memo} from 'react';
import {View, Text} from 'react-native';
import styl from './styl';
import Shimmer from 'react-native-shimmer-placeholder';
import {cor} from '@root/app.json';
function HeaderUnidade({titulo}) {
  return (
    <Shimmer
      colorShimmer={cor['27']}
      style={styl.loader}
      autoRun={titulo === undefined}
      visible={titulo !== undefined}>
      <View style={styl.container}>
        <Text style={styl.titulo}>
          Coleta <Text style={styl.qtd}>{titulo}</Text>
        </Text>
      </View>
    </Shimmer>
  );
}
export default memo(HeaderUnidade);
