import React, { Component, Fragment } from "react";
import { Text } from "react-native";
import BaseScreen from "@screens/partial/base";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
import Aba from "./partial/aba";
import { empty } from "@sd/uteis/StringUteis";
import Button from "@sd/components/button";
import { whatsapp } from "@screens/home/menu/partial/item/commands";
import { moeda } from "@sd/uteis/form/MaskString";
import CheckInUnidade from "./partial/checkinUnidade/index";
import CheckOutUnidade from "./partial/checkoutUnidade/index";
import CheckInCliente from "./partial/checkinCliente/index";
import CheckOutCliente from "./partial/checkoutCliente/index";
import { destroyFence, addFence } from "@sd/uteis/permissions/index";
import { View as AnimatableView, Text as AnimatableText } from "react-native-animatable";
import { coletaBuscarProdutos } from "@actions/";
export default class Coleta extends Component {
    static mapStateToProps = ["autenticacao.usuario_id", "autenticacao.coleta", "autenticacao.produtos", "autenticacao.distancia_checkin"]
    static mapTransformProps = props => {
        props.produtos = empty(props.produtos) ? [] : props.produtos.map(({produto, qtd, sub_total}) => {
            return {
                titulo: produto,
                textOrMoney: moeda(sub_total),
                colorTextOrMoney: "12",
                textSub: `${qtd} unidade${qtd>1 ? "s" : ""}`
            }
        })
        return props
    }
    constructor(props) {
        super(props);
        destroyFence();
        const { coleta: { unidade, coleta_id, latitude_unidade, longitude_unidade, latitude_cliente, longitude_cliente, cliente }, distancia_checkin } = this.props.sd;
        const { dentroDoRaio: distanciaMinClienteOk, distancia: distanciaEmLinhaCliente} = addFence({ name: cliente, latitude: latitude_cliente, longitude: longitude_cliente, raio: distancia_checkin * 10, callBack: this.fenceCliente.bind(this) })
        const { dentroDoRaio: distanciaMinEstabelecimentoOk, distancia: distanciaEmLinhaEstabelecimento } = addFence({ name: unidade, latitude: latitude_unidade, longitude: longitude_unidade, raio: distancia_checkin, callBack: this.fenceEstabelecimento.bind(this) })
        this.state = {
            abas: ["INFORMAÇÕES", "DETALHAMENTO"],
            abaSelecionada:0,
            todosOsProdutosEstaoSelecionados:false,
            distanciaEmLinhaCliente,
            distanciaMinClienteOk,
            distanciaEmLinhaEstabelecimento,
            distanciaMinEstabelecimentoOk
        }
        coletaBuscarProdutos({
            body_rsa:{
                coleta_id
            }
        }).catch(() => {
            props.navigation.push("login")
        })
    }
    fenceEstabelecimento = ({ dentroDoRaio: distanciaMinEstabelecimentoOk, distancia: distanciaEmLinhaEstabelecimento}) => {
        if (this.state.distanciaMinEstabelecimentoOk !== distanciaMinEstabelecimentoOk) {
            this.setState({ distanciaMinEstabelecimentoOk, distanciaEmLinhaEstabelecimento});
        }
    }
    fenceCliente = ({ dentroDoRaio: distanciaMinClienteOk, distancia: distanciaEmLinhaCliente}) => {
        if (this.state.distanciaMinClienteOk !== distanciaMinClienteOk) {
            this.setState({ distanciaMinClienteOk, distanciaEmLinhaCliente});
        }
    }
    componentWillUnmount(){
        destroyFence();
    }
    _toogleTab = abaSelecionada => {
        const { data_checkin_unidade} = this.props.sd.coleta;
        console.log({ action:"toogleTab", data_checkin_unidade, abaSelecionada});
        if (!empty(data_checkin_unidade) || this.state.abaSelecionada === 1) {
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
        this.setState({ abaSelecionada: 1 });
    }
    get renderCheckIn() {
        const { sd, navigation } = this.props
        const { coleta, produtos, distancia_checkin } = sd;
        const { data_checkin_unidade, data_checkout_unidade, data_checkin_cliente } = coleta;
        console.log({ action:"renderCheckIn", data_checkin_unidade, data_checkout_unidade, data_checkin_cliente});
        const { abaSelecionada, distanciaMinEstabelecimentoOk, distanciaMinClienteOk } = this.state;
        if (abaSelecionada === 0) {
            return <CheckInUnidade coleta={coleta} distancia_checkin={distancia_checkin} onChange={this.changeCheckInUnidade.bind(this)} navigation={navigation} distanciaMinEstabelecimentoOk={distanciaMinEstabelecimentoOk} />
        } else if (!empty(coleta) && produtos.length > 0){
            if (!empty(data_checkin_unidade) && empty(data_checkout_unidade)) {
                return <CheckOutUnidade coleta={coleta} produtos={produtos} distancia_checkin={distancia_checkin} navigation={navigation} distanciaMinEstabelecimentoOk={distanciaMinEstabelecimentoOk} />
            } else if (!empty(data_checkout_unidade) && empty(data_checkin_cliente)){
                return <CheckInCliente coleta={coleta} produtos={produtos} distancia_checkin={distancia_checkin} navigation={navigation} distanciaMinClienteOk={distanciaMinClienteOk} />
            } else if (!empty(data_checkin_cliente)) {
                return <CheckOutCliente coleta={coleta} produtos={produtos} distancia_checkin={distancia_checkin} navigation={navigation} distanciaMinClienteOk={distanciaMinClienteOk} />
            }
        }
        return <Fragment/>
    }
    render() {
        const {sd} = this.props;
        const { coleta} = sd;
        if (empty(coleta))return <Fragment/>
        const { coleta_id, pedido_id } = coleta;
        if (empty(coleta_id))return <Fragment/>
        const { distanciaEmLinhaEstabelecimento, distanciaEmLinhaCliente } = this.state;
        return <BaseScreen
            style={styl.container}
            tituloBold="INFORMAÇÕES"
            titulo="DO PEDIDO"
        >
            {/* <Lista titulo="Informações de cobrança" isLink={false} data={[chegada, saida, motiqueiro, {
                textOrMoney: "até 3x no cartão de crédito"
            }]}/> */}
            <AnimatableText animation="fadeInUp" useNativeDriver={true} style={[stylDefault.h1, (pedido_id ? { marginBottom: 0 } : {})]}>Coleta #{coleta_id}</AnimatableText>
            {pedido_id && <Text style={[stylDefault.span, styl.h2]}>Pedido #{pedido_id}</Text>}
            {distanciaEmLinhaCliente && __DEV__ && <Text style={[stylDefault.span, styl.h2]}>Dist. cliente{distanciaEmLinhaCliente}m</Text>}
            {distanciaEmLinhaEstabelecimento && __DEV__ && <Text style={[stylDefault.span, styl.h2]}>Dist. Estabelecimento{distanciaEmLinhaEstabelecimento}m</Text>}
            <Aba {...this.state} onPress={this._toogleTab.bind(this)}/>
            {this.renderCheckIn}
            <AnimatableView animation="flipInX" useNativeDriver={true} delay={900}>
                <Button onPress={whatsapp} style={styl.btnAjuda} text={{ value: "Preciso de ajuda", color: "07" }} leftIcon={{ value: "", color: "07" }} styleName="pequeno" bg="09"/> 
            </AnimatableView>
        </BaseScreen>
    }
}