import React, { PureComponent, Fragment } from "react";
import { Text } from "react-native";
import HeaderLogo from "@screens/partial/header-logo";
import BaseScreen from "@screens/partial/base";
import styl from "./styl";
import Button from "@sd/components/button";
import Form from "@sd/components/form";
import Input from "@sd/components/form/input";
import { stylDefault } from "@src/stylDefault";
import { actionLogin } from "@actions/";
import { openPageStart } from "../command";
import RemoteMessage from "react-native-firebase/dist/modules/messaging/RemoteMessage";
import { SharedEventEmitter} from "react-native-firebase/dist/utils/events";
import { empty } from "@sd/uteis/StringUteis";

import { View as AnimatableView } from "react-native-animatable";
export default class Conectar extends PureComponent {
    constructor(props) {
        super(props)
        this.form = new Form({
            successColor: "10",
            warnColor: "09",
            disableColor: "04"
        })
        this.state = {
            passWordStyle:{
                type:"senha",
                value:"",
                color:"08"
            }
        }
    }
    _submit = _callBackUnlock => {
        this.form.check().then((res) => {
            actionLogin(res).then( () => {
                openPageStart(this.props.navigation)
                _callBackUnlock();
            }).catch(({ mensagem}) => {
                this.props.navigation.push("alerta", {
                    params: {
                        titulo: "JogoRápido",
                        mensagem
                    }
                })
                _callBackUnlock();
            })
        }).catch(() => {
            _callBackUnlock();
        })
        
    }
    _toogleType = () => {
        let { passWordStyle:{type, value, color}} = this.state;
        if (type === "senha") {
            type = "digitos";
            value = "";
            color = "10";
        } else {
            type = "senha";
            value = "";
            color = "08";
        }
        this.setState({ passWordStyle: { type, value, color }});
    }
    render() {
        const { passWordStyle } = this.state;
        return <BaseScreen
            {...this.props}
            header={<HeaderLogo />}
            style={styl.warpBase}
            noTopButton={true}
            headerHeight={HeaderLogo.heightContainer}>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={100}>
                <Input value={__DEV__ ? "joisiney@gmail.com" : ""} style={styl.warpInput} form={this.form} type="email" postName="usuario" postType="rsa" placeHouder="E-mail" underline={{ color:"06" }} />
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={500}>
                <Input value={__DEV__ ? "020406" : ""} style={[styl.spacePassword, styl.warpInput]} form={this.form} type={passWordStyle.type} compare="senhaCompare" postName="senha" postType="rsa" placeHouder="Senha" underline={{ color:"06" }} rightIcon={{ ...passWordStyle, onPress:this._toogleType }} />
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={600}>
                <Button nome="Entrar" text={{ value: "Entrar", color:"07" }} onPressAwait={this._submit} bg="14" />
            </AnimatableView>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={700}>
                <Button nome="Opa! esqueci minha senha?" text={{ value: "Opa! esqueci minha senha?", color:"03", style:styl.textoSenha }} onPress={() => this.props.navigation.navigate("recuperarSenha")} />
            </AnimatableView>
            {false && <Button nome="Facebook" text={{ value: <Text><Text style={stylDefault.normal}>Entrar com </Text>Facebook</Text>, color:"07" }} onPressAwait={actionUnlook => { if (false) actionUnlook()}} bg="11" style={styl.btnLoginSocial} />}
            {false && <Button nome="Cadastro" text={{ value: <Text><Text style={stylDefault.normal}>Não está registrado? </Text><Text style={[styl.textCadastro]}>Cadastre-se</Text></Text>, color: "03", style: styl.textoSenha }} onPressAwait={actionUnlook => { if (false) actionUnlook() }} style={styl.btn} />}
        </BaseScreen>
    }
}