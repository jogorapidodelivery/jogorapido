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
import { actionAutenticar } from "@actions/";
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
    }
    
    get renderHeaderFix() {
        const data_checkout_cliente = getItemByKeys(this.props, "sd.coleta.data_checkout_cliente")
        if (!empty(data_checkout_cliente)) {
            return <AlertTipoToast titulo="Meus parabéns, você finalizou sua entrega. Aguarde que em breve tem mais."/>
        }
        return undefined;
    }
    _updateColeta = (onComplete) => {
        actionAutenticar().then((_r) => {
            console.log(_r);
            this.componentDidMount();
            onComplete();
        }).catch(() => {
            console.log("Falha ao atualizar os dados da coleta")
            onComplete();
        });
        
    }
    render() {
        const {navigation} = this.props;
        const status = getItemByKeys(this.props, "sd.coleta.status")
        // const tempo_aceite = getItemByKeys(this.props, "sd.tempo_aceite")
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
            <MinhaEscala navigation={navigation} disponibilidade={disponibilidade}/>
            <MeusRendimentos corridas_semana={corridas_semana} total_frete_semana={total_frete_semana} navigation={navigation} disponibilidade={disponibilidade}/>
        </BaseScreen>
    }
}