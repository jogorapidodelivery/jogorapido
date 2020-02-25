import React, { PureComponent, Fragment } from "react";
import Button from "@sd/components/button";
import { View as AnimatableView } from "react-native-animatable";
import styl from "./styl";
export default class Footer extends PureComponent {
    render() {
        return <AnimatableView animation="flipInX" useNativeDriver={true} delay={250} >
            <Button
                style={styl.btn}
                text={{
                    value: "Extrato detalhado",
                    color: "07"
                }}
                rightIcon={{
                    value: "",
                    color: "07"
                }}
                bg="14"
            />
        </AnimatableView>
    }
}