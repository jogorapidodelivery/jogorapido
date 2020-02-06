import React, { PureComponent } from "react";
import { actionValidarEmail } from "@actions/";
import CapturarEmailOuTelefone from "@screens/partial/capturar-email-ou-telefone";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
export default class ValidarEmail extends PureComponent {
    _enviarCodigo = _s => {
        actionValidarEmail(_s).then(_r => {
            this.props.navigation.navigate("checarTokenEmailGoHome", {
                params: {
                    ..._s.body_rsa
                }
            });
        }).catch(_e => {
            this.props.navigation.push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem: _e.mensagem
                }
            })
        })
    }
    render() {
        const usuario = getItemByKeys(this.props, "navigation.state.params.params.usuario", "dev@jogorapido.com.br");
        // navigation={this.props.navigation}
        return <CapturarEmailOuTelefone
            titulo="EMAIL"
            tituloBold="CONFIRMAR"
            info={["Para manter sua conta segura, é necessário confirmar seu  ", "email. ", "Para isso, confira se o email abaixo esta correto e clique no botão ", "Confirmar email"]}
            tipoInput="email"
            postName="usuario"
            placeHolder="Digite aqui seu email"
            valueButton="Confirmar email"
            valueInput={usuario}
            onSubmit={this._enviarCodigo}
        />
    }
}