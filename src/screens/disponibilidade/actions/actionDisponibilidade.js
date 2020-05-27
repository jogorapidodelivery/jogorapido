import {salvarDisponibilidade} from '@actions/disponibilidade';
export const submit = async ({usuario_id, semana, push, popToTop}) => {
  const disponibilidade = Array.prototype.concat(
    ...semana
      .map(({data}, key) => {
        return data
          .filter(({data: dataFilter}) => dataFilter !== null)
          .map(({disponibilidade_id}) => ({
            dia_semana: key.toString(),
            disponibilidade_id: disponibilidade_id.toString(),
          }));
      })
      .filter(v => v.length > 0),
  );
  try {
    await salvarDisponibilidade({
      body_post: {
        disponibilidade,
      },
      body_rsa: {
        usuario_id,
      },
    });
    push('alerta', {
      params: {
        titulo: 'JogoRápido',
        mensagem:
          'Disponibilidade atualizada com sucesso. Lembre-se elas só terão efeito após 24 horas.',
        onPress: popToTop,
      },
    });
  } catch (_err) {
    let mensagem = 'Falha ao salvar sua disponibilidade';
    if (_err.mensagem) {
      mensagem = _err.mensagem;
    }
    push('alerta', {params: {titulo: 'JogoRápido', mensagem}});
  }
};
