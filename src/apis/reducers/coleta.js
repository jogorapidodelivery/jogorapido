
import { formatDateCheckIn } from "../commands/coleta";
import { COLETA_BUSCAR_PRODUTOS, COLETA_ATUALIZAR_STATUS, COLETA_NOVA_TEMPO_EXPIRADO, COLETA_NOVA, COLETA_CHECKIN, COLETA_LIMPAR } from "@constants/";
import { moeda } from "@sd/uteis/form/MaskString";
export default {
    defaultProps: {
        coleta: "nome"
    },
    reducers: {
        autenticacao:{
            [COLETA_CHECKIN]: (state, { response: { data }, posted: { coluna } }) => {
                state.coleta[coluna] = data;
                return { ...state};
            },
            [COLETA_BUSCAR_PRODUTOS]: (state, { response: { produtos}, posted}) => {
                return { ...state, produtos};
            },
            [COLETA_LIMPAR]: (state) => {
                delete state.coleta;
                delete state.produtos;
                return { ...state };
            },
            [COLETA_NOVA]: (state, { response: coleta }) => {
                if (coleta) {
                    if (coleta.valor_frete) {
                        coleta.valor_frete = moeda(coleta.valor_frete);
                        coleta.total_pedido = moeda(coleta.total_pedido);
                    }
                    coleta = formatDateCheckIn(coleta)
                } else {
                    coleta = {}
                }
                return { ...state, coleta };
            },
            [COLETA_NOVA_TEMPO_EXPIRADO]: (state) => {
                return { ...state, coleta: {} };
            },
            [COLETA_ATUALIZAR_STATUS]: (state, { response }) => {
                return { ...state, coleta: { ...response, ...state.coleta, status: "Confirmado" } };
            }
        }
    }
}