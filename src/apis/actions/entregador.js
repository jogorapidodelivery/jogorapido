import { ENTREGADOR_GEOFENCE } from "@constants/";
import { actionFetchItem } from "@sd/uteis/CreateActions";

export const entregadorGeofence = actionFetchItem(ENTREGADOR_GEOFENCE, "entregador/geofence", false);