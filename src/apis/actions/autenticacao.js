import firebase from "react-native-firebase";
import { Platform, Linking, Alert} from "react-native";
import { ONLINE, AUTENTICAR, CONECTAR, RECUPERAR_SENHA, CHECAR_SIMBOLO_EMAIL, ALTERAR_SENHA, VALIDAR_EMAIL } from "@constants/";
import { actionFetchItem} from "@sd/uteis/CreateActions";
import AsyncStorage from '@react-native-community/async-storage';
import {decodeCipherCaesar} from "@sd/uteis/CipherCaesar";
import { version } from "@root/package.json";
const { applestoryid, googleplayid } = require("@root/app.json")
import pad from "pad";
import { empty } from "@sd/uteis/StringUteis";
const checarSeAppEstaAtualizado = versao_app => {
    if (!empty(versao_app)) {
        const v = `${version}`.replace(/\s/gi, "").split(".")
        const currentVersion = Number(`${v[0]}${pad(3, v[1], "0")}${pad(4, v[2], "0")}`)
        if (currentVersion < versao_app) {
            Alert.alert("ATUALIZAÇÃO DISPONÍVEL", "Nova vesão do Jogo Rápido disponível. Manter seu aplicativo atualizado garante uma boa experiência de navegação. Deseja atualizar?", [
                { text: "Agora não", style: "cancel" },
                { text: "Atualizar", onPress: () => {
                    if (Platform.OS === "ios") {
                        Linking.openURL(`https://itunes.apple.com/us/app/${applestoryid}`)
                    } else {
                        Linking.openURL(`https://play.google.com/store/apps/details?id=${googleplayid}`)
                    }
                } }
            ], { cancelable: true })
        }
    }
}
export const actionAutenticar = () => {
    return new Promise((_resolve, _reject) => {
        try{
            firebase.notifications().removeAllDeliveredNotifications();
        } catch(e) {
            console.log("falha ao remover as notificações", e)
        }
        AsyncStorage.getItem(AUTENTICAR).then(value => {
            if(value != null) {
                const body_rsa = decodeCipherCaesar(value);
                const _action = actionFetchItem(AUTENTICAR, "usuario/login", false);
                _action({ body_rsa }).then((_response) => {
                    const { response: { versao_app } } = _response;
                    checarSeAppEstaAtualizado(versao_app)
                    _resolve(_response)
                }).catch((_err) => {
                    console.log("auto-login-catch")
                    console.log(_err)
                    _reject(_err)
                });
            } else {
                _reject();
            }
        }).catch(_err => {
            console.log("auto-login-async-storage-failed:", _err);
            _reject()
        });
    })
};
// COLETA_NOVA
export const actionLogin = actionFetchItem(CONECTAR, "usuario/login");
export const actionRecuperarSenha = actionFetchItem(RECUPERAR_SENHA, "usuario/recuperar-senha");
export const actionChecarTokenEmail = actionFetchItem(CHECAR_SIMBOLO_EMAIL, "usuario/checar-token-email");
export const actionAlterarSenha = actionFetchItem(ALTERAR_SENHA, "usuario/alterar-senha");
export const actionValidarEmail = actionFetchItem(VALIDAR_EMAIL, "usuario/validar-email");
export const actionOnline = actionFetchItem(ONLINE, "usuario/online", false, false);