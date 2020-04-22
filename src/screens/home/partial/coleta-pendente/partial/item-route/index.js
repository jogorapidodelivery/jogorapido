import React, { Fragment} from 'react';
import OpenMap from "react-native-open-map";
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { radius, cor, hButton, spaces, size } from "@root/app.json";
import { stylDefault } from "@src/stylDefault";
import { normalize } from "@sd/uteis/NumberUteis";

export default ({titulo, mapa, index, total}) => {
    const color = cor[index === 0 ? "08" : "10"];
    const icone = index === 0 ? "" : "";
    const openMaps = () => {
        OpenMap.show(mapa);
    }
    return <Fragment>
        <TouchableOpacity onPress={openMaps} style={[styl.containerInputFake]}>
            <Text style={[stylDefault.icon, styl.icon, {color }]}>{icone}</Text>
            <View style={styl.warpInputFake}>
                <Text style={stylDefault.p}>{titulo}</Text>
            </View>
            {total !== index && <Text style={[stylDefault.icon, styl.iconAte]}></Text>}
        </TouchableOpacity>
    </Fragment>
}
const styl = StyleSheet.create({
    icon:{
        textAlignVertical:"center",
        height:normalize(size["08"])
    },
    containerInputFake: {
        marginLeft: -normalize(spaces["01"]),
        flexDirection: "row",
        alignItems:"center",
        height: normalize(hButton["02"]),
    },
    warpInputFake: {
        height: normalize(size["08"]),
        flex:1,
        paddingLeft: normalize(spaces["02"]),
        justifyContent: "center",
        borderRadius: normalize(radius["01"]),
        borderColor: cor["06"],
        borderWidth: 1
    },
    iconAte: {
        color: cor["05"],
        position:"absolute",
        left: normalize(0),
        top: normalize(37)
    }
})