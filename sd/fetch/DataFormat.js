import { Platform } from "react-native";
import { baseApp, timeoutSlow, timeoutLong } from "@root/app.json";
import { version } from "@root/package.json";
import { empty } from "@sd/uteis/StringUteis";
export let globalParams = {
    app_id: "",
    latitude: 0,
    longitude: 0
}
const _getDefaultParams = () => {
    const data = new Date();
    const _m = ("0" + (data.getUTCMonth() + 1)).substr(-2);// mês
    const _d = ("0" + (data.getUTCDate() + 1)).substr(-2);// Dia
    const _a = data.getFullYear();// Ano
    const _h = ("0" + (data.getHours() + 1)).substr(-2);// Hora
    const _mn = ("0" + (data.getMinutes() + 1)).substr(-2);// Minutos
    const _s = ("0" + (data.getSeconds() + 1)).substr(-2);// Segundos
    return {
        current_time: `${_h}:${_mn}:${_s}`,
        data_celular: `${_a}-${_m}-${_d} ${_h}:${_mn}:${_s}`,
        os: Platform.OS,
        version,
        ...globalParams
    }
}
export default (_obj, _loggerID = 0) => {
    let _urlDebug = `${baseApp}${_obj.action}?debug=1`
    _obj.body_post = { ..._obj.body_post, ..._getDefaultParams() }
    let _data = new FormData()
    let timeout = timeoutSlow;
    for (let a in _obj.body_post) {
        const value = _obj.body_post[a]
        if (empty(value)) continue
        if (Array.isArray(value)) {
            for (let b in value) {
                const v2 = value[b]
                if (empty(v2)) continue
                if (typeof v2 === "object") {
                    for (let c in v2) {
                        const v3 = v2[c]
                        if (empty(v3)) continue
                        if (__DEV__) _urlDebug += `&${a}[${b}][${c}]=${escape(v3)}`
                        _data.append(`${a}[${b}][${c}]`, v3)
                    }
                    continue
                }
                if (__DEV__) _urlDebug += `&${a}[${b}]=${escape(v2)}`
                _data.append(`${a}[${b}]`, v2)
            }
            continue
        } else if (typeof value === "object") {
            if (value.uri === undefined) {
                for (let d in value) {
                    const v4 = value[d]
                    if (empty(v4)) continue
                    if (__DEV__) _urlDebug += `&${a}[${d}]=${escape(v4)}`
                    _data.append(`${a}[${d}]`, v4)
                }
                continue
            } else {
                timeout = timeoutLong
            }
        }
        if (__DEV__) _urlDebug += `&${a}=${escape(value)}`
        _data.append(a, value)
    }
    console.log(`${_loggerID}) FORMAT POST`, { get: _urlDebug })
    return {
        body: _data,
        timeout
    }
}