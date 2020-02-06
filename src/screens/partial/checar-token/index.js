import React, { PureComponent } from "react";
import { Text, View, TextInput } from "react-native";
import BaseScreen from "@screens/partial/base";
import Button from "@sd/components/button";
import Form from "@sd/components/form";
import Input from "@sd/components/form/input";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
import BtnCodigoEmailAjuda from "../../partial/btn-codigo-email-ajuda";
import Ul from "../../partial/lista";
import Info from "../../partial/info";
export default class ChecarToken extends PureComponent {
    constructor(props) {
        super(props)
        this.form = new Form({
            successColor: "10",
            warnColor: "09",
            disableColor: "04"
        })
    }
    _confirmarCodigo = () => {
        const { usuario, onSubmit } = this.props;
        this.form.check({
            body_rsa:{
                usuario
            }
        }).then(_s => {
            console.log(_s);
            const { p1, p2, p3, p4} = _s.body_rsa;
            _s.body_rsa.token_email = `${p1}${p2}${p3}${p4}`;
            onSubmit(_s)
        }).catch(_e => {
            console.log("check.catch", _e)
        })
    }
    render() {
        const { info } = this.props;
        return <BaseScreen style={styl.base} {...this.props} titulo="DE AUTENTICAÇÃO" tituloBold="CÓDIGO">
            <Info data={info}/>
            <View style={styl.warpInputs}>
                <Input max={1} postName="p1" style={styl.input} form={this.form} type="digitos" styleName="code" postType="rsa"/>
                <Input max={1} postName="p2" style={styl.input} form={this.form} type="digitos" styleName="code" postType="rsa"/>
                <Input max={1} postName="p3" style={styl.input} form={this.form} type="digitos" styleName="code" postType="rsa"/>
                <Input max={1} postName="p4" style={styl.input} form={this.form} type="digitos" styleName="code" postType="rsa"/>
            </View>
            {false && <View style={styl.warpCode}>
                {[0,1,2,3].map(v => <View style={styl.spacerBox} key={`spacer-box-${v}`}/>)}
                <TextInput style={styl.code} maxLength={4} keyboardType="numeric"/>
            </View>}
            <Button
                style={styl.button}
                onPress={this._confirmarCodigo}
                text={{
                    value: "Continuar",
                    color: "07"
                }}
                bg="14"
                rightIcon={{
                    value: "",
                    color: "07"
                }}
            />
            <Ul titulo="Não recebi email:" lis={["Veja sua caixa de spam", "Clique em enviar e receber email"]}/>
            <View style={styl.warpEye}>
                <Text style={[stylDefault.p, styl.text]}>caso não tenha recebido clique{"\n"}em uma das opções abaixo</Text>
            </View>
            <BtnCodigoEmailAjuda/>
        </BaseScreen>
    }
}