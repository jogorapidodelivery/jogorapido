import AsyncStorage from '@react-native-community/async-storage';
import { ENTREGADOR_GEOFENCE, ENTREGADOR_ATUALIZAR_ESCALA, ALTERAR_SENHA, AUTENTICAR, CHECAR_SIMBOLO_EMAIL, RECUPERAR_SENHA, CONECTAR, CRIAR_CONTA, CONECTAR_FACEBOOK } from '@constants/';
import { moeda } from "@sd/uteis/form/MaskString";
import moment from "moment";
import { menu } from "@apis/json/menu.json"
import { formatDateCheckIn } from "../commands/coleta";
import { encodeCipherCaesar } from "@sd/uteis/CipherCaesar";
import { empty } from "@sd/uteis/StringUteis";
export default {
    defaultProps:{
        menu,
        autenticacao: "nome"
    },
    reducers:{
        autenticacao: {
            [CRIAR_CONTA]: (state, _action) => {
                return state;
            },
            [CONECTAR_FACEBOOK]: (state, _action) => {
                return state;
            },
            [RECUPERAR_SENHA]: (state, _action) => {
                return state;
            },
            [CHECAR_SIMBOLO_EMAIL]: (state, _action) => {
                return state;
            },
            [ENTREGADOR_GEOFENCE]: (state, _action) => {
                return state;
            },
            [ENTREGADOR_ATUALIZAR_ESCALA]: (state, { response }) => {
                if (response.disponibilidade) {
                    response.disponibilidade = response.disponibilidade.map(v => {
                        v.horario = `${moment(v.hora_inicio, "H:mm:ss").format("H")}h ${moment(v.hora_fim, "H:mm:ss").format("H")}h`;
                        return v
                    })
                }
                return { ...state, ...response };
            },
            [[ALTERAR_SENHA, CONECTAR, AUTENTICAR]]: (state, { response, posted: { senha, usuario } }) => {
                response.total_frete_semana = moeda(response.total_frete_semana, "");
                if (response.disponibilidade) {
                    response.disponibilidade = response.disponibilidade.map(v => {
                        v.horario = `${moment(v.hora_inicio, "H:mm:ss").format("H")}h ${moment(v.hora_fim, "H:mm:ss").format("H")}h`;
                        return v
                    })
                }
                if (response.coleta) {
                    if (response.coleta.valor_frete) {
                        response.coleta.valor_frete = moeda(response.coleta.valor_frete);
                        response.coleta.total_pedido = moeda(response.coleta.total_pedido);
                    }
                    response.coleta = formatDateCheckIn(response.coleta)
                }
                if (!empty(senha) && !empty(usuario)) {
                    const _chifed = encodeCipherCaesar({ senha, usuario });
                    AsyncStorage.setItem(AUTENTICAR, _chifed).catch(_err => {})
                }
                return { ...state, ...response, usuario, senha };
            }
        }
    }
}