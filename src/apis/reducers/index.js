import { mergeHandleActions } from '@sd/uteis/CreateActions';
import caseAutenticacao from "./autenticacao";
import caseColeta from "./coleta";
import caseEntrega from "./entregador";
export default mergeHandleActions(caseAutenticacao, caseColeta, caseEntrega);