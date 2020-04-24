
import { formatDateCheckIn } from "../commands/coleta";
import { COLETA_CHECKOUT_UNIDADE, COLETA_CHECKIN_UNIDADE, COLETA_CHECKOUT_CLIENTE, COLETA_BUSCAR_PRODUTOS, COLETA_ATUALIZAR_STATUS, COLETA_NOVA_TEMPO_EXPIRADO, COLETA_NOVA, COLETA_CHECKIN } from "@constants/";
import { empty } from "sd/uteis/StringUteis";
export default {
    defaultProps: {
        coleta: []
    },
    reducers: {
        autenticacao:{
            [COLETA_CHECKIN]: (state, { response: { data }, posted: { coluna, index } }) => {
                state.coleta[index][coluna] = data;
                return { ...state};
            },
            [COLETA_CHECKOUT_UNIDADE]: (state, { response: { data }, posted: { coluna, index } }) => {
                state.coleta[index][coluna] = data;
                state.lastedCheckoutUnidade = state.coleta.filter(({ data_checkout_unidade }) => empty(data_checkout_unidade)).length;
                return { ...state};
            },
            [COLETA_CHECKIN_UNIDADE]: (state, { response: { data }, posted: { coluna } }) => {
                state.coleta = state.coleta.map((v) => {
                    v[coluna] = data;
                    return v;
                });
                return { ...state};
            },
            [COLETA_CHECKOUT_CLIENTE]: (state, { response: { data }, posted: { coluna, index } }) => {
                return state;
            },
            [COLETA_BUSCAR_PRODUTOS]: (state, { response: { produtos}, posted}) => {
                return { ...state, produtos};
            },
            [COLETA_NOVA]: (state, {coleta}) => {
                const data = formatDateCheckIn(coleta);
                return { ...state, ...data };
            },
            [COLETA_NOVA_TEMPO_EXPIRADO]: (state) => {
                return { ...state, coleta: [], produtos:[] };
            },
            [COLETA_ATUALIZAR_STATUS]: (state) => {
                state.coleta = state.coleta.map((v) => {
                    v.status_coleta_id = 2;
                    return v;
                });
                return { ...state};
            }
        }
    }
}