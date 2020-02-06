import React, { Component } from "react";
import { LayoutAnimation } from "react-native";
import { GrupoRotas } from "@sd/navigation/revestir";
import HeaderLogo from "@screens/partial/header-logo";
import BaseScreen from "@screens/partial/base";
import ColetaPendente from "./partial/coleta-pendente";
import MinhaEscala from "./partial/minha-escala";
import MeusRendimentos from "./partial/meus-rendimentos";
import ColetaPendenteProgressHeader from "./partial/coleta-pendente/partial/progress-header";
import { COLETA_NOVA_TEMPO_EXPIRADO, COLETA_LIMPAR } from "@constants/";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { empty } from "@sd/uteis/StringUteis";
import AlertTipoToast from "@src/components/alert-toast";
export default class Home extends Component {
    static mapStateToProps = [
        "autenticacao.usuario_id",
        "autenticacao.coleta",
        "autenticacao.tempo_aceite",
        "autenticacao.disponibilidade",
        "autenticacao.corridas_semana",
        "autenticacao.total_frete_semana"
    ]
    constructor(props) {
        super(props)
        this.intervalTimer = undefined;
        this.currentTimer = 0;
        this.state = {
            progresso:undefined
        }
    }
    intervalAlert = undefined
    componentWillUnmount() {
        if (this.intervalAlert === undefined) clearTimeout(this.intervalAlert)
        this.destroy()
    }
    componentDidMount() {
        const data_checkout_cliente = getItemByKeys(this.props, "sd.coleta.data_checkout_cliente");
        if (!empty(data_checkout_cliente)) {
            this.intervalAlert = setTimeout(() => {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                GrupoRotas.store.dispatch({ type:COLETA_LIMPAR });
            }, 3000);
        }
    }
    destroy = () => {
        if (this.intervalTimer) clearInterval(this.intervalTimer)
    }
    play() {
        this.destroy();
        let { sd: { tempo_aceite } } = this.props;
        this.intervalTimer = setInterval(() => {
            let {progresso} = this.state
            if (progresso === undefined) progresso = 0;
            progresso++;
            if (progresso >= tempo_aceite) {
                clearInterval(this.intervalTimer)
            }
            if (progresso === tempo_aceite) {
                // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
                GrupoRotas.store.dispatch({ type: COLETA_NOVA_TEMPO_EXPIRADO });
            }
            if (progresso <= tempo_aceite) {
                this.state.progresso = progresso;
                // console.log({progresso});
                this.setState({ progresso })
            }
        }, 1000);
    }
    pause(){
        this.destroy();
    }
    reset(){
        this.state.progresso = 0;
        this.play();
    }
    get renderHeaderFix() {
        const status = getItemByKeys(this.props, "sd.coleta.status")
        const data_checkout_cliente = getItemByKeys(this.props, "sd.coleta.data_checkout_cliente")
        if (status === "Pendente") {
            const tempo_aceite = getItemByKeys(this.props, "sd.tempo_aceite")
            const { progresso } = this.state
            return <ColetaPendenteProgressHeader tempoRestante={tempo_aceite - progresso} />
        }
        if (!empty(data_checkout_cliente)) {
            return <AlertTipoToast titulo="Meus parabéns, você finalizou sua entrega. Aguarde que em breve tem mais."/>
        }
        return undefined;
    }
    render() {
        const {navigation} = this.props;
        const status = getItemByKeys(this.props, "sd.coleta.status")
        const tempo_aceite = getItemByKeys(this.props, "sd.tempo_aceite")
        const disponibilidade = getItemByKeys(this.props, "sd.disponibilidade")
        const corridas_semana = getItemByKeys(this.props, "sd.corridas_semana")
        const total_frete_semana = getItemByKeys(this.props, "sd.total_frete_semana")
        const { progresso} = this.state
        return <BaseScreen
            navigation={navigation}
            headerFix={this.renderHeaderFix}
            header={<HeaderLogo navigation={navigation} />}
            headerHeight={HeaderLogo.heightContainer}
        >
            {status === "Pendente" && <ColetaPendente
                {...this.props.sd.coleta}
                progresso={tempo_aceite ? progresso / tempo_aceite : 0}
                segundos={progresso}
                play={this.play.bind(this)}
                pause={this.pause.bind(this)}
                reset={this.reset.bind(this)}
                navigation={navigation}
            />}
            <MinhaEscala navigation={navigation} disponibilidade={disponibilidade}/>
            <MeusRendimentos corridas_semana={corridas_semana} total_frete_semana={total_frete_semana} navigation={navigation} disponibilidade={disponibilidade}/>
        </BaseScreen>
    }
}