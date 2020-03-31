import React, { useCallback, useEffect, useState } from "react";
import { FlatList, View, Text } from "react-native";
import styl from "./styl";
import Header from "./partial/header";
import Item from "./partial/item/index";
import { version} from "@root/package.json";
import { stylDefault } from "@src/stylDefault";
import { useSelector } from "react-redux";
import codePush from "react-native-code-push";
import * as Sentry from '@sentry/react-native';
function _extract(_item, index) {
    return index.toString();
}
function _renderItem({ item, index, navigation }){
    return <Item {...item} index={index} navigation={navigation} />
}
export default function Menu({ navigation}){
    const { menu, email, telefone, foto, nome } = useSelector(({ autenticacao }) => autenticacao);
    const renderItemCall = useCallback(({ item, index }) => _renderItem({ item, index, navigation }));
    const [versao, setVersao] = useState(version);
    useEffect(() => {
        codePush.getUpdateMetadata().then((update) => {
            if (update) {
                setVersao(update.appVersion + '-codepush:' + update.label);
                Sentry.setRelease(update.appVersion + ':' + update.label);
            }
        }).catch(_err => {
            Sentry.captureException(_err);
        });
        return () => {
            // ?
        }
    }, [])
    return <View style={styl.container}>
        <FlatList
            ListHeaderComponent={() => <Header navigation={navigation} data={{ email, telefone, foto, nome }} />}
            style={styl.flatList}
            showsVerticalScrollIndicator={false}
            data={menu}
            keyExtractor={_extract}
            renderItem={renderItemCall}
            ListFooterComponent={() => <Text style={[stylDefault.span, styl.version]}>{versao}</Text>}
        />
    </View>
}