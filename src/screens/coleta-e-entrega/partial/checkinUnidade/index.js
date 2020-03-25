import React, { PureComponent } from "react";
import { View } from "react-native";
import Button from "@sd/components/button";
import styl from "./styl";
import Rota from "../rota";
import { empty } from "@sd/uteis/StringUteis";
import { coletaCheckInUnidade } from "@actions/";
import { View as ViewAnimatable } from "react-native-animatable";
import { km2String } from "../../../../../sd/uteis/StringUteis";

/*
data_checkin_unidade:
    * Tem que estar a menos de X metros do estabelecimento
    * O data_checkin_unidade tem que ser vazio
    * Estar na aba informações (0)
*/

export default class CheckInUnidade extends PureComponent {
   
    _click = () => {
        const { onChange, coleta_ids, distanciaMinEstabelecimentoOk, navigation, distancia_checkin } = this.props;
        if (distanciaMinEstabelecimentoOk) {
            coletaCheckInUnidade({
                body_rsa: {
                    coleta_id: coleta_ids,
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
                    mensagem: `Só é possivel fazer checkin no estabelecimento à uma distância máxima de ${km2String(distancia_checkin)}.`
                }
            })
        }
    }
    render() {
        const { coleta, distanciaMinEstabelecimentoOk, distanciaEmLinhaEstabelecimento } = this.props;
        const { data_checkin_unidade } = coleta;
        const value = `Cheguei Estabelecimento ( ${km2String(distanciaEmLinhaEstabelecimento)} )`;
        return <ViewAnimatable useNativeDriver={true} delay={200} animation="fadeIn">
            <Rota coleta={coleta}/>
            {empty(data_checkin_unidade) && <View style={styl.container}>
                <Button
                    onPress={this._click}
                    text={{
                        value,
                        color: "07"
                    }}
                    bg={distanciaMinEstabelecimentoOk ? "14" : "15"}
                />
            </View>}
        </ViewAnimatable>
    }
}