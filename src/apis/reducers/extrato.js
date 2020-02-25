import { BUSCAR_EXTRATO, MUDAR_DE_ABA_EM_EXTRATO } from "@constants/";
export default {
    defaultProps: {
    },
    reducers: {
        extrato: {
            [BUSCAR_EXTRATO]: (state, _action) => {
                const hoje = (new Date()).getDay()
                return { ...state, diaSelecionado: hoje };
            },
            [MUDAR_DE_ABA_EM_EXTRATO]: (state, { index }) => {
                return { ...state, diaSelecionado: index };
            }
        }
    }
}