import React, { PureComponent, Fragment } from "react";
import { AppState } from "react-native"
import HeaderLogo from "@screens/partial/header-logo";
import BaseScreen from "@screens/partial/base";
import ColetaPendente from "./partial/coleta-pendente";
import MinhaEscala from "./partial/minha-escala";
import MeusRendimentos from "./partial/meus-rendimentos";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { actionAutenticar } from "@actions/";
import { dispatchNotifierOnResultGeofenceHttp } from "@libs/geofence";
import { _addressOpenMapsDefaultProps } from "@screens/coleta-e-entrega/partial/rota/index";
import { triggerDestroyTimerProgress } from "@libs/dispatchNotify";

export default class Home extends PureComponent {
    static mapStateToProps = [ "autenticacao" ]
    static mapTransformProps = ({ autenticacao: { total_frete_semana, corridas_semana, disponibilidade, tempo_aceite, usuario_id, coleta } }) => {
        let coleta_ids = [];
        let tituloColetas = "";
        const getItem = ({ coleta_id, cliente: titulo, latitude_cliente: latitude, longitude_cliente: longitude }) => {
            coleta_ids.push(coleta_id);
            return {
                titulo,
                mapa: {
                    latitude,
                    longitude,
                    ..._addressOpenMapsDefaultProps
                }
            }
        }
        let coletaFilter = [];
        const total = coleta.length;
        if (total > 0) {
            const { unidade: titulo, latitude_unidade: latitude, longitude_unidade: longitude } = coleta[0];
            const unidade = {
                titulo,
                mapa: {
                    latitude,
                    longitude,
                    ..._addressOpenMapsDefaultProps
                }
            }
            coletaFilter = [].concat(coleta).map(getItem);
            coletaFilter.unshift(unidade);
            tituloColetas = (total === 1 ? "Coleta pendente " : "Coletas pendentes ");
            const clone = [].concat(coleta_ids);
            const _id = clone.pop();
            if (clone.length > 0) {
                tituloColetas += clone.join(", ");
                tituloColetas += " e " + _id;
            } else {
                tituloColetas += _id;
            }
        }
        return { coleta_ids, tituloColetas, total_frete_semana, corridas_semana, disponibilidade, tempo_aceite, usuario_id, coleta, coletaFilter };
    }
    constructor(props) {
        super(props)
    }
    ativarBg = false;
    componentDidMount() {
        this.ativarBg = false;
        dispatchNotifierOnResultGeofenceHttp(this.props.sd);
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
        triggerDestroyTimerProgress()
        this.ativarBg = true;
    }

    _updateColeta = (onComplete) => {
        actionAutenticar().then(({response}) => {
            dispatchNotifierOnResultGeofenceHttp(response);
            if (onComplete) onComplete()
        }).catch(_err => {
            console.log(_err);
            if (onComplete) {
                this.props.navigation.push("alerta", {
                    params: {
                        titulo: "JogoRápido",
                        mensagem: getItemByKeys(_err, "mensagem", "Falha ao atualizar o usuário")
                    }
                })
                onComplete();
            }
        });       
    }
    
    render() {
        const { navigation, sd: { coletaFilter, coleta_ids, tituloColetas}} = this.props;
        const total = coletaFilter.length;
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
                {total >= 1 && <ColetaPendente
                    coleta={coletaFilter}
                    tituloColetas={tituloColetas} 
                    coleta_ids={coleta_ids}
                    navigation={navigation}
                />}
                {total === 0 && <MinhaEscala navigation={navigation} usuario_id={usuario_id} disponibilidade={disponibilidade}/>}
                {total === 0 && <MeusRendimentos usuario_id={usuario_id} corridas_semana={corridas_semana} total_frete_semana={total_frete_semana} navigation={navigation} disponibilidade={disponibilidade}/>}
            </Fragment>
        </BaseScreen>
    }
}