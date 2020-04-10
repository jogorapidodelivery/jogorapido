import React, { PureComponent } from "react";
import BaseScreen from "@screens/partial/base";
import Button from "@sd/components/button";
import Form from "@sd/components/form";
import Input from "@sd/components/form/input";
import Info from "@screens/partial/info";
import styl from "./styl";
import { View as AnimatableView } from "react-native-animatable";
import * as Sentry from '@sentry/react-native';
import { openPageStart } from "@screens/autenticacao/command";
import { actionCriarContaViaFormulario } from "@actions";
const infos = ["Vamos começar? Seus dados ficarão\n salvos em um ambiente seguro\nda ", "JogoRápido"];

export default class CadastrarPlayer extends PureComponent {
    constructor(props) {
        super(props)
        this.form = new Form({
            successColor: "10",
            warnColor: "09",
            disableColor: "04"
        })
        this.state = {
            passWordStyle: {
                type: "senha",
                value: "",
                color: "08"
            }
        }
    }

    _onCreateAccount = _callBackUnlock => {
        this.form.check({
            body_rsa: {
                sexo: "M"
            }
        }).then(response => {
            actionCriarContaViaFormulario(response).then(() => {
                const { body_rsa: { usuario: email } } = response;
                Sentry.setUser({ email });
                openPageStart(this.props.navigation)
                _callBackUnlock();
            }).catch(_resp => {
                const { mensagem } = _resp;
                Sentry.addBreadcrumb({ action: "conectar/actionLogin:catch", ..._resp, ...response });
                this.props.navigation.push("alerta", {
                    params: {
                        titulo: "JogoRápido",
                        mensagem
                    }
                })
                _callBackUnlock();
            })
        }).catch(_err => {
            _callBackUnlock()
        })
    }
    _toogleType = () => {
        let { type, value, color } = this.state.passWordStyle;
        if (type === "senha") {
            type = "digitos";
            value = "";
            color = "10";
        } else {
            type = "senha";
            value = "";
            color = "08";
        }
        this.setState({ passWordStyle:{ type, value, color }});
    }

    render() {
        const { passWordStyle} = this.state;
        const { navigation} = this.props;
        return <BaseScreen style={styl.warpBase} navigation={navigation} titulo="CRIAR" tituloBold="CONTA">
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={100}>
                <Info data={infos} />
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={400}>
                <Input form={this.form} type="min" postName="nome" postType="rsa" placeHouder="Nome completo" underline={{ color: "07" }} style={styl.warpInput}/>
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={500}>
                <Input form={this.form} type="email" postName="email" postType="rsa" placeHouder="Seu melhor e-mail" underline={{ color: "07" }} style={styl.warpInput}/>
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={600}>
                <Input form={this.form} type="telefone" postName="telefone" postType="rsa" placeHouder="Celular" underline={{ color: "07" }} style={styl.warpInput}/>
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={700}>
                <Input form={this.form} type={passWordStyle.type} compare="senhaCompare" postName="senha" postType="rsa" placeHouder="Senha" underline={{ color: "06" }} rightIcon={{ ...passWordStyle, onPress: this._toogleType }} style={[styl.spacePassword, styl.warpInput]}/>
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={800}>
                <Button text={{ value: "CADASTRAR", color: "07" }} onPressAwait={this._onCreateAccount} bg="14" style={styl.button}/>
            </AnimatableView>
        </BaseScreen>
    }
}