import {
  BUSCAR_COLETA,
  COLETA_CHECKOUT_UNIDADE,
  COLETA_CHECKIN_UNIDADE,
  COLETA_BUSCAR_PRODUTOS,
  COLETA_ATUALIZAR_STATUS,
  COLETA_CHECKIN_CLIENTE,
  COLETA_CHECKOUT_CLIENTE,
} from '@constants/';
import {actionFetchItem} from '@sd/uteis/CreateActions'; // actionObjectPostStatic

export const coletaAtualizarStatus = actionFetchItem(
  COLETA_ATUALIZAR_STATUS,
  'coleta/status',
);

export const coletaCheckInCliente = actionFetchItem(
  COLETA_CHECKIN_CLIENTE,
  'coleta/checkin',
);
// export const coletaCheckInCliente = actionObjectPostStatic(COLETA_CHECKIN_CLIENTE, "coleta/checkin");

export const coletaCheckOutCliente = actionFetchItem(
  COLETA_CHECKOUT_CLIENTE,
  'coleta/checkin',
);
// export const coletaCheckOutCliente = actionObjectPostStatic(COLETA_CHECKOUT_CLIENTE, "coleta/checkin");

export const coletaCheckOutUnidade = actionFetchItem(
  COLETA_CHECKOUT_UNIDADE,
  'coleta/checkin',
);
// export const coletaCheckOutUnidade = actionObjectPostStatic(COLETA_CHECKOUT_UNIDADE, "coleta/checkin");

export const coletaCheckInUnidade = actionFetchItem(
  COLETA_CHECKIN_UNIDADE,
  'coleta/checkin',
);
// export const coletaCheckInUnidade = actionObjectPostStatic(COLETA_CHECKIN_UNIDADE, "coleta/checkin");

export const coletaBuscarProdutos = actionFetchItem(
  COLETA_BUSCAR_PRODUTOS,
  'coleta/produtos',
  false,
  false,
);

export const actionBuscarColeta = actionFetchItem(
  BUSCAR_COLETA,
  'coleta/get',
  false,
);
export const actionPagar = actionFetchItem(
  COLETA_CHECKOUT_CLIENTE,
  'coleta/pagar',
  false,
);
