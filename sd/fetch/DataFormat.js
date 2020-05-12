/* eslint-disable no-unused-vars */
import {Platform} from 'react-native';
import {timeoutSlow, timeoutLong} from '@root/app.json';
import {getBaseUrl} from '@sd/fetch/baseUrl';
const URLSearchParams = require('url-search-params');
import {empty} from '@sd/uteis/StringUteis';
export let globalParams = {
  app_id: '',
  latitude: 0,
  longitude: 0,
};
const _getDefaultParams = () => {
  const data = new Date();
  const _m = ('0' + (data.getUTCMonth() + 1)).substr(-2); // mês
  const _d = ('0' + (data.getUTCDate() + 1)).substr(-2); // Dia
  const _a = data.getFullYear(); // Ano
  const _h = ('0' + (data.getHours() + 1)).substr(-2); // Hora
  const _mn = ('0' + (data.getMinutes() + 1)).substr(-2); // Minutos
  const _s = ('0' + (data.getSeconds() + 1)).substr(-2); // Segundos
  return {
    current_time: `${_h}:${_mn}:${_s}`,
    data_celular: `${_a}-${_m}-${_d} ${_h}:${_mn}:${_s}`,
    os: Platform.OS,
    ...globalParams,
  };
};
export default (_obj, _loggerID = 0) => {
  const url = getBaseUrl(_obj);
  let _urlGet = `${url}?debug=1`;
  _obj.body_post = {..._obj.body_post, ..._getDefaultParams()};
  const {baseUrl, method} = _obj;
  let _data = baseUrl === 'node' ? new URLSearchParams() : new FormData();

  let timeout = timeoutSlow;
  for (const a in _obj.body_post) {
    const value = _obj.body_post[a];
    if (empty(value)) {
      continue;
    }
    if (Array.isArray(value)) {
      for (let b in value) {
        const v2 = value[b];
        if (empty(v2)) {
          continue;
        }
        if (typeof v2 === 'object') {
          for (let c in v2) {
            const v3 = v2[c];
            if (empty(v3)) {
              continue;
            }
            _urlGet += `&${a}[${b}][${c}]=${escape(v3)}`;
            _data.append(`${a}[${b}][${c}]`, v3);
          }
          continue;
        }
        _urlGet += `&${a}[${b}]=${escape(v2)}`;
        _data.append(`${a}[${b}]`, v2);
      }
      continue;
    } else if (typeof value === 'object') {
      if (value.uri === undefined) {
        for (const d in value) {
          const v4 = value[d];
          if (empty(v4)) {
            continue;
          }
          _urlGet += `&${a}[${d}]=${escape(v4)}`;
          _data.append(`${a}[${d}]`, v4);
        }
        continue;
      } else {
        timeout = timeoutLong;
      }
    }
    _urlGet += `&${a}=${escape(value)}`;
    _data.append(a, value);
  }
  console.log(`${_loggerID}) FORMAT POST`, {get: _urlGet});
  // console.log("action)", _obj.action)
  return {
    body: baseUrl === 'node' ? _data.toString() : _data,
    url: method === 'GET' ? _urlGet : url,
    timeout,
  };
};
