import { fetchItem, fetchItemsRow } from "@sd/fetch";
import { GrupoRotas } from "@sd/navigation/revestir";
import { SDNavigation } from "@sd/navigation";
import { handleActions } from 'redux-actions';
export const combineHandleActions = (_obj, _defaultState) => {
    let _ac = {};
    Object.keys(_obj).forEach(_v => {
        if(_v.indexOf(",") !== -1) {
            _v.split(",").forEach(_v2 => {
                _ac[_v2] = _obj[_v];
            })
        } else {
            _ac[_v] = _obj[_v];
        }
    })
    return handleActions(_ac, _defaultState)
}
export const actionFetchItem = (type, action, loading = true) => {
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
                    GrupoRotas.store.dispatch({ type, response, posted });
                    _resolve({type, response, posted})
                }, 800);
            }
            else {
                GrupoRotas.store.dispatch({type, response, posted});
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
export const actionFetchRow = (type, itens /*[{action:, ignorarError:, body_rsa:{}, body_post:{}, body_view:{}}] */) => {

}
export const actionFetchParallel = (type, itens /*[{action:, ignorarError:, body_rsa:{}, body_post:{}, body_view:{}}] */) => {

}
export const actionPure = (type, params = {}) => {

}
/**store.dispatch({
  type: 'ADD_TODO',
  text: 'Read the docs'
})
console.log(store.getState()) */

/**
 * fetchItem({
 *		action:"usuario/login",
 *		key:"LOGIN",
 *		body_rsa:{
 *			email:"joisiney@gmail.com",
 *			senha:"020406"
 *		}
 *	}).then(_r => {
 *		console.log("then")
 *	}).catch(_err => {
 *		console.log("catch")
 *	})
 *  * fetchItemsRow([
 *		() => ({
 *			ignorarError:true,
 *			action: "usuario/login",
 *			key: "LOGIN",
 *			body_rsa: {
 *				email: "joisiney@gmail.com",
 *				senha: "020406"
 *			}
 *		}),
 *		() => ({
 *			ignorarError: true,
 *			action: "usuario/login",
 *			key: "LOGIN2",
 *			body_rsa: {
 *				email: "joisiney@gmail.com",
 *				senha: "020405"
 *			}
 *		})]).then(_r => {
 *			console.log("then", _r)
 *	}).catch(_err => {
 *		console.log("catch")
 *	})
 */