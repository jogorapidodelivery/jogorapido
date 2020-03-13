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
import { toogleSelectDisponibilidade, toogleTabDisponibilidade, salvarDisponibilidade } from "@actions/disponibilidade";

export default class Disponibilidade extends PureComponent {
    static mapStateToProps = ["disponibilidade", "autenticacao.usuario_id"];
    activedDelay = true;
    constructor(props){
        super(props);
    }
    _toogleHorario = data => {
        this.activedDelay = false
        toogleSelectDisponibilidade(data);
    }
    _renderScale = ({ item: { icone, cor, data, disponibilidade, horario }, index }) => {
        const props = {
            index,
            icone,
            cor,
            disponibilidade,
            horario,
            delay: 100 * index,
            hasDelay: this.activedDelay,
            actived: !empty(data)
        }
        return <MinhaEscalaItem onPress={this._toogleHorario} {...props } />
    }
    _toogleDay = data => {
        this.activedDelay = true;
        toogleTabDisponibilidade(data);
    }
    _renderDay = ({ item, index}) => {
        const { sd: { disponibilidade: { diaSelecionado } } } = this.props;
        return <MenuItem onPress={this._toogleDay} {...item} index={index} selected={diaSelecionado === index}/>
    }
    _submit = () => {
        const { navigation: { push, popToTop }, sd: { usuario_id, disponibilidade: { semana } } } = this.props;
        const disponibilidade = Array.prototype.concat(...semana.map(({data}, key) => {
            return data.filter(({ data }) => data !== null).map(({ disponibilidade_id }) => ({ dia_semana: key.toString(), disponibilidade_id: disponibilidade_id.toString() }));
        }).filter(v => v.length > 0));
        salvarDisponibilidade({
            body_post:{
                disponibilidade
            },
            body_rsa:{
                usuario_id
            }
        }).then(() => {
            push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem:"Disponibilidade atualizada com sucesso. Lembre-se elas só terão efeito após 24 horas.",
                    onPress: popToTop
                }
            })
        }).catch(({mensagem}) => {
            push("alerta", { params: { titulo: "Jogo Rápido", mensagem } })
        })
    }
    _extractHorario = ({data}, index) => {
        const { sd: { disponibilidade: { diaSelecionado } } } = this.props;
        return `index-${index}-${diaSelecionado}-${data || "?"}`;
    }
    _extractHeader = (item, index) => {
        const { sd: { disponibilidade: { diaSelecionado } } } = this.props;
        return `index-${index}-${diaSelecionado}`;
    }
    _renderHeader = () => {
        const { sd: { disponibilidade: { semana, diaSelecionado } } } = this.props;
        const { dia } = semana[diaSelecionado];
        return <Fragment>
            <AnimatableView animation="flipInX" useNativeDriver={true}>
                <FlatList
                    extraData={diaSelecionado}
                    data={semana}
                    numColumns={7}
                    keyExtractor={this._extractHeader}
                    renderItem={this._renderDay}
                />
            </AnimatableView>
            <AnimatableText animation="fadeIn" useNativeDriver={true} delay={50} style={[stylDefault.p, styl.dia]}>Escala de todas as {dia}</AnimatableText>
        </Fragment>
    }
    _renderFooter = () => {
        return <Fragment>
            <AnimatableText animation="fadeIn" useNativeDriver={true} delay={150} style={[stylDefault.p, styl.info]}>Após marcar sua disponibilidade,{"\n"}as alterações só ocorrerão após<Text style={stylDefault.bold}>{"\n"}24 horas.</Text></AnimatableText>
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
        const { sd: { disponibilidade: { semana, diaSelecionado, itemsSelecionados}} } = this.props;
        const { data } = semana[diaSelecionado];
        console.log({ diaSelecionado, data})
        return <BaseScreen
            style={styl.container}
            tituloBold="MINHA"
            navigation={this.props.navigation}
            titulo="DISPONIBILIDADE"
        >
            <AnimatableText animation="flipInX" useNativeDriver={true} style={[stylDefault.p, styl.p]}>Clique no dia da semana e marque a{"\n"}<Text style={stylDefault.bold}>escala</Text> que deseja estar disponível.</AnimatableText>
            <AnimatableText animation="fadeIn" useNativeDriver={true} delay={50} style={[stylDefault.span, styl.span]}>Repita esta ação para todos os dias{"\n"}da semana e clique em salvar</AnimatableText>
            <FlatList
                extraData={itemsSelecionados}
                ListHeaderComponent={this._renderHeader}
                ListFooterComponent={this._renderFooter}
                showsVerticalScrollIndicator={false}
                data={data}
                numColumns={2}
                style={styl.warpItems}
                contentContainerStyle={styl.warpItems}
                keyExtractor={this._extractHorario}
                renderItem={this._renderScale}
            />
        </BaseScreen>
    }
}