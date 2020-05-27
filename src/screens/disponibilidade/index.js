import React, {memo, useEffect} from 'react';
import Component from './Component';
import {useSelector} from 'react-redux';
import {buscarDisponibilidade} from '@actions/disponibilidade';
import {GrupoRotas} from '@sd/navigation/revestir';
const diaSemanaVazio = {sigla: '', dia: '', data: [{}, {}, {}, {}]};
const semanaVazio = [
  diaSemanaVazio,
  diaSemanaVazio,
  diaSemanaVazio,
  diaSemanaVazio,
  diaSemanaVazio,
  diaSemanaVazio,
  diaSemanaVazio,
];
function Disponibilidade({navigation: {popToTop, pop, push}}) {
  const data = useSelector(
    ({
      disponibilidade: {
        semana = semanaVazio,
        diaSelecionado = 0,
        itemsSelecionados = undefined,
      },
      autenticacao: {usuario_id, disponibilidade},
    }) => {
      return {
        popToTop,
        pop,
        push,
        semana,
        diaSelecionado,
        itemsSelecionados,
        usuario_id,
        disponibilidade,
      };
    },
  );
  useEffect(() => {
    const load = async () => {
      try {
        await buscarDisponibilidade({
          body_view: {
            disponibilidade: data.disponibilidade,
          },
          body_post: {
            usuario_id: data.usuario_id,
          },
        });
      } catch ({mensagem}) {
        push('alerta', {
          params: {
            titulo: 'JogoRápido',
            mensagem,
          },
        });
      }
    };
    load();
    return () => {
      let state = GrupoRotas.store.getState();
      state.disponibilidade = {};
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Component data={data} />;
}
export default memo(Disponibilidade);
