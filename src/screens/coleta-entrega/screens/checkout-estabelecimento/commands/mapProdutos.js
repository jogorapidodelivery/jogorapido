import {moeda} from '@sd/uteis/NumberUteis';
const mapProdutosDaColeta = produtos => {
  let sub_total = 0;
  const data = produtos.map(v => {
    sub_total += Number(v.valor);
    return {
      titulo: v.produto,
      actived: false,
      qtd: `${v.qtd} ${v.embalagem_saida}`,
      valor: moeda(v.valor),
    };
  });
  return {
    data,
    totalDeProdutos: data.length,
    valorTotal: sub_total + Number(produtos[0].valor_frete),
    total: moeda(sub_total + Number(produtos[0].valor_frete)), // v.sub_total
    sub_total: moeda(sub_total), // v.valor
    frete: moeda(produtos[0].valor_frete), // v.valor_frete
  };
};
export const mapColetas = produtos => {
  let arrayColection = {};
  produtos.forEach(v => {
    arrayColection[v.coleta_id] = arrayColection[v.coleta_id] || [];
    arrayColection[v.coleta_id].push(v);
  });
  let coletas = [];
  let totalDeProdutosNasColetas = 0;
  let valorTotal = 0;
  Object.keys(arrayColection).forEach((coleta_id, sectionIndex) => {
    const item = mapProdutosDaColeta(arrayColection[coleta_id]);
    totalDeProdutosNasColetas += item.totalDeProdutos;
    valorTotal += item.valorTotal;
    coletas.push({
      sectionIndex,
      titulo: `#${coleta_id}`,
      ...item,
    });
  });
  return {coletas, totalDeProdutosNasColetas, valorTotal};
};
