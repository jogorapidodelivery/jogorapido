import firebase from "react-native-firebase";
import { Platform, Linking, Alert} from "react-native";

import { AUTENTICAR, CONECTAR, RECUPERAR_SENHA, CHECAR_SIMBOLO_EMAIL, ALTERAR_SENHA, VALIDAR_EMAIL } from "@constants/";
import { actionFetchItem} from "@sd/uteis/CreateActions";
import AsyncStorage from '@react-native-community/async-storage';
import {decodeCipherCaesar} from "@sd/uteis/CipherCaesar";
import { version } from "@root/package.json";
import { LoginManager, AccessToken } from "react-native-fbsdk"
import * as Sentry from '@sentry/react-native';
const { applestoryid, googleplayid } = require("@root/app.json")
import pad from "pad";
import { empty } from "@sd/uteis/StringUteis";
const checarSeAppEstaAtualizado = versao_app => {
    if (!empty(versao_app)) {
        const v = `${version}`.replace(/\s/gi, "").split(".")
        const currentVersion = Number(`${v[0]}${pad(3, v[1], "0")}${pad(4, v[2], "0")}`)
        if (currentVersion < versao_app) {
            Alert.alert("ATUALIZAÇÃO DISPONÍVEL", "Nova vesão do JogoRápido disponível. Manter seu aplicativo atualizado garante uma boa experiência de navegação. Deseja atualizar?", [
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
// ?
export const actionAutenticar = (hasDispatchRedux = true) => {
    return new Promise((_resolve, _reject) => {
        try{
            firebase.notifications().removeAllDeliveredNotifications();
        } catch(e) {
            console.warn("falha ao remover as notificações", e)
        }
        AsyncStorage.getItem(AUTENTICAR).then(value => {
            if(value != null) {
                const body_rsa = decodeCipherCaesar(value);
                const { usuario: email } = body_rsa
                Sentry.setUser({ email });
                const _action = actionFetchItem(AUTENTICAR, "usuario/login", false, hasDispatchRedux);
                _action({ body_rsa }).then((_response) => {
                    const { response: { versao_app } } = _response;
                    checarSeAppEstaAtualizado(versao_app)
                    _resolve(_response)
                }).catch((_err) => {
                    _reject(_err)
                });
            } else {
                _reject();
            }
        }).catch(_err => {
            _reject()
        });
    })
};
export const actionAutenticarFacebook = () => {
    return new Promise((_resolve, _reject) => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
            _r => {
                if (_r.isCancelled) {
                    _reject({ mensagem: "Login facebook cancelado" })
                } else {
                    AccessToken.getCurrentAccessToken().then((data) => {
                        const { accessToken } = data || {}
                        if (empty(accessToken)) {
                            _reject({ status: "erro", mensagem: `Falha ao obter dados de seu login no facebook` })
                        } else {
                            fetch("https://graph.facebook.com/v2.5/me?fields=email,first_name,last_name&access_token=" + accessToken)
                            .then((response) => response.json())
                            .then((_json) => {
                                const { email, first_name, last_name, id } = _json
                                _resolve({
                                    email: email,
                                    nome: `${first_name} ${last_name}`,
                                    social_id: id,
                                    foto: `https://graph.facebook.com/${id}/picture?width=320`
                                })
                            })
                            .catch(() => {
                                _reject({ status:"erro", mensagem: `Falha ao obter dados de seu login no facebook` })
                            })
                        }
                    })
                }
            },
            _erro => {
                console.log("catch LoginManager", _erro)
                _reject({ mensagem: `Falha ao efetuar login com o facebook: ${_erro}` })
            }
        )
    })
}
// COLETA_NOVA
export const actionLogin = actionFetchItem(CONECTAR, "usuario/login");
export const actionRecuperarSenha = actionFetchItem(RECUPERAR_SENHA, "usuario/recuperar-senha");
export const actionChecarTokenEmail = actionFetchItem(CHECAR_SIMBOLO_EMAIL, "usuario/checar-token-email");
export const actionAlterarSenha = actionFetchItem(ALTERAR_SENHA, "usuario/alterar-senha");
export const actionValidarEmail = actionFetchItem(VALIDAR_EMAIL, "usuario/validar-email");