import {cor} from '@root/app.json';
import {calcFence} from '@sd/uteis/permissions/index';
import {actionOpenMap} from '../actions/actionIndex';
import {actionCheckInUnidade} from '../actions/actionEstabelecimento';
import {cep} from '@sd/uteis/form/MaskString';
import {hora} from './index';
function pontoReferenciaUnidade(coleta, prepende = '', append = '') {
  const {ponto_referencia_unidade} = coleta;
  if (ponto_referencia_unidade !== '') {
    return `${prepende} ${ponto_referencia_unidade} ${append}`;
  }
  return '';
}
function complementoUnidade(coleta) {
  const {complemento_unidade} = coleta;
  if (complemento_unidade !== '') {
    return ` ( ${complemento_unidade} ${pontoReferenciaUnidade(coleta, '-')})`;
  } else {
    return pontoReferenciaUnidade(coleta, ' ( ', ' ) ');
  }
}
function numeroUnidade(coleta) {
  const {numero_unidade} = coleta;
  if (numero_unidade !== '') {
    return `nº ${numero_unidade}`;
  }
  return 'nº s/n';
}

export const mapEstabelecimento = ({
  coleta,
  raio,
  coleta_ids,
  navigate,
  push,
}) => {
  let horarios = [];
  if (!('cep_unidade' in coleta)) {
    return [];
  }
  const {
    cep_unidade,
    cidade_unidade,
    bairro_unidade,
    endereco_unidade,
    latitude_unidade: latitude,
    longitude_unidade: longitude,
    coleta_id,
    entregador_id,
    data_checkin_unidade,
    status_coleta_id,
    data_checkout_unidade,
  } = coleta;
  if (status_coleta_id === 1) {
    return [];
  }
  if (data_checkin_unidade !== null) {
    horarios.push(hora(data_checkin_unidade));
  }
  if (data_checkout_unidade !== null) {
    horarios.push(hora(data_checkout_unidade));
  }
  const {distancia, dentroDoRaio} = calcFence({latitude, longitude, raio});

  let buttons = [
    {
      icone: '',
      titulo: 'Rota',
      color: cor['12'],
      action: () => actionOpenMap({latitude, longitude}),
    },
  ];
  if (dentroDoRaio) {
    if (data_checkin_unidade === null) {
      buttons.push({
        icone: '',
        titulo: 'Cheguei',
        color: cor['13'],
        action: () =>
          actionCheckInUnidade({coleta_ids, entregador_id, dentroDoRaio, raio}),
      });
    } else if (data_checkout_unidade === null) {
      buttons.push({
        icone: '',
        titulo: 'Saindo',
        color: cor['10'],
        action: () => push('coletaCheckoutUnidade'),
      });
    }
  }
  const totalBtn = buttons.length;
  const name = `estabelecimento-coleta-id-${coleta_id}-status-id-${status_coleta_id}-btns-count-${totalBtn}`;
  return [
    {
      name,
      raio,
      distancia: distancia.toLocaleString('pt-BR'),
      dentroDoRaio,
      latitude,
      longitude,
      aba: 0,
      titulo: {
        bold: `Coleta${coleta_ids.indexOf(',') ? 's' : ''}`,
        normal: `#${coleta_ids
          .replace(/(,)([0-9]{2,})$/gi, ' e $2')
          .replace(/,/gi, ', ')}`,
      },
      nome: coleta.unidade,
      endereco: `${endereco_unidade}, ${numeroUnidade(
        coleta,
      )}, ${bairro_unidade} ${cidade_unidade} ${cep(
        cep_unidade,
      )} ${complementoUnidade(coleta)}`,
      horarios,
      buttons,
    },
  ];
};
