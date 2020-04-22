import React, { } from "react";
import { View, Linking } from "react-native";
import Button from "@sd/components/button";
import styl from "./styl";
import { _addressOpenMapsDefaultProps } from "@screens/coleta-e-entrega/partial/rota/index";
import OpenMap from "react-native-open-map";
import { empty } from "@sd/uteis/StringUteis";
export default function GroupButton({telefone, latitude, longitude}){
    const _openMaps = () => {
        const _data = {
            latitude, longitude,
            ..._addressOpenMapsDefaultProps
        }
        OpenMap.show(_data);
    }
    const _ligarCliente = () => {
        Linking.openURL(`tel:${telefone.replace(/^[0-9]/gi, "")}`)
    }
    return <View style={styl.btnRota}>
        {/* <Button
            onPress={_openMaps}
            leftIcon={{
                value: "",
                color: "07"
            }}
            styleName="pequeno"
            bg="17"
        /> */}
        {!empty(telefone) && <Button
            style={styl.spacer}
            onPress={_ligarCliente}
            leftIcon={{
                value: "",
                color: "07"
            }}
            styleName="pequeno"
            bg="24"
        />}
        <Button
            onPress={_openMaps}
            text={{
                value: "Rota",
                color: "07"
            }}
            leftIcon={{
                value: "",
                color: "07"
            }}
            styleName="pequeno"
            bg="16"
        />
    </View>
}