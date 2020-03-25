export const trin = (v ) => {
    if (v === null || v === undefined) return ""
    else if (typeof v === "string") {
        v = v.replace(/^\s+|\s+$/g, "")// tira espaços do inicio e do fim
        v = v.replace(/\s{2,}/g, " ")// tira espaços duplicados
        return v
    } else if (typeof v === "number") return "" + v
    else if (typeof v === "boolean") return v ? "true" : "false"
    else if (typeof v === "object") {
        const _str = JSON.stringify(v)
        return _str === "{}" ? "" : _str
    }
    return v
}
export const limite = (texto, length = 100, padrao = "...") => {
    if (texto === undefined || texto === null || texto === "undefined") return ""
    padrao = padrao || "..."
    if (texto.length < length) return texto
    texto = texto.substr(0, length)
    texto = texto.substr(0, texto.lastIndexOf(" "))
    return texto + padrao
}
export const empty = (v) => {
    if (v === undefined || v === null) return true
    switch (typeof v) {
        case "object":
            if (Array.isArray(v)) return v.length === 0
            return Object.keys(v).length === 0
        case "string":
            return trin(v).length === 0
        case "number":
            if (isNaN(v)) return true
            return Number(v) === 0
        case "boolean":
            return v
        default:
            return false
    }
}
export const str2slug = (v) => {
    if (empty(v)) return ""
    const _s = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖØòóôõöøÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜùúûüÑñŠšŸÿýŽž/.,"
    const _t = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUuuuuNnSsYyyZz___"
    return trin(v.split("").map(_v => {
        const _i = _s.indexOf(_v)
        if (_i !== -1)return _t.charAt(_i)
        return _v
    }).join("")).replace(/[\s|\t|\n]/gi, "_").replace(/[-{2,}]/gi, "_")
}
export const removeCaracterEspecial = (v) => {
    return trin(v).replace(/[^a-zA-Z\u00C0-\u00FF\s]/gi, "")
}
export const upperCamelCase = (v) => {
    if (empty(v)) return ""
    v = v.toLowerCase()
    const _rejectUperCase = "ara,ue,em,im,ão,or,a,e,i,u".split(",")
    v = v.replace(/[a-zA-Z\u00C0-\u00FF]+/g, function (w) {
        let _start = w[0]
        const _end = w.slice(1).toLowerCase()
        if ((_end.length > 2 || _end.length === 0) && _rejectUperCase.indexOf(_end) === -1) {
            _start = _start.toUpperCase()
        }
        return _start + _end
    })
    return v
}
export const embaralharEmail = (v) => {
    const _parts = v.split("@")
    return _parts[0].substring(0, 2) + "*".repeat(_parts[1].length - 3) + "@" + _parts[1]
}
export const embaralharTelefone = (v) => {
    const _t = v.length
    return v.substring(0,3) + v.replace(/[0-9]/gi, "*").substring(3, _t - 2) + v.substring(_t - 2, _t)
}
export const embaralharCartao = (v) => {
    return v.substring(0,14).replace(/[0-9]/gi, "•") + v.substring(14, v.length)
}
export const completarCartao = (v) => {
    let tmp = v.replace(/[\D]/gi, "")
    return tmp.padEnd(16, "*").replace(/^([0-9*]{4})([0-9*]{4})([0-9*]{4})([0-9*])/g, "$1 $2 $3 $4")
}
export const captalize = (v, force = true) => {
    if (empty(v)) return ""
    return v.charAt(0).toUpperCase() + (force ? v.slice(1).toLowerCase() : v.slice(1))
}
export const UDID = (modelo = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx") => {
    return modelo.replace(/[xy]/g, () => {
        return `${Math.ceil(Math.random() * 10)}`
    })
}
export const imageName = (v) => {
    if (empty(v)) return ""
    const _tmp = v.split("/")
    v = _tmp.pop()
    return v
}
export const imageExtensao = (v) => {
    if (empty(v)) return ""
    const _tmp = v.split("/")
    v = _tmp.pop()
    v = v.toLowerCase()
    return v
}
export const abreviarNome = (s, minCharAbreviar = 10) => {
    if (empty(s)) return ""
    if (s.length > minCharAbreviar) {
        const _nome = upperCamelCase(s).split(" ")
        if (_nome.length > 1) {
            const t = _nome.length - 1
            _nome.forEach(function (value, key) {
                if (key > 0 && key < t) {
                    if (value.length > 2) {
                        _nome[key] = (value.substring(0, 1) + ".").toUpperCase()
                    } else _nome[key] = value.substring(0, 1).toUpperCase() + value.substring(1, value.length).toLowerCase()
                }
            })
            _nome[t] = _nome[t].substring(0, 1).toUpperCase() + _nome[t].substring(1, _nome[t].length).toLowerCase()
        }
        return _nome.join(" ")
    } else {
        return upperCamelCase(s)
    }
    return s || ""
}
export const km2String = metros => {
    if (metros < 1000) return `${metros} m`;
    metros = metros/1000;
    return metros.toFixed(3) + " km";
}