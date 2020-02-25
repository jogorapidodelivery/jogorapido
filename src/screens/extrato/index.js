import React, { PureComponent, Fragment } from "react";
import { FlatList } from "react-native";
import BaseScreen from "@screens/partial/base";
import styl from "./styl";
import Header from "./partial/header/index";
import Footer from "./partial/footer/index";
import Item from "./partial/item/index";
export default class Disponibilidade extends PureComponent {
    static mapStateToProps = ["extrato"];
    _renderCorrida = ({ item}) => <Item {...item}/>
    _extract = (_item, index) => `index-${index}`;
    render() {
        return <BaseScreen
            style={styl.container}
            tituloBold="MINHAS"
            navigation={this.props.navigation}
            titulo="CORRIDAS"
        >
            <FlatList
                ListHeaderComponent={<Header/>}
                ListFooterComponent={<Footer/>}
                showsVerticalScrollIndicator={false}
                data={[0,0,0,0,0,1]}
                keyExtractor={this._extract}
                renderItem={this._renderCorrida}
            />
        </BaseScreen>
    }
}