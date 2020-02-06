import React, { PureComponent } from "react";
import { View, Text, Platform } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import Button from "@sd/components/button";
import { Image as AnimatableImage, Text as AnimatableText } from "react-native-animatable";
export default class HeaderLogo extends PureComponent {
    static heightContainer = normalize(Platform.OS === "ios" ? 200 : 170)
    render() {
        const { navigation} = this.props
        return <View style={[styl.header, { height:HeaderLogo.heightContainer}]}>
            {navigation && <Button
                onPress={navigation.openDrawer}
            style={styl.posDrawer}
                leftIcon={{
                    value: "",
                    color: "07"
                }}
            />}
            <AnimatableImage useNativeDriver={true} animation="fadeInDown" style={styl.logo} source={require("@images/logo.png")}/>
            <AnimatableText useNativeDriver={true} delay={100} animation="fadeInUp" style={styl.slogan}>
                <Text>Delivery</Text>
                <Text style={[stylDefault.bold, styl.slogan]}> para todos</Text>
            </AnimatableText>
        </View>
    }
}