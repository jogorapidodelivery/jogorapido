import React, { PureComponent, Fragment } from "react";
import { Text, View} from "react-native";
// import Button from "@sd/components/button";
// import { View as AnimatableView } from "react-native-animatable";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
export default class Footer extends PureComponent {
    render() {
        const { totalPeriodo} = this.props;
        if (totalPeriodo === "0.00") return null;
        return <View style={styl.warpText}>
            <Text style={styl.text}>Total <Text style={stylDefault.bold}>{totalPeriodo}</Text></Text>
        </View>
        // return <AnimatableView animation="flipInX" useNativeDriver={true} delay={250} >
            
        //     <Button
        //         style={styl.btn}
        //         text={{
        //             value: "Extrato detalhado",
        //             color: "07"
        //         }}
        //         rightIcon={{
        //             value: "",
        //             color: "07"
        //         }}
        //         bg="14"
        //     />
        // </AnimatableView>
    }
}