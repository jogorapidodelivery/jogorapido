import React, { PureComponent } from "react";
import {Text, View} from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
export default class Item extends PureComponent {
    render() {
        const { valor_frete, data_hora, coleta_id} = this.props
        return <View style={styl.warp}>
            <Text style={stylDefault.span}>{data_hora}</Text>
            <Text style={stylDefault.span}>#{coleta_id}</Text>
            <Text style={[stylDefault.span, styl.preco]}>{valor_frete}</Text>
        </View>
    }
}