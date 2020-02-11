import moment from "moment";
import { empty } from "@sd/uteis/StringUteis";
const intervaloData = (start, end) => {
    const _dif = moment(start).diff(moment(end));
    return moment.duration(_dif).humanize();
}
export const formatDateCheckIn = coleta => {
    let horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente;
    if (empty(coleta)) return { horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente }
    const { data_checkin_cliente, data_checkout_cliente, data_checkin_unidade, data_checkout_unidade } = coleta
    if (!empty(data_checkin_unidade)) {
        horaChegadaUnidade = moment(data_checkin_unidade).format("H:mm:ss")
    }
    if (!empty(data_checkout_unidade)) {
        horaSaidaUnidade = intervaloData(data_checkin_unidade, data_checkout_unidade)
    }
    if (!empty(data_checkin_cliente)) {
        horaChegadaCliente = moment(data_checkin_cliente).format("H:mm:ss")
    }
    if (!empty(data_checkout_cliente)) {
        horaSaidaCliente = intervaloData(data_checkin_cliente, data_checkout_cliente)
    }
    return { ...coleta, horaChegadaUnidade, horaSaidaUnidade, horaChegadaCliente, horaSaidaCliente }
}