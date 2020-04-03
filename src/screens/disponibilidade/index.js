import React, { PureComponent, Fragment } from "react";
import { Text, FlatList, View } from "react-native";
import Button from "@sd/components/button";
import { View as AnimatableView, Text as AnimatableText } from "react-native-animatable";
import BaseScreen from "@screens/partial/base";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
import MinhaEscalaItem from "@screens/disponibilidade/partial/index";
import Shimmer from "react-native-shimmer-placeholder";
import { empty } from "@sd/uteis/StringUteis";
import MenuItem from "./partial/menuItem/index";
import { toogleSelectDisponibilidade, toogleTabDisponibilidade, salvarDisponibilidade } from "@actions/disponibilidade";
import { cor as corApp } from "@root/app.json";
import { GrupoRotas } from "@sd/navigation/revestir";
import { buscarDisponibilidade } from "@actions/disponibilidade";
export default class Disponibilidade extends PureComponent {
    static mapStateToProps = [
        "autenticacao.disponibilidade",
        "disponibilidade.semana",
        "disponibilidade.diaSelecionado",
        "disponibilidade.itemsSelecionados",
        "autenticacao.usuario_id"
    ];
    static mapTransformProps = sd => {
        if (sd.semana === undefined) {
            const i = { sigla: "", dia: "", data: [{}, {}, {}, {}] }
            return {
                disponibilidade: sd.disponibilidade,
                semana: [i,i,i,i,i,i,i],
                diaSelecionado: 0,
                itemsSelecionados: undefined,
                usuario_id: sd.usuario_id,
            }
        } else {
            return sd;
        }
    }
    load(_resolve) {
        const { navigation: { push }, sd:{usuario_id, disponibilidade} } = this.props;
        buscarDisponibilidade({
            body_view:{
                disponibilidade
            },
            body_post:{
                usuario_id
            }
        }).then(_resolve).catch(({mensagem}) => {
            _resolve();
            push("alerta", {
                params: {
                    titulo: "JogoRápido",
                    mensagem
                }
            })
        })
    }
    activedDelay = true;
    constructor(props){
        super(props);
        this.load = this.load.bind(this);
        this.load(() => {
            // ?
        });
    }
    _toogleHorario = data => {
        this.activedDelay = false
        toogleSelectDisponibilidade(data);
    }
    _renderScale = ({ item, index }) => {
        if (item.horario === undefined) {
            return <Shimmer colorShimmer={corApp["27"]} style={styl.loader} autoRun={true} visible={false}></Shimmer>
        }
        const { icone, cor, data, disponibilidade, horario } = item;
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
    componentWillUnmount() {
        const state = GrupoRotas.store.getState();
        state.disponibilidade = {};
    }
    _toogleDay = data => {
        this.activedDelay = true;
        toogleTabDisponibilidade(data);
    }
    _renderDay = ({ item, index}) => {
        const { sd: { diaSelecionado} } = this.props;
        return <MenuItem onPress={this._toogleDay} {...item} index={index} selected={diaSelecionado === index}/>
    }
    _submit = () => {
        const { navigation: { push, popToTop }, sd: { usuario_id, semana } } = this.props;
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
                    titulo: "JogoRápido",
                    mensagem:"Disponibilidade atualizada com sucesso. Lembre-se elas só terão efeito após 24 horas.",
                    onPress: popToTop
                }
            })
        }).catch(({mensagem}) => {
            push("alerta", { params: { titulo: "JogoRápido", mensagem } })
        })
    }
    _extractHorario = ({data}, index) => {
        const { sd: { diaSelecionado } } = this.props;
        return `index-${index}-${diaSelecionado || "0"}-${data || "0"}`;
    }
    _extractHeader = (item, index) => {
        const { sd: { diaSelecionado } } = this.props;
        return `index-${index}-${diaSelecionado || "0"}`;
    }
    _renderHeader = () => {
        const { sd: { semana, diaSelecionado } } = this.props;
        const { dia } = semana[diaSelecionado];
        return <Fragment>
            <AnimatableView animation="flipInX" useNativeDriver={true}>
                <FlatList
                    extraData={diaSelecionado || 0}
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
        const loaded = this.props.sd.semana[0].sigla !== "";
        return <Fragment>
            <AnimatableText animation="fadeIn" useNativeDriver={true} delay={150} style={[stylDefault.p, styl.info]}>Após marcar sua disponibilidade,{"\n"}as alterações só ocorrerão após<Text style={stylDefault.bold}>{"\n"}24 horas.</Text></AnimatableText>
            <AnimatableView animation="flipInX" useNativeDriver={true} delay={250} >
                <Shimmer colorShimmer={corApp["27"]} width={400} style={styl.warpBtn} autoRun={true} visible={loaded}>
                    <Button
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
                </Shimmer>
            </AnimatableView>
        </Fragment>
    }
    render() {
        const { sd: { semana, diaSelecionado, itemsSelecionados } } = this.props;
        const { data } = semana[diaSelecionado];
        console.log(JSON.stringify({ semana, diaSelecionado, itemsSelecionados }));
        return <BaseScreen
            style={styl.container}
            tituloBold="MINHA"
            onRefresh={this.load}
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