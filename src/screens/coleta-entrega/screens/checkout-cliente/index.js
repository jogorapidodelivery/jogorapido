import React, {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {coletaBuscarProdutos} from '@actions/';
import CheckoutClienteComponent from './component';
import {mapProdutos} from '../checkout-estabelecimento/commands/mapProdutos';
import {SDNavigation} from '@sd/navigation';
function CheckoutCliente(props) {
  const {
    navigation: {
      state: {
        params: {
          params: {coleta_id},
        },
      },
    },
  } = props;
  const {
    entregador_id,
    coleta: [{forma_pagamento}],
  } = useSelector(({autenticacao: {coleta}}) => ({
    entregador_id,
    coleta: coleta.filter(({coleta_id: id}) => coleta_id === id),
  }));
  // Sincronizar dados da coleta com o servidor
  const [refreshing, setRefreshing] = useState(false);

  // Lista de produtos
  const [produtos, setProdutos] = useState([]);

  // Método para produtos no servidor.
  const carregarProdutos = useCallback(async () => {
    try {
      const {
        response: {produtos: prod},
      } = await coletaBuscarProdutos({
        body_rsa: {
          coleta_id,
        },
      });
      const list = mapProdutos(prod);
      setProdutos(list);
    } catch (_err) {
      console.warn(_err);
    }
  }, [coleta_id]);
  // Ação para buscando produtos no servidor.
  async function onRefresh() {
    setRefreshing(true);
    const {push} = SDNavigation.navegar;
    try {
      await carregarProdutos();
    } catch ({mensagem}) {
      // eslint-disable-next-line no-ex-assign
      mensagem = mensagem || 'Página não encontrada status[500]';
      push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
    }
    setRefreshing(false);
  }

  // Ação para buscar produtos ao iniciar
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  // total Selecionado
  const footerData = {coleta_id, entregador_id, forma_pagamento};

  return (
    <CheckoutClienteComponent
      data={produtos}
      footerData={footerData}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
export default CheckoutCliente;
