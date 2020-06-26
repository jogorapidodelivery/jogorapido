import React, {PureComponent} from 'react';
import {Text, View} from 'react-native';
import styl from './styl';
import {stylDefault} from '@src/stylDefault';
export default class Footer extends PureComponent {
  render() {
    const {totalPeriodo} = this.props;
    return (
      <View style={styl.warpText}>
        <Text style={styl.text}>
          Total <Text style={stylDefault.bold}>{totalPeriodo}</Text>
        </Text>
      </View>
    );
  }
}
