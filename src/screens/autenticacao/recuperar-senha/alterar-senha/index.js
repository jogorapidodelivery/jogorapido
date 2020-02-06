import React, { PureComponent } from "react";
import { actionAlterarSenha } from "@actions/";
import CapturarEmailOuTelefone from "@screens/partial/capturar-email-ou-telefone";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { bgLocationFetch } from "@libs/geofence";
export default class AlterarSenha extends PureComponent {
    _submit = _s => {
        actionAlterarSenha(_s).then(_r => {
            const { response: { usuario_id}} = _r;
            if (usuario_id) bgLocationFetch({ usuario_id });
            this.props.navigation.navigate("home");
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
        return <CapturarEmailOuTelefone
            defaultPost={{
                body_rsa: {
                    usuario
                }
            }}
            navigation={this.props.navigation}
            titulo="ALTERAR"
            tituloBold="SENHA"
            info={["Digite sua ", "nova senha ", "clique\nem alterar e pronto!"]}
            tipoInput="senha"
            postName="senha"
            placeHolder="Senha"
            descricaoCampo="A senha deve ser composta por no mínimo 8 caracteres, entre eles números e letras."
            valueButton="Alterar"
            onSubmit={this._submit}
        />
    }
}