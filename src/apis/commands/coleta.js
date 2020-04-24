import moment from "moment";
import { empty } from "@sd/uteis/StringUteis";
import { moeda } from "@sd/uteis/form/MaskString";
const intervaloData = (start, end) => {
    const _dif = moment(start).diff(moment(end));
    return moment.duration(_dif).humanize();
}
export const formatDateCheckIn = coletaList => {
    if (empty(coletaList)) return [];
    let counterNoCheckoutUnidade = 0
    console.log("Dados com bug aqui");
    console.log(coletaList);
    const coleta = coletaList.map(coleta => {
        if (empty(coleta)) return null;
        if (coleta.valor_frete) {
            coleta.valor_frete = moeda(coleta.valor_frete);
            coleta.total_pedido = moeda(coleta.total_pedido);
        }
        let horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente;
        const { data_checkin_cliente, data_checkout_cliente, data_checkin_unidade, data_checkout_unidade } = coleta;
        const formatDate = "YYYY:MM:DD H:mm:ss";
        if (!empty(data_checkin_unidade)) {
            horaChegadaUnidade = moment(data_checkin_unidade, formatDate).format("H:mm:ss")
        }
        if (!empty(data_checkout_unidade)) {
            horaSaidaUnidade = intervaloData(data_checkin_unidade, data_checkout_unidade)
        } else {
            counterNoCheckoutUnidade++;
        }
        if (!empty(data_checkin_cliente)) {
            horaChegadaCliente = moment(data_checkin_cliente, formatDate).format("H:mm:ss")
        }
        if (!empty(data_checkout_cliente)) {
            horaSaidaCliente = intervaloData(data_checkin_cliente, data_checkout_cliente)
        }
        return { ...coleta, horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente }
    }).filter((v) => v !== null);
    return { coleta, lastedCheckoutUnidade: counterNoCheckoutUnidade};
}