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
import { View as AnimatableView } from "react-native-animatable";
import { _addressOpenMapsDefaultProps } from "@screens/coleta-e-entrega/partial/rota/index";
import { useSelector } from "react-redux";
import { moeda } from "@sd/uteis/form/MaskString";
export default function Coleta({ route: { index, stateFence, navigation, jumpToColeta, jumpToCliente}}) {
    const fenceEstabelecimento = stateFence.estabelecimento;
    const dados = useSelector(({ autenticacao: { usuario_id, lastedCheckoutUnidade, coleta: coletas, produtos, distancia_checkin } }) => {
        const coleta_ids = coletas.map(({ coleta_id}) => coleta_id).join(",");
        coletas = coletas[index];
        produtos = empty(produtos) ? [] : produtos.filter(({ coleta_id }) => coleta_id === coletas.coleta_id).map(({ produto, qtd, sub_total }) => {
            return {
                titulo: produto,
                textOrMoney: moeda(sub_total),
                colorTextOrMoney: "12",
                textSub: `${qtd} unidade${qtd > 1 ? "s" : ""}`
            }
        });
        let tituloBtnCheckOutUnidade = "Próximo coleta";
        if (lastedCheckoutUnidade === 1) tituloBtnCheckOutUnidade = "Saindo estabelecimento";

        const { coleta_id} = coletas
        
        const fenceCliente = stateFence[`clienteColetaId_${coleta_id}`];
        const distanciaMinClienteOk = fenceCliente.dentroDoRaio;
        const distanciaEmLinhaCliente = fenceCliente.distancia;
        const distanciaEmLinhaEstabelecimento = fenceEstabelecimento.distancia;
        const distanciaMinEstabelecimentoOk = fenceEstabelecimento.dentroDoRaio;
        
        return {
            distanciaMinClienteOk,
            distanciaEmLinhaCliente,
            distanciaEmLinhaEstabelecimento,
            distanciaMinEstabelecimentoOk,
            navigation,
            lastedCheckoutUnidade,
            tituloBtnCheckOutUnidade,
            produtos,
            usuario_id,
            distancia_checkin,
            coleta: coletas,
            coleta_ids,
            index
        }
    });
    if (dados === null) return null;
    const { produtos, coleta: { data_checkout_cliente, data_checkout_unidade, data_checkin_cliente, data_checkin_unidade, coleta_id }} = dados;
    const fenceCliente = stateFence[`clienteColetaId_${coleta_id}`];
    dados.distanciaMinClienteOk = fenceCliente.dentroDoRaio;
    dados.distanciaEmLinhaCliente = fenceCliente.distancia;
    dados.distanciaEmLinhaEstabelecimento = fenceEstabelecimento.distancia;
    dados.distanciaMinEstabelecimentoOk = fenceEstabelecimento.dentroDoRaio;
    const [abaSelecionada, setAbaSelecionada] = useState(data_checkin_unidade === null ? 0 : 1);
    console.log({ data_checkin_unidade, data_checkout_unidade, abaSelecionada})
    dados.abaSelecionada = abaSelecionada;
    useEffect(() => {
        dados.abaSelecionada = data_checkin_unidade === null ? 0 : 1;
        setAbaSelecionada(dados.abaSelecionada);
    }, [data_checkin_unidade])
    function _toogleTab(tabIndex) {
        if (!empty(data_checkin_unidade) || (abaSelecionada === 1 && tabIndex !== 1)) {
            setAbaSelecionada(tabIndex);
        } else {
            navigation.push("alerta", {
                params: {
                    titulo: "JogoRápido",
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
        {tab === 3 && <CheckInCliente {...dados} />}
        {tab === 4 && <CheckOutCliente titulo={hide ? "Produtos" : "Produtos (Entrega finalizada)"} {...dados} onChange={jumpToCliente}/>}
            {hide && <AnimatableView animation="flipInX" useNativeDriver={true} delay={900}>
                <Button onPress={whatsapp} style={styl.btnAjuda} text={{ value: "Preciso de ajuda", color: "07" }} leftIcon={{ value: "", color: "07" }} styleName="pequeno" bg="09" />
            </AnimatableView>}
        </Fragment>
}