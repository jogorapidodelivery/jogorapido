import React, { PureComponent } from "react";
import { FlatList, View, Text } from "react-native";
import styl from "./styl";
import Header from "./partial/header";
import Item from "./partial/item/index";
import { version} from "@root/package.json";
import { stylDefault } from "@src/stylDefault";
export default class Menu extends PureComponent {
    static mapStateToProps = ["menu"]
    _renderItem = ({ item, index }) => <Item {...item} index={index} navigation={this.props.navigation}/>
    _extract = (_item, index) => index.toString();
    render() {
        return <View style={styl.container}>
            <FlatList
                ListHeaderComponent={() => <Header />}
                style={styl.flatList}
                showsVerticalScrollIndicator={false}
                data={this.props.sd.menu}
                keyExtractor={this._extract}
                renderItem={this._renderItem}
                ListFooterComponent={() => <Text style={[stylDefault.span, styl.version]}>{version}</Text>}
            />
        </View>
    }
}