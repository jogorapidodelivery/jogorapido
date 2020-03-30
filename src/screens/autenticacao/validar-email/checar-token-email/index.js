import React, { PureComponent } from "react";
import { actionChecarTokenEmail } from "@actions/";
import ChecarToken from "@screens/partial/checar-token";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
export default class ChecarTokenEmailGoHome extends PureComponent {
    _confirmarCodigo = _s => {
        actionChecarTokenEmail(_s).then(_r => {
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