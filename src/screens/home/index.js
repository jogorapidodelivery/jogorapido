import React, { PureComponent } from "react";
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
        this._updateColeta();
        AppState.addEventListener('change', this._updateOnline);
    }
    componentWillUnmount() {
        try{
            AppState.removeEventListener('change', this._updateOnline);
        } catch(e) {

        }
    }
    _updateOnline = (status) => {
        if (this.ativarBg && status === "active") {
            this._updateColeta();
        }
        this.ativarBg = true;
    }
    _updateColeta = (onComplete) => {
        actionAutenticar().then(({ response }) => {
            const coleta_id = getItemByKeys(response || {}, "coleta.coleta_id")
            if (!empty(coleta_id)) {
                response.acao = "nova_coleta";
                SharedEventEmitter.emit('onMessage', new RemoteMessage({ data: response.coleta }));
                if (onComplete) onComplete();
            } else {
                if (onComplete) onComplete();
            }
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
        return <BaseScreen
            onRefresh={this._updateColeta}
            navigation={navigation}
            header={<HeaderLogo navigation={navigation} />}
            headerHeight={HeaderLogo.heightContainer}
        >
            {status === "Pendente" && <ColetaPendente
                {...this.props.sd.coleta}
                navigation={navigation}
            />}
            {status !== "Pendente" && <MinhaEscala navigation={navigation} disponibilidade={disponibilidade}/>}
            {status !== "Pendente" && <MeusRendimentos corridas_semana={corridas_semana} total_frete_semana={total_frete_semana} navigation={navigation} disponibilidade={disponibilidade}/>}
        </BaseScreen>
    }
}