import React, { Component } from "react";
import { FlatList, View, Text } from "react-native";
import BaseScreen from "@screens/partial/base";
import styl from "./styl";
import Header from "./partial/header/index";
import Footer from "./partial/footer/index";
import Item from "./partial/item/index";
import { buscarExtrato } from "@actions/extrato";
export default class Disponibilidade extends Component {
    static mapStateToProps = ["extrato", "extrato.filtros", "autenticacao.entregador_id"];
    status_periodo = 1;
    constructor(props){
        super(props);
        this.load = this.load.bind(this)
        this.state = {
            loading:true
        }
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount(){
        this.refresh(()=> {
            // ?
        })
    }
    refresh(_resolve){
        this.load(_resolve, this.status_periodo);
    }
    load(_resolve, status_periodo){
        this.status_periodo = status_periodo;
        const { sd:{entregador_id}, navigation:{push} } = this.props;
        if (!this.state.loading) this.setState({loading:true});
        buscarExtrato({
            body_post: {
                status_periodo,
                entregador_id
            }
        }).then(() => {
            this.setState({ loading: false }, _resolve);
        }).catch(({ mensagem }) => {
            this.setState({ loading: false }, _resolve);
            push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem
                }
            })
        })
    }
    componentWillUnmount(){
        
    }

    _renderCorrida = ({ item}) => <Item {...item}/>
    _extract = (_item, index) => `index-${index}`;
    render() {
        const { loading} = this.state;
        const { navigation, sd: { entregador_id, filtros, extrato: { extrato, mes_atual, totalPeriodo, total_mes_atual}}} = this.props;
        let data = loading ? [undefined, undefined, undefined] : extrato
        return <BaseScreen
            style={styl.container}
            tituloBold="MINHAS"
            onRefresh={this.refresh}
            navigation={this.props.navigation}
            titulo="CORRIDAS"
        >
            <FlatList
                ListHeaderComponent={<Header {...{ load: this.load, navigation, filtros, entregador_id, mes_atual, total_mes_atual }}/>}
                ListFooterComponent={!loading && <Footer totalPeriodo={totalPeriodo}/>}
                ListEmptyComponent={<View style={styl.warpEmpty}>
                    <Text style={styl.textEmpty}>Nenhuma atividade{"\n"}registrada neste periodo</Text>
                </View>}
                showsVerticalScrollIndicator={false}
                data={data}
                keyExtractor={this._extract}
                renderItem={this._renderCorrida}
            />
        </BaseScreen>
    }
}