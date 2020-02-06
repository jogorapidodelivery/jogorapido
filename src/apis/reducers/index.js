import { COLETA_LIMPAR, COLETA_CHECKIN, COLETA_ATUALIZAR_STATUS, COLETA_NOVA_TEMPO_EXPIRADO, COLETA_NOVA, ALTERAR_SENHA, AUTENTICAR, CHECAR_SIMBOLO_EMAIL, RECUPERAR_SENHA, CONECTAR, CRIAR_CONTA, CONECTAR_FACEBOOK} from '@constants/';
import {combineReducers} from 'redux';

import { encodeCipherCaesar } from "@sd/uteis/CipherCaesar";
import AsyncStorage from '@react-native-community/async-storage';
import { combineHandleActions } from '@sd/uteis/CreateActions';
import { menu } from "@apis/json/menu.json"
import { moeda } from "@sd/uteis/form/MaskString";
import { empty } from "@sd/uteis/StringUteis";
import moment from "moment";
const intervaloData = (start, end) => {
    const _dif = moment(start).diff(moment(end));
    return moment.duration(_dif).humanize();
}
const formatDateCheckIn = coleta => {
    let horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente;
    if (empty(coleta)) return { horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente}
    const { data_checkin_cliente, data_checkout_cliente, data_checkin_unidade, data_checkout_unidade } = coleta
    if (!empty(data_checkin_unidade)) {
        horaChegadaUnidade = moment(data_checkin_unidade).format("H:mm:ss")
    }
    if (!empty(data_checkout_unidade)) {
        horaSaidaUnidade = intervaloData(data_checkin_unidade, data_checkout_unidade)
    }
    if (!empty(data_checkin_cliente)) {
        horaChegadaCliente = moment(data_checkin_cliente).format("H:mm:ss")
    }
    if (!empty(data_checkout_cliente)) {
        horaSaidaCliente = intervaloData(data_checkin_cliente, data_checkout_cliente)
    }
    return { ...coleta, horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente }
}
export default combineReducers({
    autenticacao: combineHandleActions({
            [RECUPERAR_SENHA]: (state, _action) => {
                return state;
            },
            [CHECAR_SIMBOLO_EMAIL]: (state, _action) => {
                return state;
            },
            [[ALTERAR_SENHA, CONECTAR, AUTENTICAR]]: (state, {response, posted:{senha, usuario}}) => {
                AsyncStorage.setItem(AUTENTICAR, encodeCipherCaesar({ senha, usuario }));
                response.total_frete_semana = moeda(response.total_frete_semana, "");
                if (response.disponibilidade) {
                    response.disponibilidade = response.disponibilidade.map(v => {
                        v.horario = `${moment(v.hora_inicio, "H:mm:ss").format("H")}h ${moment(v.hora_fim, "H:mm:ss").format("H")}h`;
                        return v
                    })
                }
                if (response.coleta) {
                    if (response.coleta.valor_frete) {
                        response.coleta.valor_frete = moeda(response.coleta.valor_frete);
                        response.coleta.total_pedido = moeda(response.coleta.total_pedido);
                    }
                    response.coleta = formatDateCheckIn(response.coleta)
                    
                }
                return { ...state, ...response, usuario, senha};
            },
            [COLETA_CHECKIN]: (state, { response: { data }, posted: { coluna } }) => {
                state.coleta[coluna] = data;
                state.coleta = formatDateCheckIn(state.coleta)
                return { ...state, coleta: { ...state.coleta } };
            },
            [CRIAR_CONTA]: (state, _action) => {
                return state;
            },
            [CONECTAR_FACEBOOK]: (state, _action) => {
                return state;
            },
            [COLETA_LIMPAR]: (state) => {
                delete state.coleta;
                delete state.produtos;
                return {...state};
            },
            [COLETA_NOVA]: (state, { response}) => {
                if (response.coleta) {
                    if (response.coleta.valor_frete) {
                        response.coleta.valor_frete = moeda(response.coleta.valor_frete);
                        response.coleta.total_pedido = moeda(response.coleta.total_pedido);
                    }
                    response.coleta = formatDateCheckIn(response.coleta)
                }
                return { ...state, coleta:response};
            },
            [COLETA_NOVA_TEMPO_EXPIRADO]: (state) => {
                return { ...state, coleta: {} };
            },
            [COLETA_ATUALIZAR_STATUS]: (state, { response }) => {
                return { ...state, coleta: { ...response, ...state.coleta, status:"Confirmado"}};
            }
        },{}
    ),
    menu: combineHandleActions({}, menu)
});