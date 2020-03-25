import React, { Component, Fragment } from "react";
import { View, Text } from "react-native";
import Button from "@sd/components/button";
import styl from "./styl";
import { View as ViewAnimatable } from "react-native-animatable";
import { coletaCheckOutUnidade } from "@actions/";
import Lista from "../lista/index";
import { km2String } from "../../../../../sd/uteis/StringUteis";
/*
data_checkin_cliente:
    * Tem que estar a menos de X metros do cliente
    * O data_checkin_cliente tem que ser vazio
    * Estar na aba detalhamento (1)
*/
export default class CheckOutUnidade extends Component {
    constructor(props){
        super(props);
        this.state = {
            todosOsProdutosEstaoSelecionados:false,
            badge: `0/${props.produtos.length}`
        }
    }
    _click = () => {
        const { todosOsProdutosEstaoSelecionados } = this.state;
        const { onChange, index, coleta:{coleta_id}, coleta_ids, distanciaMinEstabelecimentoOk, navigation, distancia_checkin } = this.props;
        if (distanciaMinEstabelecimentoOk) {
            if (todosOsProdutosEstaoSelecionados) {
                coletaCheckOutUnidade({
                    body_view:{
                        index
                    },
                    body_rsa: {
                        coleta_id: coleta_ids,
                        coluna: "data_checkout_unidade"
                    }
                }).then(() => {
                    onChange({ index, coleta_id });
                }).catch(_err => {
                    const { mensagem } = _err;
                    navigation.push("alerta", {
                        params: {
                            titulo: "Jogo Rápido",
                            mensagem
                        }
                    })
                })
            } else {
                navigation.push("alerta", {
                    params: {
                        titulo: "Jogo Rápido",
                        mensagem: "É necessário confirmar que pegou todos os produtos"
                    }
                })
            }
        } else {
            navigation.push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem: `Só é possivel fazer checkin no estabelecimento à uma distância máxima de ${km2String(distancia_checkin)}.`
                }
            })
        }
    }
    _liberarCheckOut = ({ actived, badge }) => {
        this.setState({ todosOsProdutosEstaoSelecionados: actived, badge })
    }
    render() {
        const { todosOsProdutosEstaoSelecionados, badge} = this.state;
        const { produtos, distanciaMinEstabelecimentoOk, tituloBtnCheckOutUnidade, distanciaEmLinhaEstabelecimento} = this.props;
        const value = `${tituloBtnCheckOutUnidade} ( ${km2String(distanciaEmLinhaEstabelecimento)} )`;
        return <ViewAnimatable useNativeDriver={true} delay={200} animation="fadeIn">
            <Lista titulo="Produto" onPress={this._liberarCheckOut.bind(this)} data={produtos} />
            <View style={styl.container}>
                <View style={styl.warpFase}>
                    <Text style={styl.icon}></Text>
                    <Text style={styl.parte}>{badge}</Text>
                </View>
                <Button
                    onPress={this._click}
                    text={{
                        value,
                        color: "07"
                    }}
                    bg={distanciaMinEstabelecimentoOk && todosOsProdutosEstaoSelecionados? "14" : "15"}
                />
            </View>
        </ViewAnimatable>
    }
}