import React, {} from "react";
import { View, Text, PermissionsAndroid, TouchableOpacity, Image, Platform } from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import { empty } from "@sd/uteis/StringUteis";
const _asa = require("@images/asa.png")
import * as Sentry from '@sentry/react-native';

const requestExternalStoreageRead = async () => {
    if(Platform.OS === "ios") return true;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
                'title': 'JogoRápido Avatar',
                'message': 'O APP precisa acessar o armazenamento externo'
            }
        );

        return granted == PermissionsAndroid.RESULTS.GRANTED
    }
    catch (_err) {
        Sentry.captureException(_err);
        return false;
    }
}
export default function Header({ navigation, data: { email, telefone, foto, nome }}) {
    // https://gist.github.com/cmcewen/b1ea2464aa88ae32be17
    // https://dev.to/joypalumbo/uploading-images-to-cloudinary-in-react-native-using-cloudinary-s-api-37mo
    // https://tarcode.github.io/blog/react-native-image-uploading/
    const upDateFotos = async () => {
        if (await requestExternalStoreageRead()){
            navigation.push("camera");
        } else {
            navigation.push("alerta", {
                params: {
                    titulo: "JogoRápido",
                    mensagem: "Sem permissão para acessar sua galeria de fotos ou câmera"
                }
            })
        }
    }
    return <View style={styl.container}>
        <View style={styl.warp}>
            <View style={styl.warpAsa}>
                <View style={styl.bgAsa}>
                    <Image style={styl.iconAsa} resizeMode="contain" source={_asa}/>
                </View>
            </View>
            <TouchableOpacity style={styl.warpFoto} onPress={upDateFotos}>
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