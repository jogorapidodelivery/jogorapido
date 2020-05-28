import React, {memo} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import NativeLinearGradient from 'react-native-linear-gradient';
import Shimmer from 'react-native-shimmer-placeholder';
import {cor} from '@root/app.json';
import styl from './styl';
function ItemPinpad({address, name, onPress, index}) {
  function handlerPress() {
    if (onPress !== null && address !== undefined) {
      onPress(index);
    }
  }
  return (
    <TouchableOpacity onPress={handlerPress} style={styl.container}>
      <View style={styl.warpText}>
        <Shimmer
          colorShimmer={cor['27']}
          style={styl.loadAddress}
          autoRun={address === undefined}
          visible={address !== undefined}>
          <Text style={styl.txtAddress}>{address}</Text>
        </Shimmer>
        <Shimmer
          colorShimmer={cor['27']}
          style={styl.loadName}
          autoRun={address === undefined}
          visible={address !== undefined}>
          <Text style={styl.txtAddress}>{name}</Text>
        </Shimmer>
      </View>
      <Shimmer
        colorShimmer={cor['27']}
        style={styl.warpGradient}
        autoRun={address === undefined}
        visible={address !== undefined}>
        <NativeLinearGradient
          style={styl.warpGradient}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={cor['14']}>
          <Text style={styl.txtParear}>Parear</Text>
          <Text style={styl.txtIcone}></Text>
        </NativeLinearGradient>
      </Shimmer>
    </TouchableOpacity>
  );
}
export default memo(ItemPinpad);
