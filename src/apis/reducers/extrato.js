import { BUSCAR_EXTRATO } from "@constants/";
export default {
    defaultProps: {
        filtros:[
            { status_periodo: 1/* hoje        */, title: "HOJE", actived: true },
            { status_periodo: 2/* ontem       */, title: "ONTEM" },
            { status_periodo: 3/* 1ª Quinzena */, title: "1ª QUINZENA" },
            { status_periodo: 4/* 2ª Quinzena */, title: "2ª QUINZENA" },
            { status_periodo: 5/* Mês passado */, title: "MÊS PASSADO" }
        ]
    },
    reducers: {
        extrato: {
            [BUSCAR_EXTRATO]: (state, { posted: { status_periodo}, response:{extrato, mes_atual, total_mes_atual}}) => {
                state.filtros = state.filtros.map(v => {
                    v.actived = `${v.status_periodo}` === `${status_periodo}`;
                    return v;
                });
                const totalPeriodo = extrato.reduce((acumulado, { valor_frete }) => acumulado + Number(valor_frete),0).toFixed(2);
                return { ...state, extrato, mes_atual, total_mes_atual, totalPeriodo };
            }
        }
    }
}