import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {buscarExtrato} from '@actions/extrato';
import Component from './Component';
export default function Disponibilidade({navigation}) {
  const [loading, setLoading] = useState(true);
  const [status_periodo, setStatus_periodo] = useState(1);
  let {filtros, extrato, entregador_id} = useSelector(
    // eslint-disable-next-line no-shadow
    ({autenticacao: {entregador_id}, extrato: {extrato, filtros}}) => ({
      filtros,
      extrato,
      entregador_id,
    }),
  );
  async function onRefresh(_resolve = null, statusPediodo = null) {
    if (statusPediodo !== null) {
      setStatus_periodo(statusPediodo);
    }
    setLoading(true);
    try {
      console.log('status_periodo==>', statusPediodo || status_periodo);
      await buscarExtrato({
        body_post: {
          status_periodo: statusPediodo || status_periodo,
          entregador_id,
        },
      });
    } catch ({mensagem}) {
      navigation.push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem,
        },
      });
    }
    setLoading(false);
    if (_resolve !== null) {
      _resolve();
    }
  }
  useEffect(() => {
    async function loadInit() {
      await onRefresh();
    }
    loadInit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const {mes_atual, totalPeriodo, total_mes_atual} = extrato;
  const dados = {
    entregador_id,
    loading,
    mes_atual,
    totalPeriodo,
    total_mes_atual,
    navigation,
    load: onRefresh,
    refresh: onRefresh,
    data: loading ? [undefined, undefined, undefined] : extrato.extrato,
    filtros,
  };
  return <Component {...dados} />;
}
