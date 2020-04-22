const digitos = {
    keyboardType: "numeric",
    autoCorrect: false,
    autoCapitalize: "none"
}
const inputProsDefault = {
    senha_compareSenha: {
        maxLength: 20,
        secureTextEntry: true,
        keyboardType: "default",
        autoCorrect: false,
        autoCapitalize: "none"
    },
    telefone: {
        maxLength: 15,
        ...digitos
    },
    digitos: {
        maxLength: 15,
        ...digitos
    },
    cartao: {
        maxLength: 19,
        ...digitos
    },
    expira: {
        maxLength: 5,
        ...digitos
    },
    cvc: {
        secureTextEntry: true,
        maxLength: 4,
        ...digitos
    },
    cpf: {
        maxLength: 14,
        ...digitos
    },
    cnpj_cpfCnpj: {
        maxLength: 14,
        ...digitos
    },
    moeda: {
        maxLength: 12,
        ...digitos
    },
    data_digitos: {
        maxLength: 10,
        ...digitos
    },
    upperCamelCase_captalize_min: {
        keyboardType: "default",
        autoCorrect: true
    },
    emailCelular:{
        autoCorrect: false,
        maxLength: 80,
        keyboardType: "email-address",
        autoCapitalize: "none"
    },
    email: {
        maxLength: 40,
        keyboardType: "email-address",
        autoCorrect: false,
        autoCapitalize: "none"
    },
    "nenhum": {}
}
export default (type) => {
    if (type === "") return inputProsDefault.nenhum
    const _keys = Object.keys(inputProsDefault)
    let _indice = -1
    _keys.every((value, key) => {
        if (value.indexOf(type) !== -1) {
            _indice = key
            return false
        }
        return true
    })
    return {...inputProsDefault[_indice === -1 ? "nenhum" : _keys[_indice]]}
}
