import React, { PureComponent, Fragment } from "react";
import { View } from "react-native";
import Button from "@sd/components/button";
import styl from "./styl";
import Rota from "../rota";
import { empty } from "@sd/uteis/StringUteis";
import { coletaCheckIn } from "@actions/";
import { View as ViewAnimatable } from "react-native-animatable";
/*
data_checkin_unidade:
    * Tem que estar a menos de X metros do estabelecimento
    * O data_checkin_unidade tem que ser vazio
    * Estar na aba informações (0)
*/
export default class CheckInUnidade extends PureComponent {
    _click = () => {
        const { coleta: { coleta_id }, distanciaMinEstabelecimentoOk, navigation, onChange, distancia_checkin } = this.props;
        if (distanciaMinEstabelecimentoOk) {
            coletaCheckIn({
                body_rsa: {
                    coleta_id,
                    coluna: "data_checkin_unidade"
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
                    mensagem: `Só é possivel fazer checkin no estabelecimento à uma distância máxima de ${distancia_checkin} metros.`
                }
            })
        }
    }
    render() {
        const { coleta: { data_checkin_unidade }, distanciaMinEstabelecimentoOk} = this.props
        return <ViewAnimatable useNativeDriver={true} delay={200} animation="fadeIn">
            <Rota coleta={this.props.coleta} />
            {empty(data_checkin_unidade) && <View style={styl.container}>
                <Button
                    onPress={this._click}
                    text={{
                        value:"Checkin estabelecimento",
                        color: "07"
                    }}
                    bg={distanciaMinEstabelecimentoOk ? "14" : "15"}
                />
            </View>}
        </ViewAnimatable>
    }
}