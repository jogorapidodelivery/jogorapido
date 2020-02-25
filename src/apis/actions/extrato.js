import { BUSCAR_EXTRATO, MUDAR_DE_ABA_EM_EXTRATO } from "@constants/";
import { actionObject } from "@sd/uteis/CreateActions";
export const buscarExtrato = actionObject(BUSCAR_EXTRATO);
export const toogleTabExtrato = actionObject(MUDAR_DE_ABA_EM_EXTRATO);