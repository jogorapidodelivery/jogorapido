import { GrupoRotas } from "@sd/navigation/revestir";
import { bgLocationFetch } from "@libs/geofence";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { empty } from "@sd/uteis/StringUteis";
export const openPageStart = async (navigation, delay = 0) => {
    let _router = "conectar";
    let params = {};
    const state = GrupoRotas.store.getState();
    if (getItemByKeys(state, "autenticacao.usuario_id") !== undefined) {
        const { autenticacao: { tempo_aceite, email: usuario, usuario_id, email_verificado, coleta } } = state;
        if (usuario_id) await bgLocationFetch({ usuario_id });
        if (email_verificado) {
            if (coleta !== undefined) {
                const { status, data_checkout_cliente} = coleta;
                if (["Confirmado", "Checkin Unidade", "Checkout Unidade", "Checkin Cliente", "Checkout Cliente"].indexOf(status) != -1 && empty(data_checkout_cliente)) {
                    _router = "coletar";
                } else {
                    _router = "home";
                }
            } else {
                _router = "home";
            }
        } else {
            _router = "validarEmail";
        }
        params = { usuario }
    }
    setTimeout(() => {
        navigation.navigate(_router, {params});
    }, delay)
}