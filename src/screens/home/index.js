import React, { PureComponent, Fragment } from "react";
import { AppState } from "react-native"
import HeaderLogo from "@screens/partial/header-logo";
import BaseScreen from "@screens/partial/base";
import ColetaPendente from "./partial/coleta-pendente";
import MinhaEscala from "./partial/minha-escala";
import MeusRendimentos from "./partial/meus-rendimentos";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { empty } from "@sd/uteis/StringUteis";
import { actionAutenticar } from "@actions/";
import RemoteMessage from "react-native-firebase/dist/modules/messaging/RemoteMessage";
import { SharedEventEmitter } from "react-native-firebase/dist/utils/events";

export default class Home extends PureComponent {
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
    }
    ativarBg = false;
    componentDidMount() {
        this.ativarBg = false;
        this._triggerNotify(this.props.sd.coleta);
        AppState.addEventListener('change', this._updateOnline);
    }
    componentWillUnmount() {
        try{
            AppState.removeEventListener('change', this._updateOnline);
        } catch(e) {

        }
    }
    _triggerNotify = (coleta, onComplete = undefined) => {
        if (!empty(coleta) && !empty(coleta.coleta_id)) {
            coleta.acao = "nova_coleta";
            console.log("DISPAROU A NOTIFICAÇÃO NO REFRESH DA HOME")
            SharedEventEmitter.emit('onMessage', new RemoteMessage({ data: coleta }));
            if (onComplete) onComplete();
        } else {
            if (onComplete) onComplete();
        }
    }
    _updateOnline = (status) => {
        if (this.ativarBg && status === "active") {
            this._updateColeta();
        }
        this.ativarBg = true;
    }
    _updateColeta = (onComplete) => {
        actionAutenticar().then(({response}) => {
            this._triggerNotify(response.coleta, onComplete);
        }).catch(({ mensagem}) => {
            if (onComplete) {
                this.props.navigation.push("alerta", {
                    params: {
                        titulo: "Jogo Rápido",
                        mensagem
                    }
                })
                onComplete();
            }
        });       
    }
    render() {
        const {navigation} = this.props;
        const status = getItemByKeys(this.props, "sd.coleta.status")
        const disponibilidade = getItemByKeys(this.props, "sd.disponibilidade")
        const corridas_semana = getItemByKeys(this.props, "sd.corridas_semana")
        const total_frete_semana = getItemByKeys(this.props, "sd.total_frete_semana")
        const { usuario_id} = this.props.sd;
        return <BaseScreen
            onRefresh={this._updateColeta}
            navigation={navigation}
            header={<HeaderLogo navigation={navigation} />}
            headerHeight={HeaderLogo.heightContainer}
        >
            <Fragment>
                {status === "Pendente" && <ColetaPendente
                    {...this.props.sd.coleta}
                    navigation={navigation}
                />}
                {status !== "Pendente" && <MinhaEscala navigation={navigation} usuario_id={usuario_id} disponibilidade={disponibilidade}/>}
                {status !== "Pendente" && <MeusRendimentos usuario_id={usuario_id} corridas_semana={corridas_semana} total_frete_semana={total_frete_semana} navigation={navigation} disponibilidade={disponibilidade}/>}
            </Fragment>
        </BaseScreen>
    }
}