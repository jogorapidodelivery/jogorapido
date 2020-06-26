import {salvarDisponibilidade} from '@actions/disponibilidade';
export const submit = async ({entregador_id, semana, push, popToTop}) => {
  const disponibilidade = Array.prototype.concat(
    ...semana
      .map(({data}, key) => {
        return data
          .filter(({data: dataFilter}) => dataFilter !== null)
          .map(({disponibilidade_id, ativo}) => ({
            dia_semana: `${key + 1}`,
            ativo: ativo ? '1' : '0',
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
        usuario_id: entregador_id,
        entregador_id,
      },
    });
    push('alerta', {
      params: {
        titulo: 'JogoRápido',
        mensagem:
          'Sua escala foi atualizada com sucesso. <b>Nosso moderador irá analisar sua solicitação.</b> Sua escala tem validade de uma semana e você deverá <b>atualizá-la toda segunda-feira.</b>',
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
