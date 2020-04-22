import React, { PureComponent } from "react";
import { View, Text } from "react-native";
import { Text as AnimatableText } from "react-native-animatable";// View as AnimatableView, 
import styl from "./styl";
import Button from "@sd/components/button";
export const bounceInUp = {
    0: {
        opacity: 0,
        translateY: -10,
    },
    0.6: {
        opacity: 1,
        translateY: -7,
    },
    0.75: {
        translateY: 3,
    },
    0.9: {
        translateY: 0,
    },
    1: {
        translateY: 0,
        opacity:0
    },
};
export default class BaseModal extends PureComponent {
    // useNativeDriver={true} delay={800} animation="shake"
    render() {
        const { children, title, closeAction, navigation: { goBack}} = this.props
        return <View
            style={styl.container}
        >
            <AnimatableText useNativeDriver={true} style={styl.setaClose} delay={800} animation={bounceInUp} iterationCount="infinite"></AnimatableText>
            <View style={styl.group}>
                <View style={styl.warp}>
                    <View style={styl.header}>
                        <Text style={styl.title}>{title || "Alerta"}</Text>
                        <Button
                            rightIcon={{
                                value: "",
                                color: "08"
                            }}
                            onPress={closeAction || goBack}
                            style={styl.btnClose}
                        />
                    </View>
                    <View style={styl.warpConteudo}>
                        {children}
                    </View>
                </View>
            </View>
        </View>
    }
}