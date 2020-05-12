export const mapSelector = ({coleta_id}) => ({
  autenticacao: {entregador_id, coleta},
}) => {
  let forma_pagamento = null;
  if (coleta.length > 0) {
    const coletaSelected = coleta.filter(({coleta_id: id}) => coleta_id === id);
    if (coletaSelected.length > 0) {
      forma_pagamento = coletaSelected[0].forma_pagamento;
    }
  }
  return {
    entregador_id,
    forma_pagamento,
  };
};
