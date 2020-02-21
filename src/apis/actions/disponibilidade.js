import { BUSCAR_DISPONIBILIDADE, MUDAR_DE_ABA_EM_DISPONIBILIDADE } from "@constants/";
import { actionObject } from "@sd/uteis/CreateActions";
export const buscarDisponibilidade = actionObject(BUSCAR_DISPONIBILIDADE);
export const toogleTabDisponibilidade = actionObject(MUDAR_DE_ABA_EM_DISPONIBILIDADE);