import React, { Component } from "react";
import Button from "@sd/components/button";
import { coletaCheckIn } from "@actions/";
import Lista from "../lista/index";
import { View as ViewAnimatable } from "react-native-animatable";
import { km2String } from "@sd/uteis/StringUteis";
/*
data_checkout_unidade:
    * Tem que estar a menos de X metros do estabelecimento
    * O data_checkin_unidade tem que estar preenchido
    * O data_checkout_unidade tem que vazio
    * Estar na aba detalhamento (1)
*/
export default class CheckInCliente extends Component {
    _click = () => {
        const { index, coleta: { coleta_id }, distanciaMinClienteOk, navigation, onChange, distancia_checkin } = this.props;
        if (distanciaMinClienteOk) {
            coletaCheckIn({
                body_view: {
                    index
                },
                body_rsa: {
                    coleta_id,
                    coluna: "data_checkin_cliente"
                }
            }).then(onChange).catch(({ mensagem }) => {
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
                    mensagem: `Só é possivel fazer checkin no cliente à uma distância máxima de ${km2String(distancia_checkin)}.`
                }
            })
        }
    }
    render() {
        const { produtos, coleta: { valor_frete, total_pedido }, distanciaMinClienteOk, distanciaEmLinhaCliente, lastedCheckoutUnidade} = this.props;
        const value = `Cheguei Cliente ( ${km2String(distanciaEmLinhaCliente)} )`;
        return <ViewAnimatable useNativeDriver={true} delay={200} animation="fadeIn">
            <Lista titulo="Produto" total={total_pedido} data={[...produtos, { colorTextOrMoney: "12", textSub: "Taxa entrega", textOrMoney: valor_frete}]} />
            {lastedCheckoutUnidade === 0 && <Button
                onPress={this._click}
                text={{
                    value,
                    color: "07"
                }}
                bg={distanciaMinClienteOk ? "14" : "15"}
            />}
        </ViewAnimatable>
    }
}