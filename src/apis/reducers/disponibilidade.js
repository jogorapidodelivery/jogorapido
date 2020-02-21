import { BUSCAR_DISPONIBILIDADE, MUDAR_DE_ABA_EM_DISPONIBILIDADE } from "@constants/";
const tmpData = [{
        disponibilidade: "Café",
        hora_inicio: "06:00:00",
        hora_fim: "10:00:00",
        icone: "",
        cor: "#40D100",
        data: "2020-02-20"
    }, {
        disponibilidade: "Almoço",
        hora_inicio: "10:00:00",
        hora_fim: "14:00:00",
        icone: "",
        cor: "#E40500",
        data: "2020-02-20"
    }, {
        disponibilidade: "Lanche",
        hora_inicio: "14:00:00",
        hora_fim: "16:00:00",
        icone: "",
        cor: "#EC5F23",
        data: null
    }, {
        disponibilidade: "Janta",
        hora_inicio: "16:00:00",
        hora_fim: "22:30:00",
        icone: "",
        cor: "#959595",
        data: null
    }
];
const diasSemana = [{
        sigla: "D",
        dia: "domingo",
        data: tmpData
    }, {
        sigla: "S",
        dia: "segunda-feira",
        data: tmpData
    }, {
        sigla: "T",
        dia: "terça-feira",
        data: tmpData
    }, {
        sigla: "Q",
        dia: "quarta-feira",
        data: tmpData
    }, {
        sigla: "Q",
        dia: "quinta-feira",
        data: tmpData
    }, {
        sigla: "S",
        dia: "sexta-feira",
        data: tmpData
    }, {
        sigla: "S",
        dia: "sábado",
        data: tmpData
    }
]
export default {
    defaultProps: {
    },
    reducers: {
        disponibilidade: {
            [BUSCAR_DISPONIBILIDADE]: (state, _action) => {
                hoje = (new Date()).getDay()
                return { ...state, semana: diasSemana, diaSelecionado: hoje};
            },
            [MUDAR_DE_ABA_EM_DISPONIBILIDADE]: (state, { index}) => {
                return { ...state, diaSelecionado:index};
            }
        }
    }
}