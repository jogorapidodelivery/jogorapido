import {BUSCAR_EXTRATO} from '@constants/';
const filtros = [
  {status_periodo: 1, title: 'HOJE', actived: true},
  {status_periodo: 2, title: 'ONTEM'},
  {status_periodo: 3, title: '1ª QUINZENA'},
  {status_periodo: 4, title: '2ª QUINZENA'},
  {status_periodo: 5, title: 'MÊS PASSADO'},
];
export default {
  defaultProps: {
    filtros,
    extrato: {},
  },
  reducers: {
    extrato: {
      [BUSCAR_EXTRATO]: (
        state,
        {
          posted: {status_periodo},
          response: {extrato, mes_atual, total_mes_atual},
        },
      ) => {
        const mapFiltros = state.filtros.map(v => {
          v.actived = `${v.status_periodo}` === `${status_periodo}`;
          return v;
        });
        const totalPeriodo = extrato
          .reduce(
            (acumulado, {valor_frete}) => acumulado + Number(valor_frete),
            0,
          )
          .toFixed(2);
        return {
          ...state,
          extrato,
          filtros: [...mapFiltros],
          mes_atual,
          total_mes_atual,
          totalPeriodo,
        };
      },
    },
  },
};
