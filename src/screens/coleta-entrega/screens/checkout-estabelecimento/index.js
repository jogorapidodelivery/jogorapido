import React, {useEffect, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {coletaBuscarProdutos} from '@actions/';
import CheckoutUnidadeComponent from './component';
import {mapColetas} from './commands/mapProdutos';
import Footer from './partial/footer';
function CheckoutUnidade({navigation: {navigate, pop, popToTop, push}}) {
  const {coleta_ids, entregador_id} = useSelector(({autenticacao}) => {
    const {entregador_id: id, coleta} = autenticacao;
    return {
      coleta_ids: coleta.map(({coleta_id}) => coleta_id).join(','),
      entregador_id: id,
    };
  });

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
    if (coleta_ids.length > 0) {
      setLoadError(false);
      try {
        const {
          response: {produtos: prod},
        } = await coletaBuscarProdutos({
          body_rsa: {
            coleta_id: coleta_ids,
          },
        });
        const {coletas, totalDeProdutosNasColetas: total} = mapColetas(prod);
        setTotalDeProdutosNasColetas(total);
        setProdutos(coletas);
        setTotalPedidosSelecionado(0);
      } catch (_err) {
        setLoadError(true);
      }
    } else {
      popToTop('home');
    }
  }, [coleta_ids, popToTop]);
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
    coleta_ids,
    entregador_id,
    totalPedidosSelecionado,
    totalPedidos: totalDeProdutosNasColetas,
  };
  return (
    <CheckoutUnidadeComponent
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
export default CheckoutUnidade;
