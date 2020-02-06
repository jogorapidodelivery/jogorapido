import React, { Component, Fragment } from "react";
import Button from "@sd/components/button";
import { coletaCheckIn } from "@actions/";
import Lista from "../lista/index";
import { empty } from "@sd/uteis/StringUteis";
/*
data_checkout_cliente:
    * Tem que estar a menos de X metros do cliente
    * O data_checkin_cliente tem que estar preenchido
    * O data_checkout_cliente tem que vazio
    * Estar na aba detalhamento (1)
*/
export default class CheckOutCliente extends Component {
    _click = () => {
        const { coleta: { coleta_id }, distanciaMinClienteOk, navigation, distancia_checkin } = this.props;
        if (distanciaMinClienteOk) {
            coletaCheckIn({
                body_rsa: {
                    coleta_id,
                    coluna: "data_checkout_cliente"
                }
            }).then(() => {
                navigation.push("home")
            }).catch(({ mensagem }) => {
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
                    mensagem: `Só é possivel fazer checkout no cliente à uma distância máxima de ${distancia_checkin} metros.`
                }
            })
        }
    }
    render() {
        const { produtos, coleta: { valor_frete, total_pedido, data_checkout_cliente }, distanciaMinClienteOk} = this.props;
        return <Fragment>
            <Lista titulo="Produto" total={total_pedido} data={[...produtos, { colorTextOrMoney: "12", textSub: "Motoqueiro", textOrMoney: valor_frete}]} />
            {empty(data_checkout_cliente) && <Button
                onPress={this._click}
                text={{
                    value: "Checkout cliente",
                    color: "07"
                }}
                bg={distanciaMinClienteOk ? "14" : "15"}
            />}
        </Fragment>
    }
}