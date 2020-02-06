import Base64 from "base-64"
import { empty } from "./StringUteis"
const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const key = "1INP97AfetClO6akwGoyixJRpDFmdcUHZjn2sYuQ3zrWMq0LT85BKS4bvEgVhX"
export const encodeCipherCaesar = (_obj: any): string => {
    let coded: string = ""
    let _str: string = JSON.stringify(_obj)
        _str = Base64.encode(_str).toString()
    for (let i: number = 0; i < _str.length; i++) {
        const ch = _str.charAt(i)
        const index = alphabet.indexOf(ch)
        if (index === -1) coded = coded + ch
        else coded = coded + key.charAt(index)
    }
    return coded
}
export const decodeCipherCaesar = (_str: string): any => {
    if (empty(_str)) return {}
    let coded: string = ""
    for (let i: number = 0; i < _str.length; i++) {
        const ch = _str.charAt(i)
        const index = key.indexOf(ch)
        if (index === -1) coded = coded + ch
        else coded = coded + alphabet.charAt(index)
    }
    const _bd65 = Base64.decode(coded).toString()
    return JSON.parse(_bd65)
}