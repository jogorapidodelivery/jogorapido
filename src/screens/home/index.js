import React, { PureComponent } from "react";
import { LayoutAnimation} from "react-native";
import { GrupoRotas } from "@sd/navigation/revestir";
import HeaderLogo from "@screens/partial/header-logo";
import BaseScreen from "@screens/partial/base";
import ColetaPendente from "./partial/coleta-pendente";
import MinhaEscala from "./partial/minha-escala";
import MeusRendimentos from "./partial/meus-rendimentos";
import { COLETA_LIMPAR } from "@constants/";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { empty } from "@sd/uteis/StringUteis";
import AlertTipoToast from "@src/components/alert-toast";
import { actionAutenticar, actionColetaAtualizar } from "@actions/";
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
    intervalAlert = undefined
    componentWillUnmount() {
        if (this.intervalAlert === undefined) clearTimeout(this.intervalAlert)
    }
    componentDidMount() {
        const data_checkout_cliente = getItemByKeys(this.props, "sd.coleta.data_checkout_cliente");
        if (!empty(data_checkout_cliente)) {
            this.intervalAlert = setTimeout(() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                GrupoRotas.store.dispatch({ type:COLETA_LIMPAR });
            }, 5000);
        }
        this._updateColeta();
    }
    
    get renderHeaderFix() {
        const data_checkout_cliente = getItemByKeys(this.props, "sd.coleta.data_checkout_cliente")
        if (!empty(data_checkout_cliente)) {
            return <AlertTipoToast titulo="Meus parabéns, você finalizou sua entrega. Aguarde que em breve tem mais."/>
        }
        return undefined;
    }
    _updateColeta = (onComplete) => {
        const { sd: { usuario_id} } = this.props;
        actionColetaAtualizar({
            body_rsa: {
                usuario_id
            }
        }).then(({response}) => {
            const coleta_id = getItemByKeys(response || {}, "coleta_id")
            if (!empty(coleta_id)) {
                response.acao = "nova_coleta";
                SharedEventEmitter.emit('onMessage', new RemoteMessage({ data: response }));
                if (onComplete) onComplete();
            } else if (onComplete) onComplete();
        }).catch(({mensagem}) => {
            if (onComplete) onComplete();
        })        
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
            headerFix={this.renderHeaderFix}
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