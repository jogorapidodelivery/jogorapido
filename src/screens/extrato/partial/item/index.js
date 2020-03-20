import React, { PureComponent } from "react";
import {Text, View} from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import Shimmer from "react-native-shimmer-placeholder";
import { cor } from "@root/app.json";
export default class Item extends PureComponent {
    render() {
        const { valor_frete, data_hora, coleta_id} = this.props
        const actived = coleta_id !== undefined
        return <View style={styl.warp}>
            <Shimmer colorShimmer={cor["27"]} style={[styl.loader, {width:"35%"}]} autoRun={true} visible={actived}>
                <Text style={stylDefault.span}>{data_hora}</Text>
            </Shimmer>
            <Shimmer colorShimmer={cor["27"]} style={[styl.loader, { width: "25%" }]} autoRun={true} visible={actived}>
                <Text style={stylDefault.span}>#{coleta_id}</Text>
            </Shimmer>
            <Shimmer colorShimmer={cor["27"]} style={[styl.loader, { width: "20%" }]} autoRun={true} visible={actived}>
                <Text style={[stylDefault.span, styl.preco]}>{valor_frete}</Text>
            </Shimmer>
        </View>
    }
}