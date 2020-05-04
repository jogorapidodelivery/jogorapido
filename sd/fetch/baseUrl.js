import {baseUrl, baseUrlNode} from '@root/app.json';
let _dev = __DEV__;
const baseAppNode = _dev ? baseUrlNode.off : baseUrlNode.on;
let baseUrlApp = _dev ? baseUrl.off : baseUrl.on;
export const setBaseUrl = dev => {
  _dev = dev;
  baseUrlApp = dev ? baseUrl.off : baseUrl.on;
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
