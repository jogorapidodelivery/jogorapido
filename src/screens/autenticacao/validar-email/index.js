import React, { PureComponent } from "react";
import { actionValidarEmail } from "@actions/";
import CapturarEmailOuTelefone from "@screens/partial/capturar-email-ou-telefone";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
export default class ValidarEmail extends PureComponent {
    static mapStateToProps = ["autenticacao"]
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
                    titulo: "JogoRápido",
                    mensagem: _e.mensagem
                }
            })
        })
    }

    render() {
        const { autenticacao: { entregador_id, usuario_id, usuario } } = this.props.sd;
        return <CapturarEmailOuTelefone
            titulo="EMAIL"
            tituloBold="CONFIRMAR"
            info={["Para manter sua conta segura, é necessário confirmar seu  ", "email. ", "Para isso, confira se o email abaixo esta correto e clique no botão ", "Confirmar email"]}
            tipoInput="email"
            postName="usuario"
            placeHolder="Digite aqui seu email"
            valueButton="Confirmar email"
            valueInput={usuario}
            defaultPost={{ body_rsa: { entregador_id, usuario_id} }}
            onSubmit={this._enviarCodigo}
        />
    }
}