import React, { memo } from "react"
import { View, Text } from "react-native"
import styl from "./styl";
import Button from "@sd/components/button";
function Header({titulo, goto}) {
    const textAlign = goto === undefined ? "center" : "left";
    return <View style={styl.header}>
        {goto && <Button onPress={goto} leftIcon={{ value: "", color: "07" }} />}
        <Text style={[styl.titulo, {textAlign}]}>{titulo}</Text>
    </View>
}
export default memo(Header);