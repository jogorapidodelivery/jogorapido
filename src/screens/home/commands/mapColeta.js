const mapColeta = _coleta => {
  const total = _coleta.length;
  let coleta_ids = [];
  let tituloColetas = '';
  let coletaPendente = [];
  if (total > 0) {
    const [
      {
        unidade: titulo,
        latitude_unidade: latitude,
        longitude_unidade: longitude,
      },
    ] = _coleta;
    const unidade = {
      titulo,
      mapa: {
        latitude,
        longitude,
      },
    };
    coletaPendente = _coleta.map(
      ({coleta_id, cliente, latitude_cliente, longitude_cliente}) => {
        coleta_ids.push(coleta_id);
        return {
          titulo: cliente,
          mapa: {
            latitude: latitude_cliente,
            longitude: longitude_cliente,
          },
        };
      },
    );
    coletaPendente.unshift(unidade);
    tituloColetas = total === 1 ? 'Coleta pendente ' : 'Coletas pendentes ';
    let clone = [].concat(coleta_ids);
    const _id = clone.pop();
    if (clone.length > 0) {
      tituloColetas += clone.join(', ');
      tituloColetas += ' e ' + _id;
    } else {
      tituloColetas += _id;
    }
  }
  return {total, coleta_ids, tituloColetas, coletaPendente, coleta: _coleta};
};

export const selectProps = ({
  autenticacao: {
    usuario_id,
    entregador_id,
    total_frete_semana,
    corridas_semana,
    disponibilidade,
    tempo_aceite,
    coleta,
  },
}) => ({
  usuario_id,
  entregador_id,
  total_frete_semana,
  corridas_semana,
  disponibilidade,
  tempo_aceite,
  ...mapColeta(coleta),
});
