import { RSA } from "react-native-rsa-native"
import "abortcontroller-polyfill/dist/polyfill-patch-fetch"
import { empty } from "../uteis/StringUteis"
export const PUBLIC_KEY_RSA = "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAwLS4MHfM6d9KQYOncCD1\ntGfCbcWcmsVBmpeIQ0y0JBLyZ1M5ucsMXju7LpXJ2c0AeG8X/T1uSb1lcFOqXw3f\nIzqUzT3BK8E2j/SrSejiKBpyGhTvl77ZxkTLOBuddx6XLVcr8granb+/vt1NQaJT\niPZg1odNte+8a8rZTD+agNs7bAcZwjs+xwKeIBdIR7Rcxf4sCnP30AtFbZIWSu/t\nUWvERxWH90WS/D1w7+uVTUC8ShCOTYljiBBvnB4U9AQo8m0izito0e2oo4rSzkLF\np9YkEyQN7wAldsYYkBkth0PONH3I/WjsCFy4AyOPPwDdiGx9waUykYi4NX5UVS6m\nIwIDAQAB\n-----END PUBLIC KEY-----";
import Ajax from "./Ajax"
const _encryptAjax = (_resolve, _reject, _obj, _endGroupLogger = true, _loggerID = 0, _callBackDestroy = undefined) => {
	const _ajax = _args => {
		let destroy = Ajax(_args, r => {
			_resolve(r)
		}, r => {
			_reject(r)
		}, _loggerID)
		if (_callBackDestroy !== undefined) _callBackDestroy({ key: _loggerID, destroy })
	}
	if (empty(_obj.body_post)) _obj.body_post = {}
	if (empty(_obj.body_rsa)) {
		_ajax(_obj)
	} else {
		const _dataEncrypt = JSON.stringify(_obj.body_rsa)
		// console.log(`${_loggerID}) START RSA`, _dataEncrypt)
		RSA.encrypt(_dataEncrypt, PUBLIC_KEY_RSA).then(_result => {
			if (empty(_result)) {
				const _rTmp = { status: "erro", mensagem: "Não foi possível criptografar os dados a ser enviados." }
				// console.log(`${_loggerID}) RSA FAILED`, _rTmp)
				_reject(_rTmp)
			} else {
				// console.log(`${_loggerID}) RSA SUCCESS`, { postdata: _result })
				_obj.body_post.postdata = _result
				_ajax(_obj)
			}
		}).catch(_err => {
			console.log(`${_loggerID}) RSA FAILED`, _err)
			_reject({ status: "erro", mensagem: _err.message })
		})
	}
}
/**
 * Obs: No arquivo app.json tem que ter a variável {"baseApp": "https://CLIENTE.com.br/"} para concatenar com a action
 * Este método serve para  fazer um única requisição ajax. 
 * Ex:
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
 * @param _obj - { ignorarError?: boolean action?: String key?: String body_view?: any, body_rsa?: any, body_post?: any }
 * @param _endGroupLogger  - Variavel de uso interno. Ela serve para impedir que os console.groupEnd seja executado ou não
 * @param _loggerID - Contador de logs, ele coloca número nos logs
 * @return Promise -> Promessa de sucesso ou erro da solicitação
 */
export const fetchItem = (_obj, _endGroupLogger = true, _loggerID = 0) => {
	return new Promise((_resolve, _reject) => {
		_encryptAjax(_resolve, _reject, _obj, _endGroupLogger, _loggerID)
	})
}
/**
 * Este método serve para fazer uma lista de solicitações ajax.
 * O argumento _itens recebe uma lista de funcões responsáveis por retornar os parametros a serem enviados no ajax. Em especial, ele segue uma fila, e o segundo da fila recebe os dados do primeiro. Isto seve para solicitações encadiadas quando a proxima solicitação depende do resultado da primeira.
 * EX:
 * fetchItemsRow([
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
 * @param _itens - [
 *		() => ({
 *			ignorarError:true,
 *			action: "usuario/login",
 *			key: "LOGIN",
 *			body_rsa: {
 *				email: "joisiney@gmail.com",
 *				senha: "020406"
 *			}
 *		})]
 * @return Promise -> Promessa de sucesso ou erro da solicitação
 */
export const fetchItemsRow = (_itens) => {
	_itens.reverse()
	let counterLog = 0;
	const _rowFetchPosts = (_resolve, _reject, _dataRowPosts) => {
		const _filter = _itens.pop();
		const _params = _filter({
			payload: _dataRowPosts
		});
		fetchItem(_params, false, counterLog++).then(({ response, posted, mensagem, status }) => {
			_dataRowPosts[posted.type] = { status, mensagem, response, posted }
			if (_itens.length > 0) _rowFetchPosts(_resolve, _reject, _dataRowPosts)
			else {
				_resolve(_dataRowPosts);
			}
		}).catch(_err => {
			if (_itens.length > 0) {
				if (_params.ignorarError) _rowFetchPosts(_resolve, _reject, _dataRowPosts)
				else {
					_reject(_err)
				}
			} else {
				if (_params.ignorarError) {
					_resolve(_dataRowPosts)
				}
				else {
					_reject(_err)
				}
			}
		})
	}
	return new Promise((_resolve, _reject) => {
		_rowFetchPosts(_resolve, _reject, {})
	})
}
/**
 * Documentação identica ao método fetchItemsRow, com excessão que ele faz as solicitações em paralelo, não sendo possivel pegar argumentos do retorno do ajax anterior. Uma vantagem é que o fato de ser executado em paralelo, ele é muito mais rápido.
 * @param _itens 
 */
export const fetchItemsParallel = _itens => {
	_itens.reverse()
	const _rowFetchPosts = (_resolve, _reject, _dataRowPosts) => {
		const _total = _itens.length - 1;
		let _counterThen = 0;
		let _counterCatch = 0;
		const _listTmp = _itens.map((_filter, _key) => {
			const _params = _filter({
				payload: _dataRowPosts
			});
			const _p = new Promise((_resolve, _reject) => {
				_encryptAjax(_resolve, _reject, _params, false, _key);
			});
			_p.then(({ response, posted, mensagem, status }) => {
				_dataRowPosts[posted.type] = { status, mensagem, response, posted }
				if (_total == _counterThen + _counterCatch) {
					_resolve(_dataRowPosts);
				}
				_counterThen++;
			}).catch(_e => {
				// _state.ERROR[_e.posted.key] = _e
				if (_total == _counterThen + _counterCatch) {
					_resolve(_dataRowPosts);
				}
				_counterCatch++;
			});
			return _p
		});
	}
	return new Promise((_resolve, _reject) => {
		_rowFetchPosts(_resolve, _reject, {});
	});
}