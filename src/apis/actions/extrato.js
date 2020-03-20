import { BUSCAR_EXTRATO } from "@constants/";
import { actionFetchItem } from "@sd/uteis/CreateActions";

export const buscarExtrato = actionFetchItem(BUSCAR_EXTRATO, "extrato", false, true, "node", "GET");