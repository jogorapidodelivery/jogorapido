import {
  BUSCAR_DISPONIBILIDADE,
  MUDAR_DE_ABA_EM_DISPONIBILIDADE,
  TOOGLE_SELECT_DISPONIBILIDADE,
  SALVAR_DISPONIBILIDADE,
} from '@constants/';
import {actionObject, actionFetchItem} from '@sd/uteis/CreateActions';

export const buscarDisponibilidade = actionFetchItem(
  BUSCAR_DISPONIBILIDADE,
  'disponibilidade',
  false,
  true,
  'node',
  'GET',
);
export const toogleSelectDisponibilidade = actionObject(
  TOOGLE_SELECT_DISPONIBILIDADE,
);
export const toogleTabDisponibilidade = actionObject(
  MUDAR_DE_ABA_EM_DISPONIBILIDADE,
);
export const salvarDisponibilidade = actionFetchItem(
  SALVAR_DISPONIBILIDADE,
  'disponibilidade',
  true,
  true,
  'node',
);
