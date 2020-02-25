import React, { PureComponent, Fragment } from "react";
import { Text, View, FlatList } from "react-native";
import Button from "@sd/components/button";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
const dataFilter = [
    { start: 1, end: 1, title: "HOJE", actived:true },
    { start: 2, end: 2, title: "ONTEM" },
    { start: 15, end: 31, title: "1ª QUINZENA" },
    { start: 0, end: 15, title: "2ª QUINZENA" },
    { start: 30, end: 61, title: "MÊS PASSADO" }
]
export default class Header extends PureComponent {
    _renderFilter = ({ item: { title, actived }, index }) => {
        const props = actived ? {bg:"14"} : {};
        const textColor = actived ? "07" : "20";
        return <Button
            style={styl.warpBtn}
            text={{
                value: title,
                color: textColor
            }}
            styleName="pequeno"
            {...props}
        />
    }
    _renderLineHeader = (icone, titulo, data = undefined) => (<View style={styl.warpLine}>
        <Text style={[stylDefault.icon, styl.icon]}>{icone}</Text>
        <Text style={[stylDefault.p, styl.titulo]}>{titulo}</Text>
        {data && <Text style={stylDefault.p}>{data}</Text>}
    </View>)
    _extract = (_item, index) => `index-${index}`;
    render() {
        return <Fragment>
            {this._renderLineHeader("", "Receita", "01/2020")}
            <View style={styl.warpMoney}>
                <View style={styl.lineVertical} />
                <Text style={stylDefault.span}>R$ <Text style={styl.preco}>233,00</Text></Text>
            </View>
            {this._renderLineHeader("", "Extrato por período")}
            <FlatList
                data={dataFilter}
                showsHorizontalScrollIndicator={false}
                horizontal
                style={styl.warpList}
                keyExtractor={this._extract}
                renderItem={this._renderFilter}
            />
            <View style={styl.warpHeaderList}>
                <Text style={styl.headerTitle}>DATA E HORA</Text>
                <Text style={styl.headerTitle}>DESCRIÇÃO</Text>
                <Text style={styl.headerTitle}>VALOR</Text>
            </View>
        </Fragment>
    }
}