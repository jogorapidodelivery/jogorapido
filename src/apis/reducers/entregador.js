import { ENTREGADOR_GEOFENCE } from "@constants/";

export default {
    defaultProps: {
        entregador: "nome"
    },
    reducers: {
        autenticacao:{
            [ENTREGADOR_GEOFENCE]: (state, _action) => {
                return state;
            }
        }
    }
}