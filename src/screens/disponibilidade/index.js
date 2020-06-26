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
/*
 ou  para reprovado
 ou   para aprovado
*/
function Disponibilidade({navigation: {popToTop, pop, push}}) {
  const data = useSelector(
    ({
      disponibilidade: {
        semana = semanaVazio,
        diaSelecionado = 0,
        hojeDiaSemana = 0,
        itemsSelecionados = undefined,
      },
      autenticacao: {entregador_id, disponibilidade},
    }) => {
      return {
        popToTop,
        pop,
        push,
        semana,
        diaSelecionado,
        hojeDiaSemana,
        itemsSelecionados,
        entregador_id,
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
            usuario_id: data.entregador_id, // Deprecated, apagar depois de alguns dias
            entregador_id: data.entregador_id,
          },
        });
      } catch (erro) {
        const {mensagem} = erro;
        push('alerta', {
          params: {
            titulo: 'JogoRápido',
            mensagem:
              mensagem ||
              'Falha ao carregar os dados. Favor tente novamente mais tarde',
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
