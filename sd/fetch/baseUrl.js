import {on, off} from '@root/app.json';
let _dev = __DEV__;
let baseAppNode = _dev ? off.baseUrlNode : on.baseUrlNode;
let baseUrlApp = _dev ? off.baseUrl : on.baseUrl;
export const setBaseUrl = dev => {
  _dev = dev;
  baseUrlApp = dev ? off.baseUrl : on.baseUrl;
  baseAppNode = dev ? off.baseUrlNode : on.baseUrlNode;
};
export const hasDev = () => {
  return _dev;
};
export const getBaseUrl = ({baseUrl: tipoDeUrl, action}) => {
  if (tipoDeUrl === 'php') {
    return `${baseUrlApp}${action}`;
  }
  return `${baseAppNode}${action}`;
};
