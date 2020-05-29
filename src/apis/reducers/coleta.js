import {
  BUSCAR_COLETA,
  COLETA_CHECKOUT_UNIDADE,
  COLETA_CHECKIN_UNIDADE,
  COLETA_CHECKOUT_CLIENTE,
  COLETA_BUSCAR_PRODUTOS,
  COLETA_ATUALIZAR_STATUS,
  COLETA_NOVA_TEMPO_EXPIRADO,
  COLETA_CHECKIN_CLIENTE,
} from '@constants/';
export default {
  defaultProps: {
    coleta: [],
  },
  reducers: {
    autenticacao: {
      [BUSCAR_COLETA]: (state, {response: coleta}) => {
        return {...state, coleta};
      },
      [COLETA_CHECKIN_CLIENTE]: (
        state,
        {response: {data}, posted: {index}},
      ) => {
        state.coleta[index].data_checkin_cliente = data;
        state.coleta[index].status = 'Checkin Cliente';
        state.coleta[index].status_coleta_id = 5;
        return {...state, coleta: [...state.coleta]};
      },
      [COLETA_CHECKOUT_CLIENTE]: (state, {posted: {coleta_id}}) => {
        console.log({COLETA_CHECKOUT_CLIENTE, coleta_id});
        // Procurando indice a ser colocado no fim do array
        const indice = state.coleta.findIndex(v => v.coleta_id === coleta_id);

        // Removendo coleta finalizada
        state.coleta.splice(indice, 1);

        return {...state, coleta: [...state.coleta]};
      },
      [COLETA_CHECKOUT_UNIDADE]: (state, {response: {data}}) => {
        state.coleta = state.coleta.map(v => {
          v.data_checkout_unidade = data;
          v.status = 'Checkout Unidade';
          v.status_coleta_id = 4;
          return v;
        });
        return {...state};
      },
      [COLETA_CHECKIN_UNIDADE]: (state, {response: {data}}) => {
        state.coleta = state.coleta.map(v => {
          v.data_checkin_unidade = data;
          v.status = 'Checkin Unidade';
          v.status_coleta_id = 3;
          return v;
        });
        return {...state};
      },
      [COLETA_BUSCAR_PRODUTOS]: (state, {response: {produtos}, posted}) => {
        return {...state, produtos};
      },
      [COLETA_NOVA_TEMPO_EXPIRADO]: state => {
        return {...state, coleta: [], produtos: []};
      },
      [COLETA_ATUALIZAR_STATUS]: state => {
        state.coleta = state.coleta.map(v => {
          v.status = 'Confirmado';
          v.status_coleta_id = 2;
          return v;
        });
        return {...state};
      },
    },
  },
};
