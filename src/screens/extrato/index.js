import React, { PureComponent, Fragment } from "react";
import { FlatList, View, Text } from "react-native";
import BaseScreen from "@screens/partial/base";
import styl from "./styl";
import Header from "./partial/header/index";
import Footer from "./partial/footer/index";
import Item from "./partial/item/index";
export default class Disponibilidade extends PureComponent {
    static mapStateToProps = ["extrato", "extrato.filtros", "autenticacao.usuario_id"];
    _renderCorrida = ({ item}) => <Item {...item}/>
    _extract = (_item, index) => `index-${index}`;
    render() {
        const { navigation, sd: { usuario_id, filtros, extrato: { extrato, mes_atual, totalPeriodo, total_mes_atual}}} = this.props;
        return <BaseScreen
            style={styl.container}
            tituloBold="MINHAS"
            navigation={this.props.navigation}
            titulo="CORRIDAS"
        >
            <FlatList
                ListHeaderComponent={<Header {...{ navigation, filtros, usuario_id, mes_atual, total_mes_atual }}/>}
                ListFooterComponent={<Footer totalPeriodo={totalPeriodo}/>}
                ListEmptyComponent={<View style={styl.warpEmpty}>
                    <Text style={styl.textEmpty}>Nenhuma atividade{"\n"}registrada neste periodo</Text>
                </View>}
                showsVerticalScrollIndicator={false}
                data={extrato}
                keyExtractor={this._extract}
                renderItem={this._renderCorrida}
            />
        </BaseScreen>
    }
}