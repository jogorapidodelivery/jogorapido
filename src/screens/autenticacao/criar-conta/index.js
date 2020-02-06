import React, { PureComponent, Fragment } from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity } from "react-native";
import HeaderLogo from "@screens/partial/header-logo";
import { SharedElement } from "react-navigation-shared-element";
import styl from "./styl";
export default class CriarConta extends PureComponent {
    render() {
        return <View style={styl.container}>
            <SharedElement id="HeaderLogo" animation="move">
                <Text>HOME</Text>
            </SharedElement>
            <View style={styl.conteudo}>
                <Text>CriarConta</Text>
                <TouchableOpacity style={{padding:25, backgroundColor:"gray", margin:1}} onPress={()=>this.props.navigation.navigate("home")}>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:25, backgroundColor:"gray", margin:1}} onPress={()=>this.props.navigation.navigate("criarConta")}>
                    <Text>CRIAR CONTA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:25, backgroundColor:"gray", margin:1}} onPress={()=>this.props.navigation.navigate("recuperarSenha")}>
                    <Text>RECUPERAR SENHA</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:25, backgroundColor:"gray", margin:1}} onPress={()=>this.props.navigation.navigate("conectar")}>
                    <Text>CONECTAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    }
}