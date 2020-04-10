import { GrupoRotas } from "@sd/navigation/revestir";
import { setUserBackground } from "@libs/geofence";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { empty } from "@sd/uteis/StringUteis";
export const openPageStart = async (navigation, delay = 0) => {
    let _router = "conectar";
    let params = {};
    const state = GrupoRotas.store.getState();
    if (getItemByKeys(state, "autenticacao.usuario_id") !== undefined) {
        let { autenticacao: { email, usuario, usuario_id, email_verificado, coleta } } = state;
        if (empty(usuario)) usuario = email;
        if (usuario_id) await setUserBackground({ usuario_id });
        if (email_verificado) {
            _router = findRenderPage(coleta)
        } else {
            _router = "validarEmail";
        }
        params = { usuario }
    }
    setTimeout(() => {
        navigation.navigate(_router, {params});
    }, delay)
}
export const findRenderPage = coleta => {
    let _router = "conectar";
    if (!empty(coleta) && coleta.length > 0) {
        const { status_coleta_id, data_checkout_cliente } = coleta[0];
        if ([2, 3, 4, 5, 6].indexOf(status_coleta_id) != -1 && empty(data_checkout_cliente)) {
            _router = "coletar";
        } else {
            _router = "home";
        }
    } else {
        _router = "home";
    }
    return _router
}