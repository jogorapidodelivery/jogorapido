// /coleta/status

import { COLETA_CHECKOUT_UNIDADE, COLETA_CHECKIN_UNIDADE, COLETA_NOVA, COLETA_BUSCAR_PRODUTOS, COLETA_ATUALIZAR_STATUS, COLETA_CHECKIN, COLETA_CHECKOUT_CLIENTE } from "@constants/";
import { actionFetchItem } from "@sd/uteis/CreateActions";

export const coletaAtualizarStatus = actionFetchItem(COLETA_ATUALIZAR_STATUS, "coleta/status");

export const coletaCheckIn = actionFetchItem(COLETA_CHECKIN, "coleta/checkin");
export const coletaCheckOutUnidade = actionFetchItem(COLETA_CHECKOUT_UNIDADE, "coleta/checkin");

export const coletaCheckInUnidade = actionFetchItem(COLETA_CHECKIN_UNIDADE, "coleta/checkin");
export const coletaCheckOutCliente = actionFetchItem(COLETA_CHECKOUT_CLIENTE, "coleta/checkin");
export const coletaBuscarProdutos = actionFetchItem(COLETA_BUSCAR_PRODUTOS, "coleta/produtos", false);
export const actionColetaAtualizar = actionFetchItem(COLETA_NOVA, "coleta/index", false, false);
