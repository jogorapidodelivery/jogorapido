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
    const coleta = coletaList.map(coleta => {
        if (coleta.valor_frete) {
            coleta.valor_frete = moeda(coleta.valor_frete);
            coleta.total_pedido = moeda(coleta.total_pedido);
        }
        let horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente;
        if (empty(coleta)) return { horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente }
        const { data_checkin_cliente, data_checkout_cliente, data_checkin_unidade, data_checkout_unidade } = coleta
        if (!empty(data_checkin_unidade)) {
            horaChegadaUnidade = moment(data_checkin_unidade).format("H:mm:ss")
        }
        if (!empty(data_checkout_unidade)) {
            horaSaidaUnidade = intervaloData(data_checkin_unidade, data_checkout_unidade)
        } else {
            counterNoCheckoutUnidade++;
        }
        if (!empty(data_checkin_cliente)) {
            horaChegadaCliente = moment(data_checkin_cliente).format("H:mm:ss")
        }
        if (!empty(data_checkout_cliente)) {
            horaSaidaCliente = intervaloData(data_checkin_cliente, data_checkout_cliente)
        }
        return { ...coleta, horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente }
    })
    return { coleta, lastedCheckoutUnidade: counterNoCheckoutUnidade};
}