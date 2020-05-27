/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import MinhasColetasComponent from './component';
import {useSelector} from 'react-redux';
import {destroyFence, addFence} from '@sd/uteis/permissions/index';
import {mapCliente} from './commands/mapCliente';
import {actionBuscarColeta} from '@actions/';
import {mapEstabelecimento} from './commands/mapEstabelecimento';
import {GrupoRotas} from '@sd/navigation/revestir';
import {withNavigationFocus} from 'react-navigation';
function MinhasColetas({isFocused, navigation: {navigate, push}}) {
  let dados = useSelector(
    ({
      autenticacao: {
        usuario_id,
        entregador_id,
        distancia_checkin_cliente,
        distancia_checkin,
        coleta,
      },
    }) => ({
      usuario_id,
      entregador_id,
      distancia_checkin,
      distancia_checkin_cliente,
      coleta,
    }),
  );
  if (dados.coleta === null || dados.coleta.length === 0) {
    dados.coleta = [];
  }
  const {
    coleta: coletaRedux,
    distancia_checkin: distancia_checkin_unidade,
    distancia_checkin_cliente,
    usuario_id,
    entregador_id,
  } = dados;

  // Id de todas as coletas para checkin na undade
  const coleta_ids = coletaRedux.map(({coleta_id}) => coleta_id).join(',');
  // Identidicando qual aba esta
  const [index, setIndex] = useState(0);

  // Sincronizar dados da coleta com o servidor
  const [refreshing, setRefreshing] = useState(false);

  // Lista de abas
  const [filter, setFilter] = useState([
    {actived: index === 0, name: 'Estabelecimento'},
    {actived: index === 1, name: 'Clientes'},
  ]);

  // Lista de coletas
  const [coleta, setColeta] = useState(
    mapEstabelecimento({
      coleta: coletaRedux.length > 0 ? coletaRedux[0] : [],
      raio: distancia_checkin_unidade,
      coleta_ids,
      navigate,
      push,
    }),
  );
  const finalizarColeta = () => {
    let store = GrupoRotas.store.getState();
    store.autenticacao.coleta = [];
    navigate('home');
  };
  const selecioneDadosDoFiltro = useCallback(() => {
    let clt = [];
    const hasColeta = coletaRedux.length > 0;
    if (index === 0 && hasColeta) {
      clt = mapEstabelecimento({
        coleta: coletaRedux[0],
        raio: distancia_checkin_unidade,
        coleta_ids,
        navigate,
        push,
      });
      if (clt.length > 0) {
        setColeta(clt);
      } else {
        finalizarColeta();
      }
    } else if (index === 1 && hasColeta) {
      clt = coletaRedux
        .map((c, i) =>
          mapCliente({
            coleta: c,
            raio: distancia_checkin_cliente,
            index: i,
            push,
            navigate,
          }),
        )
        .filter(v => v !== null);
      if (clt.length > 0) {
        setColeta(clt);
      } else {
        finalizarColeta();
      }
    }
    return clt;
  }, [index, coletaRedux]);

  // Monitorando coletas para adicionar ganchos de geolocalização
  useEffect(() => {
    const clt = selecioneDadosDoFiltro();
    if (clt.length > 0) {
      clt.forEach(v => {
        const {horarios, name} = v;
        if (horarios.length !== 2) {
          console.log(`add:${name}`);
          addFence({...v, callBack: selecioneDadosDoFiltro});
        }
      });
    } else {
      finalizarColeta();
    }
    return () => {
      clt.forEach(({name, horarios}) => {
        if (horarios && horarios.length !== 2) {
          console.log(`remove:${name}`);
          destroyFence(name);
        }
      });
    };
  }, [index, coletaRedux, refreshing]);

  // Atualizando dados da coleta durante as interações de checkout inidade
  useEffect(() => {
    const hasColeta = coletaRedux.length > 0;
    if (index === 0 && hasColeta) {
      const estabelecimento = mapEstabelecimento({
        coleta: coletaRedux[0],
        raio: distancia_checkin_unidade,
        coleta_ids,
        navigate,
        push,
      });
      if (
        estabelecimento.length > 0 &&
        estabelecimento[0].horarios.length === 2
      ) {
        setIndex(1);
      }
    } else if (index === 1 && hasColeta) {
      const goBackHome =
        coletaRedux.filter(
          ({data_checkout_cliente}) => data_checkout_cliente === null,
        ).length === 0;
      if (goBackHome) {
        finalizarColeta();
      }
    }
  }, [isFocused]);

  // Selecionando aba
  useEffect(() => {
    if (coletaRedux.length > 0) {
      let copy = filter.map((v, k) => ({...v, actived: k === index}));
      setFilter(copy);
    } else {
      finalizarColeta();
    }
  }, [index]);

  // Buscando coleta no servidor.
  async function onRefresh() {
    setRefreshing(true);
    try {
      const coletasRefresh = await actionBuscarColeta({
        body_rsa: {usuario_id, entregador_id},
      });
      console.log(coletasRefresh);
    } catch (err) {
      let {mensagem} = err;
      if (mensagem === undefined) {
        mensagem = err.toString();
      }
      push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
    }
    setRefreshing(false);
  }
  return (
    <MinhasColetasComponent
      data={coleta}
      refreshing={refreshing}
      onRefresh={onRefresh}
      filter={filter}
      updateFilter={setIndex}
    />
  );
}
export default withNavigationFocus(MinhasColetas);
