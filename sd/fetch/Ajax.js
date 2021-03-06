import mountFormData from './DataFormat';
import {empty, str2slug} from '@sd/uteis/StringUteis';

const obj = {
  ignorarError: false,
  action: '',
  key: '',
  body_view: null,
  body_rsa: null,
  body_post: null,
};
export default (_obj = obj, _resolve, _reject, _loggerID = 0) => {
  // eslint-disable-next-line no-undef
  let headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Accept-Encoding', 'gzip');
  const {baseUrl: baseUrlArgument, method} = _obj;
  if (baseUrlArgument === 'php') {
    headers.append('Content-Type', 'multipart/form-data');
  } else {
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }
  const {body, timeout, url} = mountFormData(_obj, _loggerID);
  // eslint-disable-next-line no-eval
  let controller = eval('new AbortController()');
  const {signal} = controller;
  const _params = {
    signal,
    method: method || 'POST',
    headers,
    ...(method === 'POST' ? {body} : {}),
  };
  let interval = setTimeout(() => {
    controller.abort();
    interval = undefined;
    controller = undefined;
  }, timeout);
  fetch(url, _params)
    .then(response => {
      return response.json();
    })
    .then(response => {
      if (!empty(interval)) {
        clearTimeout(interval);
        interval = undefined;
        controller = undefined;
      }
      if (!empty(_obj.body_post.postdata)) {
        delete _obj.body_post.postdata;
      }
      const {action, type, body_view, body_post, body_rsa} = _obj;
      let {key} = _obj;
      key = key || str2slug(action);
      const {data, mensagem, status} = response;
      const _r = {
        posted: {
          action,
          type,
          key,
          ...body_view,
          ...body_post,
          ...body_rsa,
        },
        response: data,
        mensagem,
        status,
      };
      if ('sucesso'.indexOf(response.status) !== -1) {
        _resolve(_r);
      } else {
        _reject(_r);
      }
    })
    .catch(_err => {
      if (!empty(interval)) {
        clearTimeout(interval);
        interval = undefined;
        controller = undefined;
      }

      console.log(`${_loggerID}) LOAD FAILED`, {
        stack: _err.stack,
        mensagem: _err.message,
      });
      const {action, key, body_view, body_post, body_rsa} = _obj;
      let _tmp = {
        posted: {
          action,
          key: key || str2slug(action),
          ...body_view,
          ...body_post,
          ...body_rsa,
        },
        status: 'erro',
        mensagem: _err.message,
      };
      const _strTmp = _err.message.toLowerCase();
      if (_strTmp.indexOf('network request failed') !== -1) {
        _tmp.mensagem = 'Falha na solicitação de rede. Tente novamente';
      } else if (_strTmp.indexOf('unexpected token < in json') !== -1) {
        _tmp.mensagem =
          'A informação retornada pelo servidor não tem formato JSON válido';
      }
      _reject(_tmp);
    });
  return () => {
    if (controller !== undefined) {
      controller.abort();
    }
    if (interval !== undefined) {
      clearTimeout(interval);
    }
  };
};
