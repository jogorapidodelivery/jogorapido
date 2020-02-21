import React, { PureComponent, Fragment } from "react";
import { Text, FlatList } from "react-native";
import Button from "@sd/components/button";
import { View as AnimatableView, Text as AnimatableText } from "react-native-animatable";
import BaseScreen from "@screens/partial/base";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
import MinhaEscalaItem from "@screens/disponibilidade/partial/index";
import { empty } from "@sd/uteis/StringUteis";
import MenuItem from "./partial/menuItem/index";

export default class Disponibilidade extends PureComponent {
    static mapStateToProps = ["disponibilidade"];
    constructor(props){
        super(props);
    }
    _renderScale = ({ item: { icone, cor, data, disponibilidade, horario }, index }) => {
        console.log(100, index, 100 * index)
        return <MinhaEscalaItem {...{ icone, cor, disponibilidade, horario, delay: (100 * index), actived: !empty(data) }} />
    }
    _renderDay = ({ item, index}) => {
        const { sd: { disponibilidade: { diaSelecionado } } } = this.props;
        return <MenuItem {...item} index={index} selected={diaSelecionado === index}/>
    }
    _extract = (_item, index) => {
        const { sd: { disponibilidade: { diaSelecionado } } } = this.props;
        return `index-${index}-${diaSelecionado}`;
    }
    _renderHeader = () => {
        const { sd: { disponibilidade: { semana, diaSelecionado } } } = this.props;
        const { dia } = semana[diaSelecionado];
        console.log({ action: "_renderHeader", diaSelecionado })
        return <Fragment>
            <AnimatableView animation="flipInX" useNativeDriver={true}>
                <FlatList
                    extraData={diaSelecionado}
                    data={semana}
                    numColumns={7}
                    keyExtractor={this._extract}
                    renderItem={this._renderDay}
                />
            </AnimatableView>
            <AnimatableText animation="fadeIn" useNativeDriver={true} delay={50} style={[stylDefault.p, styl.dia]}>Escala de todas as {dia}</AnimatableText>
        </Fragment>
    }
    _renderFooter = () => {
        return <Fragment>
            <AnimatableText animation="fadeIn" useNativeDriver={true} delay={150} style={[stylDefault.p, styl.info]}>Após marcar sua disponibilidade,{"\n"}as alterações só ocorrerão <Text style={stylDefault.bold}>24 horas</Text>{"\n"}após a atualização.</AnimatableText>
            <AnimatableView animation="flipInX" useNativeDriver={true} delay={250} >
                <Button
                    style={styl.btnDisponibilizar}
                    text={{
                        value: "Salvar",
                        color: "07"
                    }}
                    rightIcon={{
                        value: "",
                        color: "07"
                    }}
                    onPress={this._submit}
                    bg="14"
                />
            </AnimatableView>
        </Fragment>
    }
    render() {
        const { sd: { disponibilidade: { semana, diaSelecionado}} } = this.props;
        const { data } = semana[diaSelecionado];
        return <BaseScreen
            style={styl.container}
            tituloBold="MINHA"
            navigation={this.props.navigation}
            titulo="DISPONIBILIDADE"
        >
            <AnimatableText animation="flipInX" useNativeDriver={true} style={[stylDefault.p, styl.p]}>Clique no dia da semana e marque a{"\n"}<Text style={stylDefault.bold}>escala</Text> que deseja estar disponível.</AnimatableText>
            <AnimatableText animation="fadeIn" useNativeDriver={true} delay={50} style={[stylDefault.span, styl.span]}>Repita esta ação para todos os dias{"\n"}da semana e clique em salvar</AnimatableText>
            <FlatList
                extraData={diaSelecionado}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
                showsVerticalScrollIndicator={false}
                data={data}
                numColumns={2}
                style={styl.warpItems}
                contentContainerStyle={styl.warpItems}
                keyExtractor={this._extract}
                renderItem={this._renderScale}
            />
        </BaseScreen>
    }
}