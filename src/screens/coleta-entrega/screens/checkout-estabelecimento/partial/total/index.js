import React, {memo, Fragment} from 'react';
import {View, Text} from 'react-native';
import Shimmer from 'react-native-shimmer-placeholder';
import styl from './styl';
import {cor} from '@root/app.json';
function FooterTotal({total, frete}) {
  return (
    <Fragment>
      <Shimmer
        colorShimmer={cor['27']}
        style={styl.container}
        autoRun={frete === undefined}
        visible={frete !== undefined}>
        <View style={[styl.container, styl.warp]}>
          <Text style={[styl.titulo, styl.frete]}>
            <Text style={styl.labelTotal}>Frete</Text> R$ {frete}
          </Text>
        </View>
      </Shimmer>
      <View style={styl.warpTotal}>
        <Shimmer
          colorShimmer={cor['27']}
          style={styl.warpTotalLoader}
          autoRun={frete === undefined}
          visible={frete !== undefined}>
          <Text style={[styl.titulo, styl.total]}>
            <Text style={styl.labelTotal}>Total</Text> R$ {total}
          </Text>
        </Shimmer>
      </View>
    </Fragment>
  );
}
export default memo(FooterTotal);
