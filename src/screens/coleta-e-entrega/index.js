import React, { useEffect, useState, useRef } from "react";
import Coleta from "./coleta";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from 'react-redux';
import { coletaBuscarProdutos } from "@actions/";
import BaseScreen from "@screens/partial/base/index";
import styl from "./styl";
import { ScrollView } from "react-native-gesture-handler";
import { cor } from "@root/app.json";
import { empty, km2String } from "sd/uteis/StringUteis";
import { GrupoRotas } from "@sd/navigation/revestir";
import { destroyFence, addFence, calcFence } from "@sd/uteis/permissions/index";
const initialLayout = { width: Dimensions.get('window').width };
export default function Coletas(props) {
    const dados = useSelector(({ autenticacao: { distancia_checkin, coleta } }) => ({distancia_checkin, coleta}));
    if (empty(dados.coleta) || dados.coleta.length === 0) return null;

    
    const { coleta, distancia_checkin } = dados;
    
    let stateInitial = {}
    let unidadeFence = false
    coleta.forEach(({latitude_unidade, longitude_unidade, latitude_cliente, longitude_cliente, coleta_id }) => {
        const _clienteKey = `clienteColetaId_${coleta_id}`
        if (unidadeFence === false) {
            const _unidadeKey = "estabelecimento";
            const dataFenceEstabelecimentoTmp = { name: _unidadeKey, latitude: latitude_unidade, longitude: longitude_unidade, raio: distancia_checkin };
            stateInitial[_unidadeKey] = calcFence(dataFenceEstabelecimentoTmp);
            unidadeFence = true;
        }
        const dataFenceClienteTmp = { name: _clienteKey, latitude: latitude_cliente, longitude: longitude_cliente, raio: distancia_checkin }
        stateInitial[_clienteKey] = calcFence(dataFenceClienteTmp);
    })
    const [stateFence, setStateFence] = useState(stateInitial);
    let scenes = {}
    let coleta_ids = [];
    let titles = dados.coleta.map(({ coleta_id, data_checkout_unidade}, index) => {
        const key = `coleta_${coleta_id}`;
        coleta_ids.push(coleta_id);
        scenes[key] = Coleta;
        return {
            key,
            stateFence,
            coletaConfirm: !empty(data_checkout_unidade),
            title: `Coleta #${coleta_id}`,
            index,
            coleta_id,
            jumpToCliente: p => jumpToConfirmCliente(p),
            jumpToColeta: p => jumpToConfirmColeta(p),
            navigation: props.navigation
        }
    })
    const [index, setIndex] = useState(0);
    const [routes] = useState(titles);
    const renderScene = SceneMap(scenes);

    useEffect(() => {
        function callBack(rest) {
            const { dentroDoRaio, distancia, name } = rest;
            let _newState = { ...stateInitial}
            _newState[name].distancia = distancia;
            _newState[name].dentroDoRaio = dentroDoRaio;
            setStateFence(_newState);
        }
        Object.values(stateInitial).forEach(fence => {
            addFence({ ...fence, callBack })
        })
        return () => {
             Object.values(stateInitial).forEach(({name}) => {
                destroyFence(name);
            })
        }
    }, []);
    useEffect(() => {
        const load = async () => {
            try{
                await coletaBuscarProdutos({
                    body_rsa: {
                        coleta_id: coleta_ids.join(",")
                    }
                })
            } catch(_err) {
                props.navigation.navigate("conectar")
            }
        }
        load();
    }, []);
    function jumpToConfirmColeta({ index }) {
        titles[index].coletaConfirm = true;
        let count = 0;
        for (const { coletaConfirm } of titles) {
            if (coletaConfirm !== true) {
                setIndex(count)
                break;
            }
            count++;
        }
    }
    function jumpToConfirmCliente({ index }) {
        let exitScreen = true
        if (titles !== undefined || titles.length > 0) {
            titles[index].sairCliente = true;
            let count = 0;
            for (const { sairCliente } of titles) {
                if (sairCliente !== true) {
                    exitScreen = false;
                    setIndex(count)
                    break;
                }
                count++;
            }
        }
        if (exitScreen) {
            let store = GrupoRotas.store.getState();
            store.autenticacao.coleta = [];
            store.autenticacao.produtos = [];
            props.navigation.navigate("home")
        }
    }
    function toogleTab({index}){
        setIndex(index)
    }
    let minWidth;
    switch (titles.length) {
        case 1:
            minWidth = initialLayout.width
            break;
        case 2:
            minWidth = initialLayout.width / 2
            break;
        case 2:
            minWidth = initialLayout.width / 3
            break;
        default:
            minWidth = initialLayout.width / 3.3
            break;
    }
    function renderMenuScroll() {
        if (empty(titles) || titles.length <= 1)return null;
        return <View style={styl.shadow}>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: .8, y: .4 }}
                colors={cor["14"]}
            >
                <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styl.warpTab}>
                    {titles.map(({ title, coletaConfirm, key, coleta_id }, k) => {
                        const _clienteKey = coletaConfirm ? `clienteColetaId_${coleta_id}` : "estabelecimento";
                        const _fenceTmp = stateInitial[_clienteKey];
                        return <TouchableOpacity
                            onPress={toogleTab.bind(null, { index: k })}
                            style={[styl.btnTab, { minWidth, backgroundColor: `rgba(255,255,255,${index === k ? .07 : 0})` }]} key={key}
                        >
                            <Text style={styl.textTab}>{title}</Text>
                            <Text style={styl.textDist}>( {km2String(_fenceTmp.distancia)} )</Text>
                        </TouchableOpacity>
                    })}
                </ScrollView>
            </LinearGradient>
        </View>
    }
    return (
        <BaseScreen
            style={styl.container}
            tituloBold="INFORMAÇÕES"
            titulo={` (coleta #${coleta_ids[index]})`}
            footerFix={renderMenuScroll}
        >
            <TabView
                renderTabBar={() => null}
                tabStyle={{ width: initialLayout}}
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={initialLayout}
            />
        </BaseScreen>
    );
}