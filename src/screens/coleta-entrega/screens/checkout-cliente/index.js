import React, {useEffect, useState, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {coletaBuscarProdutos} from '@actions/';
import CheckoutClienteComponent from './component';
import {mapProdutos} from '../checkout-estabelecimento/commands/mapProdutos';
import {mapSelector} from './commands/mapSelector';
function CheckoutCliente({
  navigation: {
    push,
    navigate,
    pop,
    state: {
      params: {
        params: {coleta_id},
      },
    },
  },
}) {
  const {entregador_id, forma_pagamento} = useSelector(
    mapSelector({coleta_id}),
  );
  // Sincronizar dados da coleta com o servidor
  const [refreshing, setRefreshing] = useState(false);

  // Lista de produtos
  const [produtos, setProdutos] = useState([]);

  // Método para produtos no servidor.
  const carregarProdutos = useCallback(async () => {
    if (forma_pagamento) {
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
    }
  }, [coleta_id, forma_pagamento]);

  // Ação para buscando produtos no servidor.
  async function onRefresh() {
    if (forma_pagamento) {
      setRefreshing(true);
      try {
        await carregarProdutos();
      } catch ({mensagem}) {
        // eslint-disable-next-line no-ex-assign
        mensagem = mensagem || 'Página não encontrada status[500]';
        push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
      }
      setRefreshing(false);
    }
  }

  // Ação para buscar produtos ao iniciar
  useEffect(() => {
    if (forma_pagamento) {
      carregarProdutos();
    }
  }, [carregarProdutos, forma_pagamento]);

  // total Selecionado
  const footerData = {coleta_id, entregador_id, forma_pagamento};
  return (
    <CheckoutClienteComponent
      data={produtos}
      push={push}
      navigate={navigate}
      pop={pop}
      footerData={footerData}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
export default CheckoutCliente;
