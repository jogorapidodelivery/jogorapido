import React, { PureComponent } from "react";
import { View, Text, LayoutAnimation } from "react-native";
import styl from "./styl"
import { stylDefault } from "@src/stylDefault";
import { cor } from "@root/app.json";
export default class ColetaPendenteProgressHeader extends PureComponent {
    render() {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        const { tempoRestante } = this.props;
        return <View style={[styl.container, { backgroundColor: tempoRestante ? cor["09"] : "transparent" }]}>
            {tempoRestante > 0 && <Text style={[stylDefault.span, styl.mensagem]}>Você tem {tempoRestante} segundo{tempoRestante > 1 ? "s" : ""} para aceitar a corrida.</Text>}
        </View>

    }
}