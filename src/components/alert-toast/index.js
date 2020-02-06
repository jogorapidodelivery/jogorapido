import React, { PureComponent } from "react";
import { View, Text} from "react-native";
import styl from "./styl"
import { stylDefault } from "@src/stylDefault";
export default class AlertTipoToast extends PureComponent {
    render() {
        const { titulo } = this.props;
        return <View style={styl.container}>
            <Text style={[stylDefault.span, styl.mensagem]}>{titulo}</Text>
        </View>
    }
}