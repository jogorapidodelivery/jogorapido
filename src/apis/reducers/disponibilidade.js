import {
  TOOGLE_SELECT_DISPONIBILIDADE,
  BUSCAR_DISPONIBILIDADE,
  MUDAR_DE_ABA_EM_DISPONIBILIDADE,
} from '@constants/';
import {empty} from '@sd/uteis/StringUteis';
import moment from 'moment';
const actionRelacionar = (
  day,
  pgDisponibilidade,
  cafeAlmocoLancheJantaTemplate,
  idsDist,
) => {
  const results = pgDisponibilidade.filter(
    ({dia_semana}) => dia_semana === day,
  );
  let dist = cafeAlmocoLancheJantaTemplate.map(v => {
    const response = {...v, data: null, ativo: null};
    return response;
  });
  results.forEach(({disponibilidade_id, ativo, data}) => {
    const key = idsDist.indexOf(disponibilidade_id);
    dist[key].data = data;
    dist[key].ativo = ativo;
  });
  return dist;
};
const diasSemana = [
  null,
  {
    sigla: 'S',
    dia: 'segunda-feira',
    data: null,
  },
  {
    sigla: 'T',
    dia: 'terça-feira',
    data: null,
  },
  {
    sigla: 'Q',
    dia: 'quarta-feira',
    data: null,
  },
  {
    sigla: 'Q',
    dia: 'quinta-feira',
    data: null,
  },
  {
    sigla: 'S',
    dia: 'sexta-feira',
    data: null,
  },
  {
    sigla: 'S',
    dia: 'sábado',
    data: null,
  },
  {
    sigla: 'D',
    dia: 'domingo',
    data: null,
  },
];
export default {
  defaultProps: {
    loading: true,
  },
  reducers: {
    disponibilidade: {
      [BUSCAR_DISPONIBILIDADE]: (
        state,
        {
          posted: {disponibilidade: cafeAlmocoLancheJantaTemplate},
          response: {disponibilidade: pgDisponibilidade},
        },
      ) => {
        let cloneCafeAlmocoLancheJantaTemplate = [];
        const idsDist = cafeAlmocoLancheJantaTemplate.map(v => {
          v.data = null;
          cloneCafeAlmocoLancheJantaTemplate.push({...v});
          return v.disponibilidade_id;
        });
        let week = diasSemana.map((info, indice) => {
          let response = null;
          if (info !== null) {
            response = {...info, data: null};
            response.data = actionRelacionar(
              indice,
              pgDisponibilidade,
              cafeAlmocoLancheJantaTemplate,
              idsDist,
            );
          }
          return response;
        });
        week.shift();
        const diaSelecionado = new Date().getDay() - 1;
        const r = {
          ...state,
          semana: week,
          diaSelecionado,
          itemsSelecionados: 0,
        };
        return r;
      },
      [TOOGLE_SELECT_DISPONIBILIDADE]: (state, {index}) => {
        const {diaSelecionado} = state;
        const dataTmp = state.semana[diaSelecionado].data[index];

        const weekDayNumber = new Date().getDay() - 1;
        if (diaSelecionado < weekDayNumber) {
          throw new Error(
            'Não é possível alterar escala de um dia que já passou.',
          );
        } else if (diaSelecionado === weekDayNumber) {
          const {hora_fim, hora_inicio} = dataTmp;
          const from = moment(hora_inicio, 'H:mm:ss').toDate();
          const to = moment(hora_fim, 'H:mm:ss').toDate();
          const check = moment().toDate();
          const jaPassou = check > to;
          const dentroDoHorario = check >= from && check <= to;
          if (jaPassou) {
            throw new Error(
              'Não é possível alterar escala de um horário que já passou.',
            );
          } else if (dentroDoHorario) {
            throw new Error(
              'Não é possível alterar uma escala em andamento. <b>Entre em contato com o moderador.<b/>',
            );
          }
        }
        const hasDate = empty(dataTmp.data);
        state.semana[diaSelecionado].data[index].data = hasDate
          ? new Date().toString()
          : null;

        state.semana[diaSelecionado].data[index].ativo = false;
        state.itemsSelecionados += !hasDate ? -1 : 1;
        return {...state};
      },
      [MUDAR_DE_ABA_EM_DISPONIBILIDADE]: (state, {index}) => {
        return {...state, loading: false, diaSelecionado: index};
      },
    },
  },
};
