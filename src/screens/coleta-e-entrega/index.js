import React, { Component } from "react";
import { Text, LayoutAnimation } from "react-native";
import BaseScreen from "@screens/partial/base";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
import Aba from "./partial/aba";
import { empty } from "@sd/uteis/StringUteis";
import BackgroundGeolocation from "react-native-background-geolocation";
import { globalParams } from "@sd/fetch/DataFormat";
import { latLngDist } from "@sd/uteis/NumberUteis";
import { coletaCheckIn } from "../../apis/actions/coleta";
import Button from "@sd/components/button";
import { whatsapp } from "@screens/home/menu/partial/item/commands";
import { moeda } from "@sd/uteis/form/MaskString";
import CheckInUnidade from "./partial/checkinUnidade/index";
import CheckOutUnidade from "./partial/checkoutUnidade/index";
import CheckInCliente from "./partial/checkinCliente/index";
import CheckOutCliente from "./partial/checkoutCliente/index";
export default class Coleta extends Component {
    static mapStateToProps = ["autenticacao.usuario_id", "autenticacao.coleta", "autenticacao.produtos", "autenticacao.distancia_checkin"]
    static mapTransformProps = props => {
        props.produtos = props.produtos.map(({produto, qtd, sub_total}) => {
            return {
                titulo: produto,
                textOrMoney: moeda(sub_total),
                colorTextOrMoney: "12",
                textSub: `${qtd} unidade${qtd>1 ? "s" : ""}`
            }
        })
        return props
    }
    constructor(props){
        super(props)
        const { coleta: { latitude_unidade: latU, longitude_unidade: lngU, latitude_cliente: latC, longitude_cliente: lngC }, distancia_checkin } = this.props.sd;
        const { latitude: latMy, longitude: lngMy } = globalParams;
        const distMaxCheckinKM = distancia_checkin / 1000;
        const distC = latLngDist(latMy, lngMy, latC, lngC);
        const distU = latLngDist(latMy, lngMy, latU, lngU);
        // console.log({ distMaxCheckinKM, distC, distU, inC: distC < distMaxCheckinKM, inU: distU < distMaxCheckinKM})
        this.state = {
            abas: ["INFORMAÇÕES", "DETALHAMENTO"],
            abaSelecionada:0,
            todosOsProdutosEstaoSelecionados:false,
            distanciaMinClienteOk: distC < distMaxCheckinKM,
            distanciaMinEstabelecimentoOk: distU < distMaxCheckinKM
        }
        BackgroundGeolocation.addGeofences([{
            identifier: "distanciaMinEstabelecimentoOk",
            radius: distancia_checkin,
            latitude: Number(latU),
            longitude: Number(lngU),
            notifyOnEntry: true,
            notifyOnExit: true,
        }, {
            identifier: "distanciaMinClienteOk",
            radius: distancia_checkin,
            latitude: Number(latC),
            longitude: Number(lngC),
            notifyOnEntry: true,
            notifyOnExit: true
        }]).then((success) => {
            console.log("[addGeofences] success", success);
        }).catch((error) => {
            console.log("[addGeofences] FAILURE: ", error);
        });
        BackgroundGeolocation.onGeofence(({ identifier, action}) => {
            this.setState({ [identifier]: action === "ENTER"});
        });
    }
    componentWillUnmount(){
        BackgroundGeolocation.removeGeofences();
    }
    _toogleTab = abaSelecionada => {
        const { data_checkin_unidade} = this.props.sd.coleta
        if (!empty(data_checkin_unidade)) {
            // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            this.setState({ abaSelecionada });
        } else {
            this.props.navigation.push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem: "Só é possivel ver o detalhamento do pedido após fazer checkin no estabelecimento"
                }
            })
        }
    }
    
    changeCheckInUnidade = () => {
        // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        this.setState({ abaSelecionada: 1 });
    }
    render() {
        const {sd, navigation} = this.props
        const { coleta, produtos, distancia_checkin} = sd;
        const { coleta_id, pedido_id, data_checkin_unidade, data_checkout_unidade, data_checkin_cliente } = coleta;
        const { abaSelecionada, distanciaMinEstabelecimentoOk, distanciaMinClienteOk } = this.state;
        console.log({ distanciaMinClienteOk })
        return <BaseScreen
            // headerFix={status === "Pendente" ? <ColetaPendenteProgressHeader tempoRestante={tempo_aceite - progresso} /> : undefined}
            style={styl.container}
            tituloBold="INFORMAÇÕES"
            titulo="DO PEDIDO"
        >
            {/* <Lista titulo="Informações de cobrança" isLink={false} data={[chegada, saida, motiqueiro, {
                textOrMoney: "até 3x no cartão de crédito"
            }]}/> */}
            <Text style={[stylDefault.h1, (pedido_id ? { marginBottom:0} : {})]}>Coleta #{coleta_id}</Text>
            {pedido_id && <Text style={[stylDefault.span, styl.h2]}>Pedido #{pedido_id}</Text>}
            <Aba {...this.state} onPress={this._toogleTab.bind(this)}/>
            {abaSelecionada === 0 && <CheckInUnidade coleta={coleta} distancia_checkin={distancia_checkin} onChange={this.changeCheckInUnidade.bind(this)} navigation={navigation} distanciaMinEstabelecimentoOk={distanciaMinEstabelecimentoOk}/>}
            {abaSelecionada === 1 && !empty(data_checkin_unidade) && empty(data_checkout_unidade) && <CheckOutUnidade coleta={coleta} produtos={produtos} distancia_checkin={distancia_checkin} navigation={navigation} distanciaMinEstabelecimentoOk={distanciaMinEstabelecimentoOk}/>}
            {abaSelecionada === 1 && !empty(data_checkout_unidade) && empty(data_checkin_cliente) && <CheckInCliente coleta={coleta} produtos={produtos} distancia_checkin={distancia_checkin} navigation={navigation} distanciaMinClienteOk={distanciaMinClienteOk}/>}
            {abaSelecionada === 1 && !empty(data_checkin_cliente) && <CheckOutCliente coleta={coleta} produtos={produtos} distancia_checkin={distancia_checkin} navigation={navigation} distanciaMinClienteOk={distanciaMinClienteOk}/>}
            <Button onPress={whatsapp} style={styl.btnAjuda} text={{ value: "Preciso de ajuda", color: "07" }} leftIcon={{ value: "", color: "07" }} styleName="pequeno" bg="09"/>
        </BaseScreen>
    }
}