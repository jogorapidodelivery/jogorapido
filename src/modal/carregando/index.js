import React, { PureComponent } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import styl from "./styl";
import { cor } from "@root/app.json"
export default class Carregando extends PureComponent {
    static navigationOptions = {
        gestureEnabled:false
    }
    render() {
        return <View style={styl.container}>
            <View style={styl.warp}>
                <ActivityIndicator size="large" color={cor["07"]} />
                <Text style={styl.text}>carregando...</Text>
            </View>
        </View>
    }
}