export const mapProdutos = produtos => {
  let data = [];
  let ids = {};
  produtos.forEach(v => {
    const {coleta_id} = v;
    if (ids[coleta_id] === undefined) {
      const frete = parseFloat((v.sub_total - v.valor).toFixed(2));
      const coleta = {
        titulo: v.produto,
        actived: false,
        qtd: parseFloat(v.qtd),
        valor: v.valor,
      };
      data.push({
        titulo: `#${coleta_id}`,
        sectionIndex: data.length,
        data: [coleta],
        total: parseFloat(v.sub_total),
        sub_total: parseFloat(v.valor),
        frete,
      });
      ids[coleta_id] = data.length - 1;
    } else {
      const key = ids[coleta_id];
      data[key].sub_total_produtos += v.valor;
      const frete = parseFloat(
        (data[key].total - data[key].sub_total_produtos).toFixed(2),
      );
      data[key].frete = frete;
      const coleta = {
        titulo: v.produto,
        sectionIndex: data.length,
        actived: false,
        qtd: parseFloat(v.qtd),
        valor: v.valor,
      };
      data[key].data.push(coleta);
    }
  });
  return data;
};
