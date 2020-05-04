import React, { memo } from "react";
import { View, Text } from "react-native";
import styl from './styl';
const labelHorarios = ["Horário de chegada", "Horário de saída"];
function renderHorarios(value, key) {
    return <View key={`${value}-${key}`}>
        <Text style={styl.p}>{labelHorarios[key]}</Text>
        <Text style={[styl.p, styl.hora]}>{value}</Text>
    </View>
}
function Horarios({data}) {
    if(data.length === 0) return null;
    return <View style={styl.warp}>
        {data.map(renderHorarios)}
    </View>
}
export default memo(Horarios);