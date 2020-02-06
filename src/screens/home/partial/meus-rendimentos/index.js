import React, { PureComponent, Fragment } from "react";
import { View, Text } from "react-native";
import Button from "@sd/components/button";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
export default class MeusRendimentos extends PureComponent {
    render() {
        const { corridas_semana, total_frete_semana} = this.props
        console.log({ corridas_semana})
        return <Fragment>
            <Text style={[stylDefault.h1, styl.meusRendimentos]}>Nesta semana</Text>
            <View style={styl.container}>
                <View style={[styl.warpItem, {flex:1}]}>
                    <Text style={[stylDefault.h1, styl.h1]}>{corridas_semana || 0}</Text>
                    <Text style={[stylDefault.span, styl.span]}>viagens</Text>
                </View>
                <View style={[styl.warpItem, {flex:2}]}>
                    <Text style={[stylDefault.h1, styl.h1]}><Text style={[stylDefault.span, styl.preco]}>R$</Text>{total_frete_semana}</Text>
                    <Text style={[stylDefault.span, styl.span]}>saldo atual</Text>
                </View>
            </View>
            <Button
                style={styl.btnRendimentos}
                text={{
                    value: "Meus rendimentos",
                    color: "07"
                }}
                rightIcon={{
                    value: "",
                    color: "07"
                }}
                onPress={this._submit}
                bg="14"
            />
        </Fragment>
    }
}