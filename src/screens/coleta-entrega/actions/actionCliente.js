import { coletaCheckInCliente } from "@actions/";
import { GrupoRotas } from "@sd/navigation/revestir";
import { SDNavigation } from "@sd/navigation";
export const actionCheckinCliente = ({index, coleta_id, entregador_id, dentroDoRaio, raio}) => {
    const {push, navigate} = SDNavigation.navegar;
    if (dentroDoRaio) {
        coletaCheckInCliente({
            body_view: {
                index
            },
            body_rsa: {
                coleta_id,
                entregador_id,
                coluna: "data_checkin_cliente"
            }
        }).catch((err) => {
            console.warn(err);
            const { status, mensagem } = err;
            if (status === "listapedido") {
                push("alerta", {
                    params: {
                        titulo: "JogoRápido",
                        mensagem,
                        onPress: () => {
                            let store = GrupoRotas.store.getState();
                            store.autenticacao.coleta = [];
                            navigate("home");
                        }
                    }
                })
            } else {
                mensagem = mensagem || "Página não encontrada status[500]";
                push("alerta", { params: { titulo: "JogoRápido", mensagem }})
            }
        })
    } else {
        push("alerta", {
            params: {
                titulo: "JogoRápido",
                mensagem: `Só é possivel fazer checkin no cliente à uma distância máxima de ${km2String(raio)}.`
            }
        })
    }
}
export const actionCheckoutCliente = ({coleta_id}) => {
    SDNavigation.navegar.push("coletaCheckoutCliente", { params: { coleta_id }});
}