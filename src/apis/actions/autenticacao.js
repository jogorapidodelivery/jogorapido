import firebase from "react-native-firebase";
import { AUTENTICAR, CONECTAR, RECUPERAR_SENHA, CHECAR_SIMBOLO_EMAIL, ALTERAR_SENHA, VALIDAR_EMAIL } from "@constants/";
import { actionFetchItem} from "@sd/uteis/CreateActions";
import AsyncStorage from '@react-native-community/async-storage';
import {decodeCipherCaesar} from "@sd/uteis/CipherCaesar";
export const actionAutenticar = () => {
    return new Promise((_resolve, _reject) => {
        firebase.notifications().removeAllDeliveredNotifications();
        AsyncStorage.getItem(AUTENTICAR).then(value => {
            if(value != null) {
                const body_rsa = decodeCipherCaesar(value);
                const _action = actionFetchItem(AUTENTICAR, "usuario/login", false);
                _action({body_rsa}).then(_resolve).catch(_reject);
            } else {
                _reject();
            }
        }).catch(() => _reject());
    })
};
// COLETA_NOVA
export const actionLogin = actionFetchItem(CONECTAR, "usuario/login");
export const actionRecuperarSenha = actionFetchItem(RECUPERAR_SENHA, "usuario/recuperar-senha");
export const actionChecarTokenEmail = actionFetchItem(CHECAR_SIMBOLO_EMAIL, "usuario/checar-token-email");
export const actionAlterarSenha = actionFetchItem(ALTERAR_SENHA, "usuario/alterar-senha");
export const actionValidarEmail = actionFetchItem(VALIDAR_EMAIL, "usuario/validar-email");