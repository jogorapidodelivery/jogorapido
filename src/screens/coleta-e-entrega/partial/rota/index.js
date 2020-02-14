import React, { PureComponent, Fragment } from "react";
import { View, Text, ToastAndroid } from "react-native";
import styl from "./styl";
import Button from "@sd/components/button";
import { stylDefault } from "@src/stylDefault";
import { cor } from "@root/app.json";
import { globalParams } from "@sd/fetch/DataFormat";
import { latLngDistKmOrM} from "@sd/uteis/NumberUteis"
import OpenMap from "react-native-open-map";
import { empty } from "@sd/uteis/StringUteis";
const icCenter = "";
const icMarker = "";
export const _addressOpenMapsDefaultProps = {
    title: "Jogo Rápido",
    cancelText: "Cancelar",
    actionSheetTitle: "Escolha o App",
    actionSheetMessage: "Apps disponíveis"
}
export default class Rota extends PureComponent {
    get pontoReferenciaUnidade() {
        const { coleta: { ponto_referencia_unidade}} = this.props;
        if (!empty(ponto_referencia_unidade)) return `\nPonto de referência: ${ponto_referencia_unidade}`;
        return "";
    }
    get numeroUnidade() {
        const { coleta: { numero_unidade}} = this.props;
        if (!empty(numero_unidade)) return `nº ${numero_unidade}`;
        return "nº s/n";
    }
    get dadosUnidade() {
        const { coleta: { horaChegadaUnidade, horaSaidaUnidade, data_checkin_unidade, data_checkin_cliente, unidade, latitude_unidade, longitude_unidade, endereco_unidade, bairro_unidade, cidade_unidade, cep_unidade}} = this.props;
        const { latitude:lat1, longitude:lng1} = globalParams
        const dist = latLngDistKmOrM(lat1, lng1, latitude_unidade, longitude_unidade)
        // 
        return {
            distancia: data_checkin_cliente ? undefined : dist,
            // tempo: "20 min",
            titulo: unidade,
            destino: `${endereco_unidade}, ${bairro_unidade}, ${this.numeroUnidade} ${cidade_unidade} cep: ${cep_unidade.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d)/g, "$1.$2-$3")}${this.pontoReferenciaUnidade}`,
            latitude: data_checkin_unidade ? undefined : latitude_unidade,
            longitude: data_checkin_unidade ? undefined : longitude_unidade,
            chegada: horaChegadaUnidade,
            espera: horaSaidaUnidade
        }
    }
    get pontoReferenciaCliente() {
        const { coleta: { ponto_referencia_unidade } } = this.props;
        if (!empty(ponto_referencia_unidade)) return `\nPonto de referência: ${ponto_referencia_unidade}`;
        return "";
    }
    get numeroCliente() {
        const { coleta: { numero_cliente } } = this.props;
        if (!empty(numero_cliente)) return `nº ${numero_cliente}`;
        return "nº s/n";
    }
    get complementoCliente() {
        const { coleta: { complemento_cliente } } = this.props;
        if (!empty(complemento_cliente)) return ` ( ${complemento_cliente} )`;
        return "";
    }
    get dadosCliente() {
        const { coleta: { horaChegadaCliente, horaSaidaCliente, data_checkin_unidade, data_checkout_cliente, data_checkin_cliente, cep_cliente, cidade_cliente, endereco_cliente, bairro_cliente, tempo_rota_unidade_cliente, latitude_cliente, longitude_cliente, cliente, distancia_unidade_cliente } } = this.props
        return {
            distancia: distancia_unidade_cliente + "km",
            tempo: tempo_rota_unidade_cliente,
            titulo: cliente,
            destino: `${endereco_cliente}, ${bairro_cliente}, ${this.numeroCliente} ${cidade_cliente} cep: ${cep_cliente.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d)/g, "$1.$2-$3")} ${this.complementoCliente}`,
            latitude: data_checkin_unidade ? latitude_cliente : undefined,
            longitude: data_checkin_unidade ? longitude_cliente : undefined,
            chegada: horaChegadaCliente,
            espera: horaSaidaCliente
        }
    }
    _openMaps = ({ latitude, longitude, autor}) => {
        const _data = {
            latitude, longitude,
            ..._addressOpenMapsDefaultProps
        }
        OpenMap.show(_data);
    }
    render() {
        return [this.dadosUnidade, this.dadosCliente].map(({ distancia, tempo, titulo, destino, latitude, longitude, chegada, espera}, key) => <Fragment key={`entrega-${key}`}>
                <Text style={[stylDefault.p, styl.p]}><Text style={styl.strong}>{tempo || distancia}</Text> {tempo && `( ${distancia} )`} até a coleta</Text>
                <View style={styl.btn}>
                    <Text style={[stylDefault.icon, styl.icon, {color: key === 0 ? cor["08"] : cor["10"]}]}>{key === 0 ? icCenter : icMarker}</Text>
                    <View style={styl.warpItem}>
                        <Text style={[stylDefault.p, styl.strong, styl.captalize]}>{titulo}</Text>
                        <Text style={[stylDefault.p, styl.captalize]}>{destino}</Text>
                        {chegada && <View style={styl.warpTempo}>
                            {chegada && <View style={styl.contentTempo}>
                                <Text style={stylDefault.span}>Horário de chegada</Text>
                                <Text style={[stylDefault.span, styl.chegada]}>{chegada}</Text>
                            </View>}
                            {espera && <View style={[styl.contentTempo, {alignSelf:"flex-end"}]}>
                                <Text style={stylDefault.span}>Tempo de espera</Text>
                                <Text style={[stylDefault.span, styl.espera]}>{espera}</Text>
                            </View>}
                        </View>}
                    </View>
                </View>
                {latitude && <Button
                    onPress={this._openMaps.bind(this, { latitude, longitude, autor: titulo})}
                    style={styl.btnRota}
                    text={{
                        value: "Rota",
                        color: "07"
                    }}
                    leftIcon={{
                        value: "",
                        color: "07"
                    }}
                    styleName="pequeno"
                    bg="16"
                />}
            </Fragment>)
    }
}