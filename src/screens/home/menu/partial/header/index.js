import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
export default class Header extends PureComponent {
    render() {
        return <View style={styl.container}>
            <View style={styl.warp}>
                <View style={styl.warpAsa}>
                    <View style={styl.bgAsa}>
                        <Image style={styl.iconAsa} resizeMode="contain" source={require("@images/asa.png")}/>
                    </View>
                </View>
                <TouchableOpacity style={styl.warpFoto}>
                    <Image resizeMode="cover" style={styl.foto} source={{ uri:"https://abrilguiadoestudante.files.wordpress.com/2018/04/redaccca7acc83o-estudante.jpg?quality=100&strip=info&resize=150,100"}}/>
                </TouchableOpacity>
                <TouchableOpacity style={styl.updateFoto}>
                    <View style={styl.bgAsa}>
                        <Text style={styl.camera}></Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styl.btn}>
                <Text style={[stylDefault.p, styl.p]}>joisiney@gmail.com</Text>
                <Text style={styl.icon}></Text>
            </TouchableOpacity>
            <Text style={[stylDefault.h1, styl.nome]}>Joisiney Leandro Silva</Text>
            <TouchableOpacity style={styl.btn}>
                <Text style={[stylDefault.p, styl.p]}>62 9 8157.2461</Text>
                <Text style={styl.icon}></Text>
            </TouchableOpacity>
        </View>
    }
}