import React, { PureComponent } from "react";
import {Text, View} from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
export default class Item extends PureComponent {
    render() {
        return <View style={styl.warp}>
            <Text style={stylDefault.span}>25/09 • 14:00</Text>
            <Text style={stylDefault.span}>Rota finalizada</Text>
            <Text style={[stylDefault.span, styl.preco]}>270,56</Text>
        </View>
    }
}