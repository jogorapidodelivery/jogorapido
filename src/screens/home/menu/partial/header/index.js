import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import { empty } from "@sd/uteis/StringUteis";
const _asa = require("@images/asa.png")
export default class Header extends PureComponent {
    render() {
        // https://gist.github.com/cmcewen/b1ea2464aa88ae32be17
        // https://dev.to/joypalumbo/uploading-images-to-cloudinary-in-react-native-using-cloudinary-s-api-37mo
        // https://tarcode.github.io/blog/react-native-image-uploading/
        const { email, telefone, foto, nome } = this.props.data
        return <View style={styl.container}>
            <View style={styl.warp}>
                <View style={styl.warpAsa}>
                    <View style={styl.bgAsa}>
                        <Image style={styl.iconAsa} resizeMode="contain" source={_asa}/>
                    </View>
                </View>
                <TouchableOpacity style={styl.warpFoto}>
                    {empty(foto) && <Text style={styl.moto}></Text>}
                    {!empty(foto) && <Image resizeMode="cover" style={styl.foto} source={{ uri: foto}}/>}
                </TouchableOpacity>
                <TouchableOpacity style={styl.updateFoto}>
                    <View style={styl.bgAsa}>
                        <Text style={styl.camera}></Text>
                    </View>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styl.btn}>
                <Text style={[stylDefault.p, styl.p]}>{email}</Text>
                <Text style={styl.icon}></Text>
            </TouchableOpacity>
            <Text style={[stylDefault.h1, styl.nome]}>{nome}</Text>
            <TouchableOpacity style={styl.btn}>
                <Text style={[stylDefault.p, styl.p]}>{telefone}</Text>
                <Text style={styl.icon}></Text>
            </TouchableOpacity>
        </View>
    }
}