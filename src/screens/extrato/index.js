import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {buscarExtrato} from '@actions/extrato';
import Component from './Component';
export default function Extrato({navigation}) {
  const [loading, setLoading] = useState(true);
  const [status_periodo, setStatus_periodo] = useState(1);
  let {
    mes_atual,
    totalPeriodo,
    total_mes_atual,
    filtros,
    extrato,
    entregador_id,
  } = useSelector(({autenticacao, extrato: extratoGroup}) => {
    return {
      ...extratoGroup,
      ...autenticacao,
    };
  });
  async function onRefresh(_resolve = null, statusPediodo = null) {
    if (statusPediodo !== null) {
      setStatus_periodo(statusPediodo);
    }
    setLoading(true);
    try {
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
  const dados = {
    entregador_id,
    loading,
    mes_atual,
    totalPeriodo,
    total_mes_atual,
    navigation,
    load: onRefresh,
    refresh: onRefresh,
    data: loading ? [undefined, undefined, undefined] : extrato,
    filtros,
  };
  return <Component {...dados} />;
}
