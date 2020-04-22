import { empty } from "../StringUteis"
import moment from "moment"
export const telefone = (v) => {
    if (empty(v)) return false
    v = `${v}`.replace(/[^\d]+/g, "").replace(/^[0]/, "")
    const _count = `${v}`.length
    switch (_count) {
        case 8:
        case 9:
        case 10:
        case 11:
            return true
        default:
            return false
    }
}
export const emailCelular = (v) => {
    if (empty(v)) return false;
    const isTel = v.replace(/\D/g, "");
    if (isTel.length >= 4 || v.charAt(0) === "(") return telefone(v)
    return email(v);
}
export const data = (v) => {
    if (empty(v)) return false
    v = `${v}`.replace(/[^\d]+/g, "")
    return v.length === 8 && moment(v, "DDMMYYYY").isValid()
}
export const min = (v, min) => {
    if (empty(v)) return false
    min = min || 3
    return `${v}`.length >= min
}
export const senha = (v) => {
    return min(v, 3)
}
export const email = (v) => {
    if (empty(v)) return false
    return /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(`${v}`)
}
export const upperCamelCase = (v) => {
    return min(v, 3)
}
export const cpf = (v) => {
    if (empty(v)) return false
    let _cpf = `${v}`.replace(/[^\d]+/g, "")
    if (_cpf === "") {
        return false
    }
    if (_cpf.length !== 11 ||
        _cpf === "00000000000" ||
        _cpf === "11111111111" ||
        _cpf === "22222222222" ||
        _cpf === "33333333333" ||
        _cpf === "44444444444" ||
        _cpf === "55555555555" ||
        _cpf === "66666666666" ||
        _cpf === "77777777777" ||
        _cpf === "88888888888" ||
        _cpf === "99999999999") {
        return false
    }
    let _add = 0
    for (let i = 0; i < 9; i++) {
        _add += Number(_cpf.charAt(i)) * (10 - i)
    }
    let _rev = 11 - (_add % 11)
    if (_rev === 10 || _rev === 11)
        _rev = 0
    if (_rev !== Number(_cpf.charAt(9))) {
        return false
    }
    _add = 0
    for (let i = 0; i < 10; i++) {
        _add += Number(_cpf.charAt(i)) * (11 - i)
    }
    _rev = 11 - (_add % 11)
    if (_rev === 10 || _rev === 11) {
        _rev = 0
    }
    if (_rev !== Number(_cpf.charAt(10))) {
        return false
    }
    return true
}
export const cnpj = (v) => {
    if (empty(v)) return false
    let cnpj = `${v}`.replace(/[^\d]+/g, "")
    let numeros, digitos, soma, i, resultado, pos, tamanho, digitosIguais = 1
    if (cnpj.length !== 14) return false
    for (i = 0; i < cnpj.length - 1; i++) {
        if (cnpj.charAt(i) !== cnpj.charAt(i + 1)) {
            digitosIguais = 0
            break
        }
    }
    if (!digitosIguais) {
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho)
        digitos = cnpj.substring(tamanho)
        soma = 0
        pos = tamanho - 7
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (Number(resultado) !== Number(digitos.charAt(0))) return false
        tamanho = tamanho + 1
        numeros = cnpj.substring(0, tamanho)
        soma = 0
        pos = tamanho - 7
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--
            if (pos < 2) pos = 9
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
        if (Number(resultado) !== Number(digitos.charAt(1))) return false
        return true
    }
    return false
}
export const cpfCnpj = (v) => {
    if (empty(v)) {
        return false
    }
    v = `${v}`.replace(/[^\d]+/g, "")
    const _t = v.length
    if (_t === 11) {
        return cpf(v)
    } else if (_t === 14) {
        return cnpj(v)
    }
    return false
}
export const digitos = (v) => {
    if (empty(v)) return false
    v = `${v}`.replace(/[^\d]+/g, "")
    return v.length > 0
}
export const moeda = (v) => {
    if (empty(v)) return false
    v = `${v}`.replace(/[^\d]+/g, "")
    return v.length > 0
}