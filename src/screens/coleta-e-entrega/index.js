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
import { empty } from "sd/uteis/StringUteis";
import { GrupoRotas } from "@sd/navigation/revestir";
const initialLayout = { width: Dimensions.get('window').width };
export default function Coletas(props) {
    const coletas = useSelector(({ autenticacao: { coleta } }) => coleta);
    if (empty(coletas) || coletas.length === 0) return null;
    let scenes = {}
    const coleta_ids = [];
    let coletasCapturadas = [];
    console.log("0) ANALIZA ARRAY AO ACEITAR A COLETA");
    console.log(coletas)
    console.log("0) FIM DE ANALIZA ARRAY AO ACEITAR A COLETA");
    let titles = coletas.map(({ coleta_id }, index) => {
        const key = `coleta_${coleta_id}`;
        coleta_ids.push(coleta_id);
        scenes[key] = Coleta;
        return { key, title: `Coleta #${coleta_id}`, index, jumpToCliente: p => jumpToConfirmCliente(p), jumpToColeta: p => jumpToConfirmColeta(p), navigation:props.navigation}
    })
    
    const [index, setIndex] = useState(0);
    const [routes] = useState(titles);
    const renderScene = SceneMap(scenes);

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
        default:
            minWidth = initialLayout.width / 3
            break;
    }
    return (
        <BaseScreen
            style={styl.container}
            tituloBold="INFORMAÇÕES"
            titulo={` (coleta #${coleta_ids[index]})`}
            footerFix={titles.length > 1 ? <View style={styl.shadow}><LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: .8, y: .4 }}
                colors={cor["14"]}
            >
                <ScrollView horizontal style={styl.warpTab}>
                    {titles.map(({ title, key }, k) => <TouchableOpacity
                        onPress={toogleTab.bind(null, {index:k})}
                        style={[styl.btnTab, { minWidth, borderBottomWidth: index === k ? 5 : 0 }]} key= { key }
                    >
                        <Text style={styl.textTab}>{title}</Text>
                    </TouchableOpacity>
                    )}
                </ScrollView>
            </LinearGradient></View> : null}
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