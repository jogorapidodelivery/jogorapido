import { TOOGLE_SELECT_DISPONIBILIDADE, BUSCAR_DISPONIBILIDADE, MUDAR_DE_ABA_EM_DISPONIBILIDADE } from "@constants/";
import moment from "moment";
import { empty } from "@sd/uteis/StringUteis";
const diasSemana = [{
        sigla: "D",
        dia: "domingo",
        data: null
    }, {
        sigla: "S",
        dia: "segunda-feira",
        data: null
    }, {
        sigla: "T",
        dia: "terça-feira",
        data: null
    }, {
        sigla: "Q",
        dia: "quarta-feira",
        data: null
    }, {
        sigla: "Q",
        dia: "quinta-feira",
        data: null
    }, {
        sigla: "S",
        dia: "sexta-feira",
        data: null
    }, {
        sigla: "S",
        dia: "sábado",
        data: null
    }
]
export default {
    defaultProps: {
    },
    reducers: {
        disponibilidade: {
            [BUSCAR_DISPONIBILIDADE]: (state, { posted: { disponibilidade }, response: { disponibilidade: pgDisponibilidade}}) => {// { disponibilidade}
                const copy = [ ...disponibilidade ];
                let diasSemanaCopy = diasSemana.map(v => {
                    v.data = copy.map(v2 => {
                        return {...v2, data:null};
                    })
                    return v;
                })
                const date = moment().format();
                (pgDisponibilidade || []).forEach(({ dia_semana, disponibilidade_id }) => {
                    diasSemanaCopy[dia_semana].data = diasSemanaCopy[dia_semana].data.map((v) => {
                        const { disponibilidade_id: disponibilidade_id2} = v;
                        const data = disponibilidade_id === disponibilidade_id2 ? date : v.data;
                        return { ...v, data };
                    });
                })
                const hoje = (new Date()).getDay();
                const r = { ...state, semana: diasSemanaCopy, diaSelecionado: hoje, itemsSelecionados:0 };
                return r;
            },
            [TOOGLE_SELECT_DISPONIBILIDADE]: (state, { index }) => {
                const { diaSelecionado} = state;
                const dataTmp = state.semana[diaSelecionado].data[index].data;
                const data = state.semana[diaSelecionado].data[index].data = empty(dataTmp) ? moment().format() : null;
                state.itemsSelecionados += data === null ? -1 : 1;
                console.log({ action:"reducer", index, diaSelecionado, data});
                return {...state}
            },
            [MUDAR_DE_ABA_EM_DISPONIBILIDADE]: (state, { index}) => {
                return { ...state, diaSelecionado:index};
            }
        }
    }
}