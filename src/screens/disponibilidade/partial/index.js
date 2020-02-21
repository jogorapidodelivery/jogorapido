import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { stylDefault } from "@src/stylDefault";
import { View as AnimatableView } from "react-native-animatable";
import styl from "./styl";
import { cor as corApp } from "@root/app.json";
export default class MinhaEscalaItem extends PureComponent {
    render() {
        let { delay, icone, cor, disponibilidade, horario, actived} = this.props
        cor = actived ? cor : corApp["05"];
        const corTitulo = actived ? corApp["08"] : corApp["05"];
        const corHorario = actived ? corApp["20"] : corApp["05"];
        const backgroundColor = actived ? corApp["06"] : corApp["26"];
        // console.log(delay)
        return <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={delay} style={styl.containerItem}>
            <TouchableOpacity style={[styl.containerItemWarp, { backgroundColor}]} activeOpacity={actived ? .2 : 1}>
                <Text style={[stylDefault.icon, { color: cor }]}>{icone}</Text>
                <View>
                    <Text style={[stylDefault.span, styl.titulo, { color: corTitulo}]}>{disponibilidade}</Text>
                    <Text style={[stylDefault.span, { color: corHorario}]}>{horario}</Text>
                </View>
                {actived && <View style={styl.warpActived}>
                    <Text style={styl.actived}></Text>
                </View>}
            </TouchableOpacity>
        </AnimatableView>
    }
}