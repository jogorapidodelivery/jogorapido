/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useCallback} from 'react';
import MinhasColetasComponent from './component';
import {useSelector} from 'react-redux';
import {SDNavigation} from '@sd/navigation';
import {destroyFence, addFence} from '@sd/uteis/permissions/index';
import {mapCliente} from './commands/mapCliente';
import {actionBuscarColeta} from '@actions/';
import {mapEstabelecimento} from './commands/mapEstabelecimento';
import {GrupoRotas} from '@sd/navigation/revestir';
export default function MinhasColetas(props) {
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
  const [coleta, setColeta] = useState([
    mapEstabelecimento(coletaRedux[0], distancia_checkin_unidade, coleta_ids),
  ]);

  const selecioneDadosDoFiltro = useCallback(() => {
    let clt = [];
    if (coletaRedux === null || coletaRedux.length === 0) {
      return clt;
    }
    if (index === 0) {
      clt = [
        mapEstabelecimento(
          coletaRedux[0],
          distancia_checkin_unidade,
          coleta_ids,
        ),
      ];
    } else {
      clt = coletaRedux.map((v, k) =>
        mapCliente(v, distancia_checkin_cliente, k),
      );
    }
    setColeta(clt);
    return clt;
  }, []);
  /*
  coletaRedux,
  coleta_ids,
  distancia_checkin_cliente,
  distancia_checkin_unidade,
  index,
  */

  // Monitorando coletas para adicionar ganchos de geolocalização
  useEffect(() => {
    // Atualizando estado da coleta
    const clt = selecioneDadosDoFiltro();

    // Selecionando aba
    let copy = filter.map((v, k) => ({...v, actived: k === index}));
    setFilter(copy);

    let contarCoeltasConcluidas = 0;

    clt.forEach(v => {
      const {horarios, name} = v;
      if (horarios.length !== 2) {
        console.log(`add:${name}`);
        addFence({...v, callBack: selecioneDadosDoFiltro});
      } else {
        contarCoeltasConcluidas++;
      }
    });

    let isGotoHome =
      index === 1 &&
      (clt.length === 0 || clt.length === contarCoeltasConcluidas);
    if (isGotoHome) {
      let store = GrupoRotas.store.getState();
      store.autenticacao.coleta = [];
      props.navigation.navigate('home');
    }

    return () => {
      clt.forEach(({name, horarios}) => {
        if (horarios.length !== 2) {
          console.log(`remove:${name}`);
          destroyFence(name);
        }
      });
    };
  }, []);
  // index, coletaRedux, selecioneDadosDoFiltro, filter, props.navigation

  // Atualizando dados da coleta durante as interações de checkin/out
  useEffect(() => {
    const estabelecimento = mapEstabelecimento(
      coletaRedux[0],
      distancia_checkin_unidade,
      coleta_ids,
    );
    if (index === 0 && estabelecimento.horarios.length === 2) {
      setIndex(1);
    }
  }, []);
  // coletaRedux, coleta_ids, distancia_checkin_unidade, index

  // Buscando coleta no servidor.
  async function onRefresh() {
    setRefreshing(true);
    const {push} = SDNavigation.navegar;
    try {
      await actionBuscarColeta({body_rsa: {usuario_id, entregador_id}});
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
