import React, { PureComponent } from "react";
import { actionChecarTokenEmail } from "@actions/";
import ChecarToken from "@screens/partial/checar-token";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
export default class MeusDadosChecarTokenEmail extends PureComponent {
    static mapStateToProps = ["autenticacao"]
    _confirmarCodigo = _s => {
        const { autenticacao: { entregador_id, usuario_id } } = this.props.sd;
        actionChecarTokenEmail({
            body_rsa:{
                entregador_id, usuario_id,
                ..._s.body_rsa
            }
        }).then(_r => {
            this.props.navigation.navigate("meusDadosAlterarSenha", {
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
        const info = [`Digite o código de verificação que você recebeu ${typeReceiver} `, usuario, "\npara alterar sua senha."]
        return <ChecarToken info={info} usuario={usuario} onSubmit={this._confirmarCodigo} navigation={this.props.navigation}/>
    }
}