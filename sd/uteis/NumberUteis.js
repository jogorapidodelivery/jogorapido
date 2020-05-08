import {Dimensions, PixelRatio} from 'react-native';
import {Platform} from 'react-native';

if (Platform.OS === 'android') {
  require('intl');
  require('intl/locale-data/jsonp/pt-BR');
}
const {width: w, height: h} = Dimensions.get('window');
const scale = Math.min(w, h) / 370;

export const normalize = size => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
export const moeda = value => {
  const result = Number(value).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
  });
  return result;
};
export const minChart = (_n, _total = 2) => {
  if (_n === null) {
    return '';
  }
  let _s = `${_n}`;
  let _addZeroEsc = _total - _s.length;
  const _concat = Array.from({length: _addZeroEsc}, () => 0).join('');
  return _concat + _s;
};
export const toNumber = v => {
  if (typeof v !== 'number') {
    v = `${v}`.replace(/[^0-9\.,]+/, '').replace(',', '.');
  }
  return Number(v);
};
export const latLngDist = (lat1, lng1, lat2, lng2) => {
  lat1 = Number(lat1);
  lng1 = Number(lng1);
  lat2 = Number(lat2);
  lng2 = Number(lng2);
  const _min = Math.min(lat1, lng1, lat2, lng2);
  if (_min === 0) {
    return 0;
  }
  const radlat1 = (Math.PI * lat1) / 180;
  const radlat2 = (Math.PI * lat2) / 180;
  const theta = lng1 - lng2;
  const radtheta = (Math.PI * theta) / 180;
  let dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (dist < 0) {
    dist *= -1;
  }
  // Convertendo para KM
  dist = dist * 1.609344;
  return dist;
};
export const latLngDistKmOrM = (lat1, lng1, lat2, lng2) => {
  const dist = latLngDist(lat1, lng1, lat2, lng2);
  if (dist < 1) {
    return dist.toFixed(3).replace('0.', '') + 'm';
  }
  return dist.toFixed(3) + 'km';
};
