import { mergeHandleActions } from '@sd/uteis/CreateActions';
import caseAutenticacao from "./autenticacao";
import caseColeta from "./coleta";
import caseEntrega from "./entregador";
import caseDisponibilidade from "./disponibilidade";
import caseExtrato from "./extrato";
export default mergeHandleActions(caseAutenticacao, caseColeta, caseEntrega, caseDisponibilidade, caseExtrato);