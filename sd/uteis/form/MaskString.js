import { empty } from "../StringUteis"

export const formataCampo = (v, m, limited) => {
    let bm
    let p = 0
    let r = ""
    let t = `${v}`.length
    for (let i = 0; i <= t; i++) {
        bm = ((m.charAt(i) === "-") || (m.charAt(i) === ".") || (m.charAt(i) === "/"))
        bm = bm || ((m.charAt(i) === "(") || (m.charAt(i) === ")") || (m.charAt(i) === " "))
        if (bm) {
            r += m.charAt(i)
            t++
        } else {
            r += v.charAt(p)
            p++
        }
    }
    if (isNaN(Number(r.charAt(r.length - 1)))) r = r.slice(0, r.length - 1)
    if (limited === true) r = r.slice(0, m.length)
    return r
}
export const emailCelular = (v, _debug = false) => {
    if (empty(v)) return ""
    const isTel = v.replace(/\D/g, "");
    if (isTel.length >= 4 || v.charAt(0) === "(") return telefone(v)
    return email(v);
}
export const telefone = (v, _debug = false) => {
    if (empty(v)) return ""
    v = v.replace(/\D/g, "").slice(0, 14)
    const t = v.length
    let marxChar = 15
    if (t > 9 || t < 8 || v.charAt(0) === "0") {
        if (v.charAt(0) === "0") {
            let reg = undefined
            if (t === 14) {
                marxChar = 18
                reg = /^(\d{5})(\d)/g
            } else if (t === 13) {
                marxChar = 17
                reg = /^(\d{4})(\d)/g
            } else {
                marxChar = 16
                reg = /^(\d{3})(\d)/g
            }
            v = v.replace(reg, "($1) $2")
        } else v = v.replace(/^(\d\d)(\d)/g, "($1) $2")
    }
    v = v.replace((t === 9 || t >= 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/), "$1-$2")
    if (v.length > 15) v = v.slice(0, marxChar)
    return v
}
export const cpf = (v) => {
    if (empty(v)) return ""
    v = `${v}`.replace(/\D/g, "")
    return formataCampo(v, "000.000.000-00", true)
}
export const cnpj = (v) => {
    if (empty(v)) return ""
    v = `${v}`.replace(/\D/g, "")
    return formataCampo(v, "00.000.000/0000-00", true)
}
export const cpfCnpj = (v) => {
    if (empty(v)) return ""
    v = `${v}`.replace(/\D/g, "")
    if (v.length > 11) return formataCampo(v, "00.000.000/0000-00", true)
    else return formataCampo(v, "000.000.000-00", false)
}
export const moeda = (v, simbolo = "R$ ", ignorarCentavos = false) => {
    if (empty(v)) return `${simbolo} 0,00`;
    const _valorNegativo = Number(v) < 0
    if (typeof v === "number") v = v.toFixed(2).replace(".", ",")
    v = `${v}`
    v = `${v}`.replace(/[\D]/gi, "")
    v = v.replace(/^0{n}+/, "")
    v = v.replace(/(.*?)(\d{2})$/, "$1,$2")
    const _t = Math.round((v.length - 2) / 3) + 1
    let _s = 6
    if (v.length > 6) {
        v = v.replace(/(.*?)([\d|\,]{6})$/, "$1.$2")
        for (let _x = 1; _x < _t; _x++) {
            const _y = _s + (_x * 4)
            if (v.length > _y) {
                const _erg = new RegExp(`(.*?)([\d|\.|\,]{${_y}})$`)
                v = v.replace(_erg, "$1.$2")
            }
        }
    }
    const _r = `${simbolo}${(_valorNegativo ? "-" : "")}${v}`
    if (ignorarCentavos) return _r.substring(0, _r.length - 3)
    return _r
}

export const data = (v) => {
    if (empty(v)) return ""
    v = v.replace(/\D/g, "")
    v = v.replace(/^(\d\d)(\d)/g, "$1/$2")
    if (v.length > 5) v = v.replace(/(\d{2})(\d)/, "$1/$2")
    v = v.slice(0, 10)
    return v
}

export const digitos = (v) => {
    if (empty(v)) return ""
    return `${v}`.replace(/\D/g, "")
}
export const min = (v) => {
    if (empty(v)) return ""
    return `${v}`
}
export const senha = (v) => {
    return min(v)
}
export const senhaCompare = (v) => {
    return min(v)
}
export const email = (v) => {
    return min(v)
}
export const cartao = (v, bandeira = "") => {
    if (empty(v)) return ""
    v = v.replace(/\D/g, "")
    v = v.replace(/^(\d{4})(\d)/g, "$1 $2")
    switch (bandeira) {
        case "americanexpress":
            v = v.replace(/^(\d{4})\s(\d{6})(\d)/g, "$1 $2 $3")
            v = v.slice(0, 17)
            break
        default:
            v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3")
            v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3 $4")
            v = v.slice(0, 19)

            break
    }
    return v
}
export const cvc = (v) => {
    if (empty(v)) return ""
    v = v.replace(/\D/g, "")
    v = v.slice(0, 4)
    return v
}
export const dataExpiry = (v) => {
    if (empty(v)) return ""
    v = v.replace(/\D/g, "")
    v = v.replace(/^(\d\d)(\d)/g, "$1/$2")
    v = v.slice(0, 7)
    return v
}