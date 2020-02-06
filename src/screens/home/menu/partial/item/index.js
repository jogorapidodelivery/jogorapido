import React, { PureComponent } from "react";
import { TouchableOpacity, Text, Linking } from "react-native";
import styl from "./styl";
import { normalize } from "@sd/uteis/NumberUteis";
import { stylDefault } from "@src/stylDefault";
import { spaces, radius } from "@root/app.json";
import { empty } from "@sd/uteis/StringUteis";
import * as commands from "./commands"
export default class Item extends PureComponent {
    onPress = () => {
        const { commandAction, navigation } = this.props;
        if (!empty(commandAction)) {
            navigation.closeDrawer();
            if (commands[commandAction] !== undefined) {
                commands[commandAction](navigation);
            }
        }
    }
    render() {
        const { titulo, icone, space, index, commandAction} = this.props;
        const paddingLeft = normalize((space ? spaces["03"] : 0) + spaces["02"]);
        const borderTopEndRadius = index === 0 ? normalize(radius["02"]) : 0;
        const paddingTop = index === 0 ? normalize(spaces["02"]) : 0;
        const opacity = empty(commandAction) ? .3 : 1;
        return <TouchableOpacity onPress={this.onPress} activeOpacity={1} style={[styl.item, { paddingTop, paddingLeft, borderTopEndRadius }]}>
            <Text style={[stylDefault.icon, styl.icon, { opacity}]}>{icone}</Text>
            <Text style={[stylDefault.p, { opacity}]}>{titulo}</Text>
        </TouchableOpacity>
    }
}