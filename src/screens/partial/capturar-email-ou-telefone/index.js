import React, { PureComponent } from "react";
import { Text } from "react-native";
import BaseScreen from "@screens/partial/base";
import Button from "@sd/components/button";
import Form from "@sd/components/form";
import Input from "@sd/components/form/input";
import { stylDefault } from "@src/stylDefault";
import Info from "../../partial/info";
import styl from "./styl";
export default class CapturarEmailOuTelefone extends PureComponent {
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
    _toogleType = () => {
        let { passWordStyle: { type, value, color } } = this.state;
        if (type === "senha") {
            type = "digitos";
            value = "";
            color = "10";
        } else {
            type = "senha";
            value = "";
            color = "08";
        }
        this.setState({ passWordStyle: { type, value, color } });
    }
    _confirmarCodigo = () => {
        const { onSubmit, defaultPost} = this.props
        this.form.check(defaultPost).then(_s => {
            onSubmit(_s)
        }).catch(_e => {
            console.log("check.catch", _e)
        })
    }
    get propsIsInputPassword() {
        const { tipoInput} = this.props
        if (tipoInput === "senha") {
            const { passWordStyle } = this.state
            return {
                type: passWordStyle.type,
                rightIcon:{
                    ...passWordStyle,
                    onPress: this._toogleType
                }
            }
        }
        return {
            type: tipoInput,
            rightIcon:{
            value: "",
                color: "07"
            }
        }
    }
    render() {
        const { titulo, tituloBold, info, placeHolder, postName, descricaoCampo, valueButton, valueInput, navigation} = this.props
        return <BaseScreen style={styl.base} {...this.props} titulo={titulo} tituloBold={tituloBold}>
            {info && <Info data={info}/>}
            <Input
                value={valueInput}
                style={styl.input}
                form={this.form}
                {...this.propsIsInputPassword}
                postName={postName}
                postType="rsa"
                placeHouder={placeHolder}
                underline={{
                    color: "06"
                }}
            />
            {descricaoCampo && <Text style={[stylDefault.span, styl.text]}>{descricaoCampo}</Text>}
            <Button
                style={styl.button}
                text={{
                    value: valueButton,
                    color: "07"
                }}
                onPress={this._confirmarCodigo}
                bg="14"
            />
        </BaseScreen>
    }
}