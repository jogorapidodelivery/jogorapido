import React, { PureComponent, Fragment } from "react";
import { Text, View, FlatList, LayoutAnimation } from "react-native";
import Button from "@sd/components/button";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
export default class Header extends PureComponent {
    onPress = ({ status_periodo, index}) => {
        this.props.load(() => {
            this.refs.lista.scrollToIndex({ animated: true, index });
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }, status_periodo);
    }
    _renderFilter = ({ item: { status_periodo, title, actived }, index }) => {
        const props = actived ? {bg:"14"} : {};
        const textColor = actived ? "07" : "20";
        
        return <Button
            style={styl.warpBtn}
            text={{
                value: title,
                color: textColor
            }}
            onPress={this.onPress.bind(this, { status_periodo, index })}
            styleName="pequeno"
            {...props}
        />
    }
    _renderLineHeader = (icone, titulo, data = undefined) => (<View style={styl.warpLine}>
        <Text style={[stylDefault.icon, styl.icon]}>{icone}</Text>
        <Text style={[stylDefault.p, styl.titulo]}>{titulo}</Text>
        {data && <Text style={stylDefault.p}>{data}</Text>}
    </View>)
    _extract = ({ actived }, index) => `index-${index}-${actived ? "sim" : "nao"}`;
    render() {
        const { filtros, mes_atual, total_mes_atual} = this.props;
        return <Fragment>
            {this._renderLineHeader("", "Receita", mes_atual)}
            <View style={styl.warpMoney}>
                <View style={styl.lineVertical} />
                <Text style={stylDefault.span}>R$ <Text style={styl.preco}>{total_mes_atual}</Text></Text>
            </View>
            {this._renderLineHeader("", "Extrato por período")}
            <View style={styl.warpList}>
                <FlatList
                    ref="lista"
                    key="lista"
                    extraData={filtros}
                    data={filtros}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    keyExtractor={this._extract}
                    renderItem={this._renderFilter}
                />
            </View>
            <View style={styl.warpHeaderList}>
                <Text style={styl.headerTitle}>DATA E HORA</Text>
                <Text style={styl.headerTitle}>Nº DO PEDIDO</Text>
                <Text style={styl.headerTitle}>VALOR</Text>
            </View>
        </Fragment>
    }
}