import React, {useEffect, useState, useCallback} from 'react';

import {coletaBuscarProdutos} from '@actions/';
import CheckoutClienteComponent from '../checkout-estabelecimento/component';
import {mapColetas} from '../checkout-estabelecimento/commands/mapProdutos';
import Footer from './partial/footer';
function CheckoutCliente({
  navigation: {
    navigate,
    pop,
    popToTop,
    push,
    state: {
      params: {
        params: {coleta_id, forma_pagamento, entregador_id},
      },
    },
  },
}) {
  // Sincronizar dados da coleta com o servidor
  const [refreshing, setRefreshing] = useState(false);

  // Load error
  const [loadError, setLoadError] = useState(false);

  // Lista de produtos
  const [produtos, setProdutos] = useState([]);

  // Lista de produtos
  const [totalPedidosSelecionado, setTotalPedidosSelecionado] = useState(0);
  const [totalDeProdutosNasColetas, setTotalDeProdutosNasColetas] = useState(0);

  // Variavel de controle para atualizar o SectionList
  const [changeCheckBox, setChangeCheckBox] = useState(
    'section-0-actived-0-index-0',
  );

  // Método para produtos no servidor.
  const carregarProdutos = useCallback(async () => {
    setLoadError(false);
    try {
      const {
        response: {produtos: prod},
      } = await coletaBuscarProdutos({
        body_rsa: {
          coleta_id,
        },
      });
      const {coletas, totalDeProdutosNasColetas: total} = mapColetas(prod);
      setTotalDeProdutosNasColetas(total);
      setProdutos(coletas);
      setTotalPedidosSelecionado(0);
    } catch (_err) {
      setLoadError(true);
    }
  }, [coleta_id]);
  // Ação para buscando produtos no servidor.
  async function onRefresh() {
    setRefreshing(true);
    await carregarProdutos();
    setRefreshing(false);
  }

  // Selecionando itens no checkbox
  function onChange({sectionIndex, index}) {
    const {actived} = produtos[sectionIndex].data[index];
    setTotalPedidosSelecionado(totalPedidosSelecionado + (!actived ? 1 : -1));
    produtos[sectionIndex].data[index].actived = !actived;
    setProdutos(produtos);
    setChangeCheckBox(
      `section-${sectionIndex}-actived-${!actived ? 0 : 1}-index-${index}`,
    );
  }
  // Ação para buscar produtos ao iniciar
  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  // total Selecionado
  const footerData = {
    coleta_id,
    forma_pagamento,
    totalPedidosSelecionado,
    entregador_id,
    totalPedidos: totalDeProdutosNasColetas,
  };

  return (
    <CheckoutClienteComponent
      pop={pop}
      push={push}
      navigate={navigate}
      data={produtos}
      footerData={footerData}
      refreshing={refreshing}
      onErrorReload={carregarProdutos}
      loadError={loadError}
      onRefresh={onRefresh}
      changeCheckBox={changeCheckBox}
      onChange={onChange}
      ListFooterComponent={Footer}
    />
  );
}
export default CheckoutCliente;
