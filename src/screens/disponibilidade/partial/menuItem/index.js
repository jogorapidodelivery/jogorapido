import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import { cor, size } from "@root/app.json";
import { empty } from "@sd/uteis/StringUteis";
import { toogleTabDisponibilidade } from "@actions/disponibilidade";
export default class MenuItem extends PureComponent {
    render() {
        const { sigla, data, selected, index} = this.props;
        const fontWeight = selected ? "bold" : "normal";
        const backgroundColor = selected ? cor["08"] : cor["06"];
        const color = selected ? cor["07"] : cor["08"];
        const fontSize = selected ? size["04"] : size["03"];
        return <View style={styl.container}>
            <TouchableOpacity style={[styl.warp, { backgroundColor }]} onPress={() => toogleTabDisponibilidade({ index })}>
                <Text style={[stylDefault.h1, styl.sigla, { fontWeight, color, fontSize}]}>{sigla}</Text>
                {!selected && <View style={styl.warpMarcacao}>
                    {data.map(({data:d}, key) => <View key={`marcador-key-${key}`} style={[styl.marcacao, { backgroundColor: empty(d) ? cor["07"] : cor["08"]}]} />)}
                </View>}
            </TouchableOpacity>
        </View>
    }
}