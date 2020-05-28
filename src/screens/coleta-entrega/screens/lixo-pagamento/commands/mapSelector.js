export const mapSelector = ({coleta_id}) => ({autenticacao: {coleta}}) => {
  return coleta.filter(({coleta_id: id}) => coleta_id === id).pop();
};
