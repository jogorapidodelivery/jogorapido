import {fetchItem} from '@sd/fetch';
import {GrupoRotas} from '@sd/navigation/revestir';
import {SDNavigation} from '@sd/navigation';
import {handleActions} from 'redux-actions';
let __SD_REDUCERS_BOOT_OBJECT = {};
export const mergeHandleActions = (...args) => {
  const combineHandleActions = (group, reducers, defaultProps) => {
    __SD_REDUCERS_BOOT_OBJECT[group] = __SD_REDUCERS_BOOT_OBJECT[group] || {};
    let _ac = {};
    Object.keys(reducers).forEach(_v => {
      if (_v.indexOf(',') !== -1) {
        _v.split(',').forEach(_v2 => {
          __SD_REDUCERS_BOOT_OBJECT[group][_v2] = _ac[_v2] = reducers[_v];
        });
      } else {
        __SD_REDUCERS_BOOT_OBJECT[group][_v] = _ac[_v] = reducers[_v];
      }
    });

    return handleActions(_ac, defaultProps);
  };
  let _merge = {};
  let bootProps = {};
  args.forEach(({defaultProps, reducers}) => {
    Object.keys(reducers).forEach(key => {
      bootProps[key] = bootProps[key] || {};
      _merge[key] = _merge[key] || {};
      bootProps[key] = {...bootProps[key], ...defaultProps};
      _merge[key] = {..._merge[key], ...reducers[key]};
    });
  });
  const _ac = {};
  Object.keys(_merge).forEach(key => {
    _ac[key] = combineHandleActions(key, _merge[key], bootProps[key]);
  });
  return _ac;
};
export const actionFetchItem = (
  type,
  action,
  loading = true,
  hasDispatchRedux = true,
  baseUrl = 'php' /*node || php */,
  method = 'POST',
) => {
  return (
    params /*{ignorarError:, body_rsa:{}, body_post:{}, body_view:{}} */,
  ) =>
    new Promise((_resolve, _reject) => {
      if (loading) {
        SDNavigation.navegar.push('carregando');
      }
      fetchItem({
        type,
        action,
        method,
        baseUrl,
        ...params,
      })
        .then(({response, posted}) => {
          if (loading) {
            SDNavigation.navegar.pop();
            setTimeout(() => {
              if (hasDispatchRedux) {
                GrupoRotas.store.dispatch({type, response, posted});
              }
              _resolve({type, response, posted});
            }, 800);
          } else {
            if (hasDispatchRedux) {
              GrupoRotas.store.dispatch({type, response, posted});
            }
            _resolve({type, response, posted});
          }
        })
        .catch(_err => {
          if (loading) {
            setTimeout(() => {
              SDNavigation.navegar.pop();
              _reject(_err);
            }, 800);
          } else {
            _reject(_err);
          }
        });
    });
};

export const actionObject = type => _response =>
  new Promise((resolve, reject) => {
    try {
      GrupoRotas.store.dispatch({type, ..._response});
      resolve();
    } catch (err) {
      reject(err);
    }
  });
export const actionObjectPostStatic = (type, ..._args) => _posted =>
  new Promise(resolve => {
    let _data = {response: _posted.response, posted: {}};
    ['body_rsa', 'body_view', 'body_post', 'body_get'].forEach(key => {
      if (_posted[key] !== undefined) {
        _data.posted = {..._data.posted, ..._posted[key]};
      }
    });
    const _response = {type, ..._data};
    GrupoRotas.store.dispatch(_response);
    resolve(_response);
  });
