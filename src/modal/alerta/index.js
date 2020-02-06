import React, { PureComponent } from "react";
import Base from "../base";
import styl from "./styl";
import HTML from "react-native-render-html";
/*
this.props.navigation.push("alerta", {params:{
    titulo:"Jogo Rápido",
    mensagem: "Os seguintes campos não foram preenchidos corretamente:"
}}) */
export default class Alerta extends PureComponent {
    render() {
        const {navigation:{state:{params:{params:{titulo, mensagem}}}}} = this.props;
        return <Base navigation={this.props.navigation} title={titulo}>
            <HTML html={mensagem} tagsStyles={styl} baseFontStyle={styl.text}/>
        </Base>
    }
}