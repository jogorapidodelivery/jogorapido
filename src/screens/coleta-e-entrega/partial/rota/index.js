import React, { PureComponent, Fragment } from "react";
import { View, Text } from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import { cor } from "@root/app.json";
import { globalParams } from "@sd/fetch/DataFormat";
import { latLngDistKmOrM} from "@sd/uteis/NumberUteis"
import { empty } from "@sd/uteis/StringUteis";
import GroupButton from "./partial/botoes";
const icCenter = "";
const icMarker = "";
export const _addressOpenMapsDefaultProps = {
    title: "JogoRápido",
    cancelText: "Cancelar",
    actionSheetTitle: "Escolha o App",
    actionSheetMessage: "Apps disponíveis"
}
export default class Rota extends PureComponent {
    get pontoReferenciaUnidade() {
        const { coleta: { ponto_referencia_unidade}} = this.props;
        if (!empty(ponto_referencia_unidade)) return ` - ref. ${ponto_referencia_unidade}`;
        return "";
    }
    get complementoUnidade() {
        const { coleta: { complemento_unidade } } = this.props;
        if (!empty(complemento_unidade)) return ` ( ${complemento_unidade} ${this.pontoReferenciaUnidade})`;
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
            btnRouter: data_checkin_unidade ? false : true,
            telefone:null,
            titulo: unidade,
            destino: `${endereco_unidade}, ${bairro_unidade}, ${this.numeroUnidade} ${cidade_unidade} CEP: ${cep_unidade.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d)/g, "$1.$2-$3")}${this.complementoUnidade}`,
            latitude: data_checkin_unidade ? undefined : latitude_unidade,
            longitude: data_checkin_unidade ? undefined : longitude_unidade,
            chegada: horaChegadaUnidade,
            espera: horaSaidaUnidade
        }
    }
    get pontoReferenciaCliente() {
        const { coleta: { ponto_referencia_cliente } } = this.props;
        if (!empty(ponto_referencia_cliente)) return ` - ref. ${ponto_referencia_cliente} `;
        return "";
    }
    get numeroCliente() {
        const { coleta: { numero_cliente } } = this.props;
        if (!empty(numero_cliente)) return `nº ${numero_cliente}`;
        return "nº s/n";
    }
    get complementoCliente() {
        const { coleta: { complemento_cliente } } = this.props;
        if (!empty(complemento_cliente)) return ` ( ${complemento_cliente} ${this.pontoReferenciaCliente})`;
        return "";
    }
    get dadosCliente() {
        const { coleta: { telefone_celular, horaChegadaCliente, horaSaidaCliente, data_checkout_unidade, data_checkin_unidade, cep_cliente, cidade_cliente, endereco_cliente, bairro_cliente, tempo_rota_unidade_cliente, latitude_cliente, longitude_cliente, cliente, distancia_unidade_cliente } } = this.props
        return {
            distancia: distancia_unidade_cliente + "km",
            tempo: tempo_rota_unidade_cliente,
            titulo: cliente,
            btnRouter: !empty(data_checkout_unidade),
            telefone: telefone_celular,
            destino: `${endereco_cliente}, ${bairro_cliente}, ${this.numeroCliente} ${cidade_cliente} cep: ${cep_cliente.replace(/\D/g, "").replace(/^(\d{2})(\d{3})(\d)/g, "$1.$2-$3")} ${this.complementoCliente}`,
            latitude: data_checkin_unidade ? latitude_cliente : undefined,
            longitude: data_checkin_unidade ? longitude_cliente : undefined,
            chegada: horaChegadaCliente,
            espera: horaSaidaCliente
        }
    }
    render() {
        return [this.dadosUnidade, this.dadosCliente].map(({ btnRouter, telefone, distancia, tempo, titulo, destino, latitude, longitude, chegada, espera}, key) => <Fragment key={`entrega-${key}`}>
            <Text style={[stylDefault.p, styl.p]}><Text style={styl.strong}>{tempo || distancia}</Text> {tempo && `( ${distancia} )`} {key === 0 ? "até a coleta" : ""}</Text>
                <View style={styl.btn}>
                    <Text style={[stylDefault.icon, styl.icon, {color: key === 0 ? cor["08"] : cor["10"]}]}>{key === 0 ? icCenter : icMarker}</Text>
                    <View style={styl.warpItem}>
                        <Text style={[stylDefault.p, styl.strong, styl.captalize]}>{titulo}</Text>
                        <Text style={stylDefault.p}>{destino}</Text>
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
            {latitude && btnRouter && <GroupButton {...{ telefone, latitude, longitude}}/>}
            </Fragment>)
    }
}