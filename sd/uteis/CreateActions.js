import { fetchItem, fetchItemsParallel, fetchItemsRow } from "@sd/fetch";
import { GrupoRotas } from "@sd/navigation/revestir";
import { SDNavigation } from "@sd/navigation";
import { handleActions } from 'redux-actions';
let __SD_REDUCERS_BOOT_OBJECT = {};
export const mergeHandleActions = (...args) => {
    const combineHandleActions = (group, reducers, defaultProps) => {
        __SD_REDUCERS_BOOT_OBJECT[group] = __SD_REDUCERS_BOOT_OBJECT[group] || {}
        let _ac = {};
        Object.keys(reducers).forEach(_v => {
            if (_v.indexOf(",") !== -1) {
                _v.split(",").forEach(_v2 => {
                    __SD_REDUCERS_BOOT_OBJECT[group][_v2] = _ac[_v2] = reducers[_v];
                })
            } else {
                __SD_REDUCERS_BOOT_OBJECT[group][_v] = _ac[_v] = reducers[_v];
            }
        })
        
        return handleActions(_ac, defaultProps)
    }
    let _merge = {};
    let bootProps = {}
    args.forEach(({ defaultProps, reducers}) => {
        Object.keys(reducers).forEach(key => {
            bootProps[key] = bootProps[key] || {}
            _merge[key] = _merge[key] || {}
            bootProps[key] = { ...bootProps[key], ...defaultProps}
            _merge[key] = {..._merge[key], ...reducers[key]}
        });
    })
    const _ac = {}
    Object.keys(_merge).forEach(key => {
        _ac[key] = combineHandleActions(key, _merge[key], bootProps[key])
    })
    return _ac
}
export const actionFetchItem = (type, action, loading = true, hasDispatchRedux = true) => {
    return (params/*{ignorarError:, body_rsa:{}, body_post:{}, body_view:{}} */) => new Promise((_resolve, _reject) => {
        if (loading) SDNavigation.navegar.push("carregando");
        fetchItem({
            type,
            action,
            ...params
        }).then(({response, posted}) => {
            if (loading) {
                SDNavigation.navegar.pop();
                setTimeout(() => {
                    if (hasDispatchRedux) GrupoRotas.store.dispatch({ type, response, posted });
                    else {
                        // console.log("NÃO ATUALIZA O REDUX");
                        // console.log({ type, response, posted });
                    }
                    _resolve({type, response, posted})
                }, 800);
            }
            else {
                if (hasDispatchRedux) GrupoRotas.store.dispatch({type, response, posted});
                else {
                    // console.log("NÃO ATUALIZA O REDUX");
                    // console.log({ type, response, posted });
                }
                _resolve({type, response, posted});
            }
        }).catch(_err => {
            if (loading) {
                setTimeout(() => {
                    SDNavigation.navegar.pop();
                    _reject(_err);
                }, 800);
            }
            else _reject(_err)
        });
    });
}
const dispatchRedux = (_args, _response, _resolve) => {
    const _total = _args.length - 1;
    let store = GrupoRotas.store.getState();
    _args.forEach(({ type, stateWarpKey}, index) => {
        if (index !== _total) {
            store[stateWarpKey][type] = __SD_REDUCERS_BOOT_OBJECT[stateWarpKey][type](store[stateWarpKey], _response[type])
        } else {
            GrupoRotas.store.dispatch({ type, ..._response[type] });
        }
    })
    _resolve(_response)
}
/*
[
    {
        type:LOGIN,
        stateWarpKey:"autenticacao",
        action:"usuario/login",
        ignorarError:false,
        body_rsa: {
            coleta_id,
            coluna: "data_checkin_unidade"
        }
    },
    {
        ignorarError: false,
        body_rsa: {
            coleta_id
        }
    }
] */
export const actionFetchParallel = (_args/*[{type:LOGIN, stateWarpKey:"autenticacao", action:"usuario/login", }] */, loading = true) => {
    return (params/*[{ignorarError:, body_rsa:{}, body_post:{}, body_view:{}}] */) => new Promise((_resolve, _reject) => {
        if (_args.length !== params.length) return _reject({type:"erro", mensagem:"A quantidade de parametros dentro das matrizes [_args] e [_params] tem que ser a mesma"});
        const post = _args.map((v, key) => (() => ({ ...params[key], ...v, key:v.key})));
        if (loading) SDNavigation.navegar.push("carregando");
        fetchItemsParallel(post).then((_response) => {
            if (loading) {
                SDNavigation.navegar.pop();
                setTimeout(() => {
                    dispatchRedux(_args, _response, _resolve)
                }, 800);
            }
            else {
                dispatchRedux(_args, _response, _resolve)
            }
        }).catch(_err => {
            if (loading) {
                setTimeout(() => {
                    SDNavigation.navegar.pop();
                    _reject(_err);
                }, 800);
            }
            else _reject(_err)
        });
    });
}
export const actionFetchRow = (_args/*[{type:LOGIN, stateWarpKey:"autenticacao", action:"usuario/login", }] */, loading = true) => {
    return (params/*[{ignorarError:, body_rsa:{}, body_post:{}, body_view:{}}] */) => new Promise((_resolve, _reject) => {
        if (_args.length !== params.length) return _reject({type:"erro", mensagem:"A quantidade de parametros dentro das matrizes [_args] e [_params] tem que ser a mesma"});
        // const post = _args.map((v, key) => (() => ({ ...params[key], ...v, key:v.key})));
        /*
        () => ({
 *			ignorarError:true,
 *			action: "usuario/login",
 *			key: "LOGIN",
 *			body_rsa: {
 *				email: "joisiney@gmail.com",
 *				senha: "020406"
 *			}
 *		}), */
        
        return false
        if (loading) SDNavigation.navegar.push("carregando");
        fetchItemsRow(post).then((_response) => {
            if (loading) {
                SDNavigation.navegar.pop();
                setTimeout(() => {
                    dispatchRedux(_args, _response, _resolve)
                }, 800);
            }
            else {
                dispatchRedux(_args, _response, _resolve)
            }
        }).catch(_err => {
            if (loading) {
                setTimeout(() => {
                    SDNavigation.navegar.pop();
                    _reject(_err);
                }, 800);
            }
            else _reject(_err)
        });
    });
}
/*[
            () => ({
                ignorarError: true,
                action: "usuario/login",
                key: "LOGIN",
                body_rsa: {
                    email: "joisiney@gmail.com",
                    senha: "020406"
                }
            }),
            () => ({
                ignorarError: true,
                action: "usuario/login",
                key: "LOGIN2",
                body_rsa: {
                    email: "joisiney@gmail.com",
                    senha: "020405"
                }
            })] */

/**
fetchItem({
		action:"usuario/login",
		key:"LOGIN",
		body_rsa:{
			email:"joisiney@gmail.com",
			senha:"020406"
		}
	}).then(_r => {
		console.log("then")
	}).catch(_err => {
		console.log("catch")
	})
 fetchItemsRow([
	() => ({
		ignorarError:true,
		action: "usuario/login",
		key: "LOGIN",
		body_rsa: {
			email: "joisiney@gmail.com",
			senha: "020406"
		}
	}),
	() => ({
		ignorarError: true,
		action: "usuario/login",
		key: "LOGIN2",
		body_rsa: {
			email: "joisiney@gmail.com",
			senha: "020405"
		}
	})]).then(_r => {
		console.log("then", _r)
}).catch(_err => {
	console.log("catch")
})
 */