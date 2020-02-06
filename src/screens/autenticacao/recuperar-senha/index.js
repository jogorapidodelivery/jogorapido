import React, { PureComponent } from "react";
import { actionRecuperarSenha } from "@actions/";
import CapturarEmailOuTelefone from "@screens/partial/capturar-email-ou-telefone";
export default class RecuperarSenha extends PureComponent {
    _confirmarCodigo = _s => {
        actionRecuperarSenha(_s).then(_r => {
            this.props.navigation.push("checarTokenEmailGoRecuperarSenha", {
                params: {
                    ..._s.body_rsa
                }
            });
        }).catch(_e => {
            console.log(_e);
            this.props.navigation.push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem: _e.mensagem
                }
            })
        })
    }
    render() {
        return <CapturarEmailOuTelefone
            navigation={this.props.navigation}
            titulo="SENHA"
            tituloBold="RECUPERAR"
            info={["Esqueceu sua senha?! Não se preocupe,\npara recuperar basta informar seu ", "email ", "ou ", "celular ", "e siga as instruções que receber via ", "email ou celular"]}
            tipoInput="emailCelular"
            postName="usuario"
            placeHolder="Email ou nº de celular"
            descricaoCampo="Você receberá um código de confirmação neste número ou email"
            valueButton="Entrar"
            onSubmit={this._confirmarCodigo}
        />
    }
}