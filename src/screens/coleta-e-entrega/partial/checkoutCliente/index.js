import React, { Component } from "react";
import Button from "@sd/components/button";
import { coletaCheckOutCliente } from "@actions/";
import Lista from "../lista/index";
import { empty } from "@sd/uteis/StringUteis";
import { View as ViewAnimatable } from "react-native-animatable";
import { km2String } from "../../../../../sd/uteis/StringUteis";
import { GrupoRotas } from "@sd/navigation/revestir";
/*
data_checkout_cliente:
    * Tem que estar a menos de X metros do cliente
    * O data_checkin_cliente tem que estar preenchido
    * O data_checkout_cliente tem que vazio
    * Estar na aba detalhamento (1)
*/

export default class CheckOutCliente extends Component {
    _click = () => {
        const { onChange, index, coleta: { coleta_id }, entregador_id, distanciaMinClienteOk, navigation, distancia_checkin_cliente, distancia_checkin } = this.props;
        console.log("CheckOutCliente:distancia_checkin_cliente", distancia_checkin_cliente);
        if (distanciaMinClienteOk) {
            coletaCheckOutCliente({
                body_view:{
                    index
                },
                body_rsa: {
                    coleta_id,
                    entregador_id,
                    coluna: "data_checkout_cliente"
                } 
            }).then(() => {
                onChange({ index, coleta_id });
            }).catch(erro => {
                const { status, mensagem } = erro;
                if (status = "listapedido") {
                    navigation.push("alerta", {
                        params: {
                            titulo: "JogoRápido",
                            mensagem,
                            onPress: () => {
                                let store = GrupoRotas.store.getState();
                                store.autenticacao.coleta = [];
                                store.autenticacao.produtos = [];
                                navigation.navigate("home");
                            }
                        }
                    })
                } else {
                    navigation.push("alerta", {
                        params: {
                            titulo: "JogoRápido",
                            mensagem
                        }
                    })
                }
            })
        } else {
            console.log("CheckOutCliente:distancia_checkin_cliente", distancia_checkin_cliente);
            navigation.push("alerta", {
                params: {
                    titulo: "JogoRápido",
                    mensagem: `Só é possivel fazer checkout no cliente à uma distância máxima de ${km2String(distancia_checkin_cliente)}.`
                }
            })
        }
    }
    render() {
        const { titulo, produtos, coleta: { valor_frete, total_pedido, data_checkout_cliente }, distanciaMinClienteOk} = this.props;
        return <ViewAnimatable useNativeDriver={true} delay={200} animation="fadeIn">
            <Lista titulo={titulo} total={total_pedido} data={[...produtos, { colorTextOrMoney: "12", textSub: "Taxa entrega", textOrMoney: valor_frete}]} />
            {empty(data_checkout_cliente) && <Button
                onPress={this._click}
                text={{
                    value: "Finalizar Pedido",
                    color: "07"
                }}
                bg={distanciaMinClienteOk ? "14" : "15"}
            />}
        </ViewAnimatable>
    }
}