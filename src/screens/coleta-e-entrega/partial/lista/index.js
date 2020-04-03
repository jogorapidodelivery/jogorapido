import React, { Component, Fragment } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
import { cor } from "@root/app.json";
import { moeda } from "@sd/uteis/form/MaskString";
import { toNumber } from "@sd/uteis/NumberUteis";
import { empty } from "@sd/uteis/StringUteis";

const icDeactive = "";
const icActive = "";
export default class Lista extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: props.data || []
        }
    }
    _press = ({ index}) => {
        const {data} = this.state;
        data[index].actived = !(data[index].actived === undefined ? false : data[index].actived);
        this.componentDidMount();
    }
    componentDidMount() {
        const { onPress } = this.props;
        if (onPress) {
            const { data } = this.state;
            const selecteds = data.filter(({ actived }) => actived).length;
            const totalLista = data.length
            this.state.data = data;
            onPress({ actived: selecteds === totalLista, badge: `${selecteds}/${totalLista}` })
        }
    }
    // ?
    _renderConteudo = ({ titulo, textOrMoney, textSub, colorTextOrMoney, actived }, index) => {
        const totalLista = this.state.data.length - 1;
        const { onPress } = this.props;
        const _tmoStyl = index === 0 ? styl.radiusTopLeft : (index === totalLista ? styl.radiusBottomLeft : {})
        return <View style={[styl.groupItem, _tmoStyl]}>
            {onPress && <Text
                style={[stylDefault.icon, styl.icon, {color:actived ? cor["08"] : cor["05"]}]}
            >
                {actived ? icActive : icDeactive}
            </Text>}
            <View style={styl.warpItem}>
                {titulo && <Text style={[stylDefault.p, styl.nome]}>{titulo}</Text>}
                <View style={styl.warpUniPreco}>
                    <Text style={[stylDefault.p, styl.strong, titulo ? {} : {color:cor["08"]}]}>{textSub}</Text>
                    <Text style={[stylDefault.p, styl.valor, (colorTextOrMoney ? { color: cor[colorTextOrMoney]} : {})]}> {textOrMoney}</Text>
                </View>
            </View>
        </View>
    }
    _renderWarpView = ({ item, index}) => {
        return <View style={styl.btn}>
            {this._renderConteudo(item, index)}
        </View>
        
    }
    _renderWarpLink = ({ item, index }) => {
        return <TouchableOpacity onPress={this._press.bind(this, { index })} style={styl.btn}>
            {this._renderConteudo(item, index)}
        </TouchableOpacity>
    }
    _extract = (_item, index) => {
        return index.toString()
    }
    _renderFooter = () => {
        let total = this.props.total
        if (empty(total)) {
            total = this.state.data.reduce((accumulator, { textOrMoney, actived }) => {
                const add = actived ? toNumber(textOrMoney) : 0;
                return accumulator + add
            }, 0);
            if (total === 0) return <Fragment />
            total = moeda(total);
        }
        return <View style={styl.warpTotal}>
            <Text style={stylDefault.p}>Total <Text style={stylDefault.bold}>{total}</Text></Text>
        </View>
    }
    render() {
        const { data} = this.state;
        const { onPress, titulo } = this.props;
        const action = onPress ? this._renderWarpLink : this._renderWarpView;
        return <FlatList
            ListHeaderComponent={() => <Text style={[stylDefault.h1, styl.h1]}>{titulo}</Text>}
            showsVerticalScrollIndicator={false}
            data={data}
            keyExtractor={this._extract}
            renderItem={action}
            ListFooterComponent={this._renderFooter}
        />
    }
}