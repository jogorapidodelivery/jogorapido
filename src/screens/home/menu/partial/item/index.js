import React, {PureComponent} from 'react';
import {TouchableOpacity, Text, Switch} from 'react-native';
import styl from './styl';
import {normalize} from '@sd/uteis/NumberUteis';
import {stylDefault} from '@src/stylDefault';
import {spaces, radius} from '@root/app.json';
import {empty} from '@sd/uteis/StringUteis';
import * as commands from './commands';
import {cor} from '@root/app.json';
export default class Item extends PureComponent {
  onPress = () => {
    const {commandAction, navigation, checkbox} = this.props;
    if (!empty(commandAction)) {
      if (checkbox === undefined) {
        navigation.closeDrawer();
      }
      if (commands[commandAction] !== undefined) {
        commands[commandAction](navigation);
      }
    }
  };
  render() {
    const {titulo, checkbox, icone, space, index, commandAction} = this.props;
    const paddingLeft = normalize((space ? spaces['03'] : 0) + spaces['02']);
    const borderTopEndRadius = index === 0 ? normalize(radius['02']) : 0;
    const paddingTop = index === 0 ? normalize(spaces['02']) : 0;
    const opacity = empty(commandAction) ? 0.3 : 1;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        activeOpacity={1}
        style={[styl.item, {paddingTop, paddingLeft, borderTopEndRadius}]}>
        <Text style={[stylDefault.icon, styl.icon, {opacity}]}>{icone}</Text>
        <Text style={[styl.p, {opacity}]}>{titulo}</Text>
        {checkbox !== undefined && (
          <Switch
            trackColor={{false: cor['06'], true: cor['06']}}
            thumbColor={checkbox ? cor['08'] : cor['10']}
            ios_backgroundColor="#3e3e3e"
            value={checkbox}
            style={styl.checkbox}
            disabled={true}
          />
        )}
      </TouchableOpacity>
    );
  }
}
