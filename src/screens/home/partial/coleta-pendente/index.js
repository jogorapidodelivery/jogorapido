import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import Button from "@sd/components/button";
import { View as ViewAnimatable } from "react-native-animatable";
import { coletaAtualizarStatus } from "@actions/";
import { triggerDestroyTimerProgress } from "@libs/dispatchNotify";
import { View as AnimatableView, Text as AnimatableText } from "react-native-animatable";
import ItemRoute from "./partial/item-route";
export const _addressOpenMapsDefaultProps = {
    title: "Jogo Rápido",
    cancelText: "Cancelar",
    actionSheetTitle: "Escolha o App",
    actionSheetMessage: "Apps disponíveis"
}

export default class ColetaPendente extends PureComponent {
    _abrirPedido = ({ acao}) => {
        if (acao !== "cancelar") {
            const { coleta_ids } = this.props;
            
            const body_rsa = { status_coleta_id: 2, coleta_id: coleta_ids.join(",") }
            coletaAtualizarStatus({ body_rsa }).then(() => {
                triggerDestroyTimerProgress();
                this.props.navigation.navigate("coletar");
            }).catch(_err => {
                console.warn(_err);
            })
        }
    }
    _submit = () => {
        this.props.navigation.push("confirma", {
            params:{
                titulo:"Confirmar corrida",
                mensagem: 'Ao clicar em “Confirmar” declaro que estou ciente que devo cumprir as normas que constam no Regulamento do <strong>APP Jogo Rápido.</strong>',
                button:{
                    text:{
                        value: "CONFIRMAR CORRIDA",
                        color: "07"
                    },
                    rightIcon:{
                        value: "",
                        color: "07"
                    },
                    bg:"16",
                    onPress:this._abrirPedido.bind(this)
                }
            }
        })
    }
    
    render() {

        const { coleta, tituloColetas} = this.props
        const total = coleta.length - 1;
        return <View style={styl.container}>
            <AnimatableText animation="fadeInUp" useNativeDriver={true} style={stylDefault.h1}>{tituloColetas}</AnimatableText>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={300}>
                {coleta.map((v, k) => <ItemRoute {...v} key={`item-${k}`} total={total} index={k}/>)}
            </AnimatableView>
            <ViewAnimatable useNativeDriver={true} style={styl.warpBtn} animation="flipInX" delay={800}>
                <Button
                    text={{
                        value: <Text>Aceitar <Text style={stylDefault.normal}>corrida</Text></Text>,
                        color: "07"
                    }}
                    rightIcon={{
                        value: "",
                        color: "07"
                    }}
                    bg="14"
                    onPress={this._submit}
                />
            </ViewAnimatable>
        </View>
    }
}
