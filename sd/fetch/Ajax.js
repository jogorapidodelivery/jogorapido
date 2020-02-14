import mountFormData from "./DataFormat"
import { empty, str2slug } from "@sd/uteis/StringUteis"

import { baseUrl } from "@root/app.json";
const baseApp = __DEV__ ? baseUrl.off : baseUrl.on;

/*
analiszar isto aqui também
https://www.npmjs.com/package/react-native-cache-store
*/
const obj = {
    ignorarError: false,
    action: "",
    key: "",
    body_view: null,
    body_rsa: null,
    body_post: null
}
export default (_obj = obj, _resolve, _reject, _loggerID = 0) => {
    let headers = new Headers()
    headers.append("Accept", "application/json")
    headers.append("Content-Type", "multipart/form-data")
    headers.append("Accept-Encoding", "gzip")
    const { body, timeout } = mountFormData(_obj, _loggerID)
    let controller = eval(`new AbortController()`)
    const { signal } = controller
    const _params = {
        signal, method: "POST", headers, body
    }
    let interval = setTimeout(() => {
        controller.abort()
        interval = undefined
        controller = undefined
    }, timeout)
    // console.log(`${baseApp}${_obj.action}`);
    // console.log(_params);
    fetch(`${baseApp}${_obj.action}`, _params).then((response) => {
        if (!empty(interval)) {
            clearTimeout(interval)
            interval = undefined
            controller = undefined
        }
        if (response.status === 200) {
            return response.text()
        }
        return JSON.stringify({
            status: "erro",
            mensagem: `Página não encontrada status[${response.status}]`
        })
    }).then(string => {
        // console.log(string)
        try {
            return JSON.parse(string);
        } catch (e) {
            Promise.reject({ body: string, type: 'unparsable' });
        }

    }).then(response => {
        // console.log("response", response)
        if (!empty(interval)) {
            clearTimeout(interval)
            interval = undefined
            controller = undefined
        }
        if (!empty(_obj.body_post.postdata)) delete _obj.body_post.postdata
        const { action, type, body_view, body_post, body_rsa } = _obj
        let { key } = _obj;
        key = key || str2slug(action);
        const { data, mensagem, status } = response;
        const _r = {
            posted: {
                action,
                type,
                key,
                ...body_view,
                ...body_post,
                ...body_rsa
            },
            response:data,
            mensagem,
            status
        }
        if ("sucesso".indexOf(response.status) !== -1) {
            _resolve(_r)
        }
        else {
            _reject(_r)
        }
    }).catch(_err => {
        console.log("catch _err", _err.text);
        if (!empty(interval)) {
            clearTimeout(interval)
            interval = undefined
            controller = undefined
        }
        console.log(`${_loggerID}) LOAD FAILED`, { stack: _err.stack, mensagem: _err.message });
        const { action, key, body_view, body_post, body_rsa } = _obj;
        let _tmp = {
            posted: {
                action,
                key: key || str2slug(action),
                ...body_view,
                ...body_post,
                ...body_rsa
            },
            status: "erro",
            mensagem: _err.message
        }
        const _strTmp = _err.message.toLowerCase();
        if (_strTmp.indexOf("network request failed") !== -1) {
            _tmp.mensagem = "Falha na solicitação de rede. Tente novamente";
        } else if (_strTmp.indexOf("unexpected token < in json") !== -1) {
            _tmp.mensagem = "A informação retornada pelo servidor não tem formato JSON válido";
        }
        _reject(_tmp);
    })
    return () => {
        if (controller !== undefined) controller.abort();
        if (interval !== undefined) clearTimeout(interval);
    }
}