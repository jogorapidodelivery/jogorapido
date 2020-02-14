import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity} from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import Button from "@sd/components/button";
import { cor, tempoParaAceite } from "@root/app.json";
import { View as ViewAnimatable } from "react-native-animatable";
import { coletaAtualizarStatus } from "@actions/";
import OpenMap from "react-native-open-map";
import { triggerDestroyTimerProgress } from "../../../../firebase-background-message/index";
import { View as AnimatableView, Text as AnimatableText } from "react-native-animatable";
export const _addressOpenMapsDefaultProps = {
    title: "Jogo Rápido",
    cancelText: "Cancelar",
    actionSheetTitle: "Escolha o App",
    actionSheetMessage: "Apps disponíveis"
}

export default class ColetaPendente extends PureComponent {
    _abrirPedido = (_r) => {
        const { coleta_id } = this.props;
        const status_coleta_id = 2;
        const body_rsa = { status_coleta_id, coleta_id }
        coletaAtualizarStatus({ body_rsa }).then(() => {
            triggerDestroyTimerProgress();
            this.props.navigation.navigate("coletar");
        }).catch(_err => {
            console.log(_err);
        })
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
    
    _openMaps = _maps => {
        OpenMap.show(_maps);
    }
    _renderInputFake(_icon, _cor, _titulo, _stylWarp, _maps) {
        return <TouchableOpacity onPress={this._openMaps.bind(this, _maps)} style={[styl.containerInputFake, _stylWarp]}>
            <Text style={[stylDefault.icon, { color: cor[_cor]}]}>{_icon}</Text>
            <View style={styl.warpInputFake}>
                <Text style={[stylDefault.p, styl.mensagem]}>{_titulo}</Text>
            </View>
        </TouchableOpacity>
    }
    render() {
        const {
            latitude_cliente,
            longitude_cliente,
            latitude_unidade,
            longitude_unidade,
            coleta_id,
            pedido_id,
            unidade,
            cliente,
            distancia_unidade_cliente,
            tempo_rota_unidade_cliente,
            valor_frete
        } = this.props;
        const _addressUnidade = {
            latitude: latitude_unidade,
            longitude: longitude_unidade,
            ..._addressOpenMapsDefaultProps
        }
        const _addressCliente = {
            latitude: latitude_cliente,
            longitude: longitude_cliente,
            ..._addressOpenMapsDefaultProps
        }
        return <View style={styl.container}>
            <AnimatableText animation="fadeInUp" useNativeDriver={true} style={stylDefault.h1}>Coleta pendente #{coleta_id}</AnimatableText>
            <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={300} style={styl.warp}>
                {this._renderInputFake("", "08", unidade, styl.containerInputFakeFirst, _addressUnidade)}
                <Text style={[stylDefault.icon, styl.iconAte]}></Text>
                {this._renderInputFake("", "10", cliente, {}, _addressCliente)}
            </AnimatableView>
            <AnimatableText animation="fadeInUp" useNativeDriver={true} delay={500} style={[stylDefault.span, styl.distancia]}><Text style={styl.bold}>{tempo_rota_unidade_cliente}</Text> ( {distancia_unidade_cliente} km )</AnimatableText>
            <ViewAnimatable useNativeDriver={true} animation="flipInX" delay={800}>
                <Button
                    text={{
                        value: <Text>Aceitar <Text style={stylDefault.normal}>( {valor_frete} )</Text></Text>,
                        color: "07"
                    }}
                    leftIcon={{
                        value: "",
                        color: "07"
                    }}
                    bg="14"
                    onPress={this._submit}
                />
            </ViewAnimatable>
        </View>
    }
}
