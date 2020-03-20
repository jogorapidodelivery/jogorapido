import React, { PureComponent } from "react";
import Shimmer from "react-native-shimmer-placeholder";
import { View, Text, TouchableOpacity } from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import { cor } from "@root/app.json";
import { empty } from "@sd/uteis/StringUteis";
export default class MenuItem extends PureComponent {
    onPress = () => {
        const { index, onPress} = this.props;
        if (onPress) onPress({index});
    }
    render() {
        const { sigla, data, selected } = this.props;
        if (sigla === "") {
            return <View style={styl.container}>
                <Shimmer colorShimmer={cor["27"]} style={styl.warp} autoRun={true} visible={false}></Shimmer>
            </View>
        }
        const fontWeight = selected ? "bold" : "normal";
        const backgroundColor = selected ? cor["08"] : cor["06"];
        const color = selected ? cor["07"] : cor["08"];
        return <View style={styl.container}>
            <TouchableOpacity style={[styl.warp, { backgroundColor }]} onPress={this.onPress}>
                <Text style={[stylDefault.h1, styl.sigla, { fontWeight, color }]}>{sigla}</Text>
                <View style={styl.warpMarcacao}>
                    {data.map(({ data: d }, key) => {
                        let backgroundColor = cor["07"];
                        const emptyD = empty(d)
                        if(selected) {
                            backgroundColor = emptyD ? cor["02"] : cor["07"]
                        } else {
                            backgroundColor = emptyD ? cor["07"] : cor["08"]
                        }
                        return <View key={`marcador-key-${key}`} style={[styl.marcacao, { backgroundColor }]} />
                    })}
                </View>
            </TouchableOpacity>
        </View>
    }
}