import React from "react";
import { View, Text } from "react-native";
import styl from "./styl";
import { cor } from "@root/app.json";
import Botoes from "./partial/botoes";
import Horarios from "./partial/horarios";

export default function ItemColeta({titulo:{bold, normal}, distancia, nome, endereco, horarios, buttons}){
    return <View style={styl.item}>
    <Text style={[styl.titulo, styl.coleta, styl.tituloSpace]}>{bold} <Text style={styl.regular}>{normal}</Text></Text>
    <View style={styl.border}>
        <Text style={styl.titulo}>{nome} {distancia && <Text style={styl.distancia}>{distancia}m</Text>}</Text>
        <Text style={[styl.titulo, styl.regular]}>{endereco}</Text>
        <Horarios data={horarios}/>
    </View>
    <Botoes data={buttons}/>
  </View>
}