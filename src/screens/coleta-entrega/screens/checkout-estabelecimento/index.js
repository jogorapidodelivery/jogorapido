import React, {useEffect, useCallback, useState} from 'react';
import {useSelector} from 'react-redux';
import {coletaBuscarProdutos} from '@actions/';
import CheckoutUnidadeComponent from './component';
import {mapProdutos} from './commands/mapProdutos';
import {SDNavigation} from '@sd/navigation';
function CheckoutUnidade(props) {
  const {coleta_ids, entregador_id} = useSelector(
    ({autenticacao: {coleta}}) => ({
      coleta_ids: coleta.map(({coleta_id}) => coleta_id).join(','),
      entregador_id,
    }),
  );

  // Sincronizar dados da coleta com o servidor
  const [refreshing, setRefreshing] = useState(false);

  // Lista de produtos
  const [produtos, setProdutos] = useState([]);

  // Lista de produtos
  const [totalPedidosSelecionado, setTotalPedidosSelecionado] = useState(0);

  // Variavel de controle para atualizar o SectionList
  const [changeCheckBox, setChangeCheckBox] = useState(
    'section-0-actived-0-index-0',
  );

  // Método para produtos no servidor.
  const carregarProdutos = useCallback(async () => {
    try {
      const {
        response: {produtos: prod},
      } = await coletaBuscarProdutos({
        body_rsa: {
          coleta_id: coleta_ids,
        },
      });
      const list = mapProdutos(prod);
      setProdutos(list);
      setTotalPedidosSelecionado(0);
    } catch (_err) {
      console.warn(_err);
    }
  }, [coleta_ids]);
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
    totalPedidos: produtos.length,
  };

  return (
    <CheckoutUnidadeComponent
      data={produtos}
      footerData={footerData}
      refreshing={refreshing}
      onRefresh={onRefresh}
      changeCheckBox={changeCheckBox}
      onChange={onChange}
    />
  );
}
export default CheckoutUnidade;
