import {moeda} from '@sd/uteis/NumberUteis';
export const mapProdutos = produtos => {
  let data = [];
  let ids = {};
  produtos.forEach(v => {
    const {coleta_id} = v;
    if (ids[coleta_id] === undefined) {
      const frete = moeda(v.sub_total - v.valor);
      const coleta = {
        titulo: v.produto,
        actived: false,
        qtd: parseFloat(v.qtd),
        valor: moeda(v.valor),
      };
      data.push({
        titulo: `#${coleta_id}`,
        sectionIndex: data.length,
        data: [coleta],
        total: moeda(v.sub_total),
        sub_total: moeda(v.valor),
        frete,
      });
      ids[coleta_id] = data.length - 1;
    } else {
      const key = ids[coleta_id];
      data[key].sub_total_produtos += v.valor;
      const frete = moeda(data[key].total - data[key].sub_total_produtos);
      data[key].frete = frete;
      const coleta = {
        titulo: v.produto,
        sectionIndex: data.length,
        actived: false,
        qtd: parseFloat(v.qtd),
        valor: moeda(v.valor),
      };
      data[key].data.push(coleta);
    }
  });
  return data;
};
