import React, { Component, Fragment } from "react";
import Button from "@sd/components/button";
import { coletaCheckIn } from "@actions/";
import Lista from "../lista/index";
/*
data_checkout_unidade:
    * Tem que estar a menos de X metros do estabelecimento
    * O data_checkin_unidade tem que estar preenchido
    * O data_checkout_unidade tem que vazio
    * Estar na aba detalhamento (1)
*/
export default class CheckInCliente extends Component {
    _click = () => {
        const { coleta: { coleta_id }, distanciaMinClienteOk, navigation, onChange, distancia_checkin } = this.props;
        if (distanciaMinClienteOk) {
            coletaCheckIn({
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
                    mensagem: `Só é possivel fazer checkin no cliente à uma distância máxima de ${distancia_checkin} metros.`
                }
            })
        }
    }
    render() {
        const { produtos, coleta: { valor_frete, total_pedido }, distanciaMinClienteOk} = this.props;
        return <Fragment>
            <Lista titulo="Produto" total={total_pedido} data={[...produtos, { colorTextOrMoney: "12", textSub: "Motoqueiro", textOrMoney: valor_frete}]} />
            <Button
                onPress={this._click}
                text={{
                    value: "Checkin cliente",
                    color: "07"
                }}
                bg={distanciaMinClienteOk ? "14" : "15"}
            />
        </Fragment>
    }
}