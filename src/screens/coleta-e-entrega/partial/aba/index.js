import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import styl from "./styl";
import { TouchableOpacity } from "react-native-gesture-handler";
import { cor } from "@root/app.json";
import { View as AnimatableView } from "react-native-animatable";
export default class Aba extends PureComponent {
    _click = ({index}) => {
        const { onPress} = this.props
        if (onPress) onPress(index)
    }
    render() {
        const { abas, abaSelecionada} = this.props
        const direction = abaSelecionada === 0 ? "left" : "right";
        return <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={100} style={styl.container}>
            <View style={[styl.bg, {[direction]: 0}]}></View>
            {abas.map((value, key) => <View key={`btn-tab-${key}`} style={styl.warpBtn}>
                <TouchableOpacity style={styl.btn} onPress={this._click.bind(this, { index: key })}>
                    <Text style={[styl.textBtn, { color: abaSelecionada === key ? cor["07"] : cor["08"] }]}>{value}</Text>
                </TouchableOpacity>
            </View>)}
        </AnimatableView>
    }
}