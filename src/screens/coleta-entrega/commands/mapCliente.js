import {cor} from '@root/app.json';
import {hora} from './index';
import {actionLigar, actionOpenMap} from '../actions/actionIndex';
import {calcFence} from '@sd/uteis/permissions/index';
import {cep} from '@sd/uteis/form/MaskString';
import {actionCheckinCliente} from '../actions/actionCliente';
function pontoReferenciaCliente(coleta, prepend = '', append = '') {
  const {ponto_referencia_cliente} = coleta;
  if (ponto_referencia_cliente !== '') {
    return `${prepend} ${ponto_referencia_cliente} ${append}`;
  }
  return '';
}
function numeroCliente(coleta) {
  const {numero_cliente} = coleta;
  if (numero_cliente !== '') {
    return `nº ${numero_cliente}`;
  }
  return 'nº s/n';
}
function complementoCliente(coleta) {
  const {complemento_cliente} = coleta;
  if (complemento_cliente !== '') {
    return ` ( ${complemento_cliente} ${pontoReferenciaCliente(coleta, '-')})`;
  } else {
    return ` ${pontoReferenciaCliente(coleta, ' ( ', ' )')}`;
  }
}
export const mapCliente = ({coleta, raio, index, push, navigate}) => {
  const {
    coleta_id,
    entregador_id,
    telefone_celular: telefone,
    latitude_cliente: latitude,
    longitude_cliente: longitude,
    cep_cliente,
    cidade_cliente,
    bairro_cliente,
    endereco_cliente,
    data_checkin_cliente,
    data_checkout_cliente,
    data_checkout_unidade,
    status_coleta_id,
  } = coleta;
  let endereco = 'Para visualizar e necessário dar saída no estabelecimento';
  let horarios = [];
  if (data_checkin_cliente !== null) {
    horarios.push(hora(data_checkin_cliente));
  }
  if (data_checkout_cliente !== null) {
    horarios.push(hora(data_checkout_cliente));
  }
  if (horarios.length === 2 || status_coleta_id === 1) {
    return null;
  }
  if (data_checkout_unidade !== null) {
    endereco = `${endereco_cliente}, ${numeroCliente(
      coleta,
    )}, ${bairro_cliente}, ${cidade_cliente} ${cep(
      cep_cliente,
    )} ${complementoCliente(coleta)}`;
  }
  let buttons = [];
  let distancia = null;
  if (data_checkout_unidade !== null) {
    if (data_checkout_cliente === null) {
      buttons.push({
        icone: '',
        titulo: null,
        color: cor['08'],
        action: () => actionLigar(telefone),
      });
    }
    if (data_checkin_cliente === null) {
      buttons.push({
        icone: '',
        titulo: 'Rota',
        color: cor['12'],
        action: () => {
          return actionOpenMap({latitude, longitude});
        },
      });
    }

    const {dentroDoRaio, distancia: dist} = calcFence({
      latitude,
      longitude,
      raio,
    });
    distancia = dist;
    if (dentroDoRaio) {
      if (data_checkin_cliente === null) {
        buttons.push({
          icone: '',
          titulo: 'Cheguei',
          color: cor['13'],
          action: () =>
            actionCheckinCliente({
              index,
              coleta_id,
              entregador_id,
              dentroDoRaio,
              raio,
              push,
              navigate,
            }),
        });
      } else if (data_checkout_cliente === null) {
        if (coleta.forma_pagamento === 'cartão') {
          buttons.push({
            icone: '',
            titulo: 'Saindo', // Receber
            color: cor['10'],
            action: () => push('coletaCheckoutCliente', {params: {coleta_id}}),
          });
        } else {
          buttons.push({
            icone: '',
            titulo: 'Saindo',
            color: cor['10'],
            action: () => push('coletaCheckoutCliente', {params: {coleta_id}}),
          });
        }
      }
    }
  }
  const name = `cliente-coleta-id-${coleta.coleta_id}-status-id-${
    coleta.status_coleta_id
  }-btns-count-${buttons.length}`;
  return {
    name,
    distancia,
    aba: 1,
    titulo: {
      bold: 'Coleta',
      normal: `#${coleta.coleta_id}`,
    },
    nome: coleta.cliente,
    endereco,
    horarios,
    buttons,
  };
};
