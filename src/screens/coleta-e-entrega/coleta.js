import React, { Fragment, useState, useEffect } from "react";
import styl from "./styl";
import Aba from "./partial/aba";
import { empty } from "@sd/uteis/StringUteis";
import Button from "@sd/components/button";
import { whatsapp } from "@screens/home/menu/partial/item/commands";
import CheckInUnidade from "./partial/checkinUnidade/index";
import CheckOutUnidade from "./partial/checkoutUnidade/index";
import CheckInCliente from "./partial/checkinCliente/index";
import CheckOutCliente from "./partial/checkoutCliente/index";
import { destroyFence, addFence, calcFence } from "@sd/uteis/permissions/index";
import { View as AnimatableView } from "react-native-animatable";
import { _addressOpenMapsDefaultProps } from "@screens/coleta-e-entrega/partial/rota/index";
import { useSelector } from "react-redux";
import { moeda } from "@sd/uteis/form/MaskString";
export default function Coleta({ route: { index, navigation, jumpToColeta, jumpToCliente}}) {
    const dados = useSelector(({ autenticacao: { usuario_id, coleta: coletas, produtos, distancia_checkin } }) => {
        if (empty(coletas)) return null
        console.log("1) ANALIZA ARRAY AO ACEITAR A COLETA");
        console.log(coletas)
        console.log("1) FIM DE ANALIZA ARRAY AO ACEITAR A COLETA");
        const coleta_ids = coletas.map(({ coleta_id}) => coleta_id).join(",");
        coletas = coletas[index];
        produtos = empty(produtos) ? [] : produtos.filter(({ coleta_id }) => coleta_id === coletas.coleta_id).map(({ produto, qtd, sub_total, coleta_id }) => {
            return {
                titulo: `${produto} (${coleta_id})`,
                textOrMoney: moeda(sub_total),
                colorTextOrMoney: "12",
                textSub: `${qtd} unidade${qtd > 1 ? "s" : ""}`
            }
        });
        return {
            navigation, produtos, usuario_id, distancia_checkin, coleta: coletas, coleta_ids, index
        }
    });
    if (dados === null) return null;
    const { produtos, coleta: { data_checkout_cliente, data_checkout_unidade, data_checkin_cliente, data_checkin_unidade, latitude_unidade, longitude_unidade, latitude_cliente, longitude_cliente, coleta_id }, distancia_checkin} = dados;
    const dataFenceClienteTmp = { name: `cliente-coleta-id-${coleta_id}`, latitude: latitude_cliente, longitude: longitude_cliente, raio: distancia_checkin * 10 }
    const dataFenceEstabelecimentoTmp = { name: `estabelecimento-coleta-id-${coleta_id}`, latitude: latitude_unidade, longitude: longitude_unidade, raio: distancia_checkin};
    const responseFenceClienteTmp = calcFence(dataFenceClienteTmp);
    const responseFenceEstabelecimentoTmp = calcFence(dataFenceEstabelecimentoTmp);
    
    useEffect(() => {
        function callBack({ dentroDoRaio, distancia}) {
            setdistanciaMinClienteOk(dentroDoRaio)
            setDistanciaEmLinhaCliente(distancia)
        }
        addFence({ ...dataFenceClienteTmp, callBack })
        return () => {
            console.log(`destroy cliente fence coleta #${coleta_id}`)
            destroyFence(`cliente-coleta-id-${coleta_id}`);
        }
    }, []);
    useEffect(() => {
        function callBack({ dentroDoRaio, distancia}) {
            setDistanciaMinEstabelecimentoOk(dentroDoRaio)
            setDistanciaEmLinhaEstabelecimento(distancia)
        }
        addFence({ ...dataFenceClienteTmp, callBack })
        return () => {
            console.log(`destroy estabelecimento fence coleta #${coleta_id}`)
            destroyFence(`estabelecimento-coleta-id-${coleta_id}`);
        }
    }, []);
    const [distanciaMinClienteOk, setdistanciaMinClienteOk] = useState(responseFenceClienteTmp.dentroDoRaio);
    const [distanciaEmLinhaCliente, setDistanciaEmLinhaCliente] = useState(responseFenceClienteTmp.distancia);

    const [distanciaMinEstabelecimentoOk, setDistanciaMinEstabelecimentoOk] = useState(responseFenceEstabelecimentoTmp.dentroDoRaio);
    const [distanciaEmLinhaEstabelecimento, setDistanciaEmLinhaEstabelecimento] = useState(responseFenceEstabelecimentoTmp.distancia);
    const [abaSelecionada, setAbaSelecionada] = useState(!empty(data_checkin_unidade) ? 1 : 0);
    
    dados.distanciaMinClienteOk = distanciaMinClienteOk;
    dados.distanciaEmLinhaCliente = distanciaEmLinhaCliente;
    dados.distanciaEmLinhaEstabelecimento = distanciaEmLinhaEstabelecimento;
    dados.distanciaMinEstabelecimentoOk = distanciaMinEstabelecimentoOk;
    dados.abaSelecionada = abaSelecionada;
    function _toogleTab(tabIndex) {
        if (!empty(data_checkin_unidade) || (abaSelecionada === 1 && tabIndex !== 1)) {
            setAbaSelecionada(tabIndex);
        } else {
            navigation.push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem: "Só é possivel ver o detalhamento do pedido após fazer checkin no estabelecimento"
                }
            })
        }
    }
    function changeCheckInUnidade(){
        setAbaSelecionada(1)
    }
    let tab = 1;
    if (abaSelecionada !== 0 && produtos.length > 0) {
        if (!empty(data_checkin_unidade) && empty(data_checkout_unidade)) tab = 2;
        else if (!empty(data_checkout_unidade) && empty(data_checkin_cliente)) tab = 3;
        else if (!empty(data_checkin_cliente)) tab = 4;
    }
    const hide = empty(data_checkout_cliente)
    return <Fragment>
            <Aba abas={["INFORMAÇÕES", "DETALHAMENTO"]} {...dados} onPress={_toogleTab} />
            {tab === 1 && <CheckInUnidade {...dados} onChange={changeCheckInUnidade}/>}
            {tab === 2 && <CheckOutUnidade {...dados} onChange={jumpToColeta}/>}
            {tab === 3 && <CheckInCliente {...dados}/>}
            {tab === 4 && <CheckOutCliente titulo={hide ? "Produtos" : "Produtos (Entrega finalizada)"} {...dados} onChange={jumpToCliente}/>}
            {hide && <AnimatableView animation="flipInX" useNativeDriver={true} delay={900}>
                <Button onPress={whatsapp} style={styl.btnAjuda} text={{ value: "Preciso de ajuda", color: "07" }} leftIcon={{ value: "", color: "07" }} styleName="pequeno" bg="09" />
            </AnimatableView>}
        </Fragment>
}