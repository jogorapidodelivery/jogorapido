// /coleta/status

import { COLETA_ATUALIZAR_STATUS, COLETA_CHECKIN } from "@constants/";
import { actionFetchItem } from "@sd/uteis/CreateActions";

export const coletaAtualizarStatus = actionFetchItem(COLETA_ATUALIZAR_STATUS, "coleta/status");
export const coletaCheckIn = actionFetchItem(COLETA_CHECKIN, "coleta/checkin");