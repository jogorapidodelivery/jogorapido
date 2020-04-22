import React, { PureComponent } from "react";
import { actionChecarTokenEmail } from "@actions/";
import { AUTENTICAR } from '@constants/';
import ChecarToken from "@screens/partial/checar-token";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { encodeCipherCaesar } from "@sd/uteis/CipherCaesar";
import AsyncStorage from '@react-native-community/async-storage';
export default class ChecarTokenEmailGoHome extends PureComponent {
    static mapStateToProps = ["autenticacao"];
    _confirmarCodigo = _s => {
        const { usuario} = _s.body_rsa;
        const { autenticacao: { entregador_id, usuario_id, social_id, senha } } = this.props.sd;
        actionChecarTokenEmail({
            body_rsa: {
                entregador_id, usuario_id,
                ..._s.body_rsa
            }
        }).then(_r => {
            const _chifed = encodeCipherCaesar({ social_id, senha, usuario });
            AsyncStorage.setItem(AUTENTICAR, _chifed).catch(_err => { })
            this.props.navigation.push("home", {
                params: {
                    ..._s.body_rsa
                }
            });
        }).catch(_e => {
            this.props.navigation.push("alerta", {
                params: {
                    titulo: "JogoRápido",
                    mensagem: _e.mensagem
                }
            })
        })
    }
    render() {
        const usuario = getItemByKeys(this.props, "navigation.state.params.params.usuario", "dev@jogorapido.com.br");
        const typeReceiver = usuario.charAt(0) === "(" ? "via sms" : "no email";
        const info = [`Digite o código de verificação que você recebeu ${typeReceiver} `, usuario, "\npara validar seu cadastro."]
        return <ChecarToken info={info} usuario={usuario} onSubmit={this._confirmarCodigo} navigation={this.props.navigation}/>
    }
}