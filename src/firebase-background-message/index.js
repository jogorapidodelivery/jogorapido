import firebase from "react-native-firebase";
import { GrupoRotas } from "@sd/navigation/revestir";
// import { SDNavigation } from "@sd/navigation";
// import { triggerNotifier } from "../libs/triggerNotifier";
import { empty } from "@sd/uteis/StringUteis";
import { COLETA_LIMPAR, COLETA_ATUALIZAR_STATUS, COLETA_NOVA, ENTREGADOR_ATUALIZAR_ESCALA } from "@constants/";
import { cor } from "@root/app.json";
// const callBackListener = ({ data: response}, type) => {
//     firebase.notifications().removeAllDeliveredNotifications();
//     if (!empty(GrupoRotas.store)) {
//         const state = GrupoRotas.store.getState();
//         if (!empty(state.autenticacao)) {
//             const { autenticacao: { usuario_id, tempo_aceite } } = state;
//             if (usuario_id) {
//                 const { status, acao, coleta_id } = response;
//                 console.log({ type: "TASK BACKGROUND", status, acao, coleta_id, usuario_id, tempo_aceite })
                // switch (acao) {
                //     case "nova_coleta":
                //         switch (status) {
                //             case "Pendente":
                //                 GrupoRotas.store.dispatch({ type: COLETA_NOVA, response });
                //                 triggerNotifier(tempo_aceite, coleta_id)
                //                 if (type === "DISPLAY") SDNavigation.navegar.navigate("home");
                //                 break;
                //             case "Confirmado":
                //                 GrupoRotas.store.dispatch({ type: COLETA_ATUALIZAR_STATUS, response });
                //                 if (type === "DISPLAY") SDNavigation.navegar.navigate("coletar");
                //                 break;
                //             default:
                //                 break;
                //         }
                //         break;
                //     case "atualizar_escala":
                //         GrupoRotas.store.dispatch({ type: ENTREGADOR_ATUALIZAR_ESCALA, response });
                //         break;
                //     default:
                //         break;
                // }
//             } else {
//                 console.log("task background notifier redux autenticacao.usuario_id null")
//             }
//         } else {
//             console.log("task background notifier redux autenticacao null")
//         }
//     } else {
//         console.log("task background notifier store null")
//     }
// }
const prepareParams = ({ data: response }, type) => {
    const { status, acao, coleta_id } = response;
    if (!empty(GrupoRotas.store)) {
        const state = GrupoRotas.store.getState();
        if (!empty(state.autenticacao)) {
            const { autenticacao: { tempo_aceite } } = state;
            if (tempo_aceite) {
                return { response, tempo_aceite, status, acao, coleta_id, type}
            } else {
                console.log("task background notifier redux autenticacao.usuario_id null")
                return undefined;
            }
        } else {
            console.log("task background notifier redux autenticacao null");
            return undefined;
        }
    }
    console.log("task background notifier store null");
    return undefined
}
const createNotifier = (coleta_id) => {
    const notification = new firebase.notifications.Notification({
        // sound: 'aguia.pm3',
        show_in_foreground: true
    });
    notification.setNotificationId('notificationId');
    notification.setTitle(`A coleta #${coleta_id} está aguardando sua decisão`);

    notification.android.setChannelId("default_notification_channel_id");
    notification.android.setSmallIcon('notifier');
    notification.android.setAutoCancel(false);
    notification.android.setColor(cor["08"]);
    notification.android.setColorized(true);
    notification.android.setPriority(firebase.notifications.Android.Priority.High);
    notification.android.setProgress(100, 0, false);
    return notification;
}
let timerInProcess = undefined;
let inProgress = false
const dispatchNotifier = (notification, tempo_aceite, _resolve) => {
    firebase.notifications().displayNotification(notification);
    let counter = 0;
    if (timerInProcess) clearInterval(timerInProcess);
    console.log("antes de ligar o setInterval")
    timerInProcess = setInterval(() => {
        if (counter >= tempo_aceite) {
            GrupoRotas.store.dispatch({ type: COLETA_LIMPAR });
            firebase.notifications().removeAllDeliveredNotifications();
            if (timerInProcess) clearInterval(timerInProcess);
            console.log("destroy loop interval triggerNotifier");
            _resolve()
        } else {
            console.log("atualizando progress:", Math.round(counter / tempo_aceite * 100));
            notification.android.setProgress(100, Math.round(counter / tempo_aceite * 100), false);
            firebase.notifications().displayNotification(notification);
        }
        counter++;
    }, 1000);
}
const switchActions = (response, status, acao, type) => {
    switch (acao) {
        case "nova_coleta":
            switch (status) {
                case "Pendente":
                    GrupoRotas.store.dispatch({ type: COLETA_NOVA, response });
                    if (type === "DISPLAY") SDNavigation.navegar.navigate("home");
                    return true
                case "Confirmado":
                    GrupoRotas.store.dispatch({ type: COLETA_ATUALIZAR_STATUS, response });
                    if (type === "DISPLAY") SDNavigation.navegar.navigate("coletar");
                    return false
                default:
                    return false
            }
            return false
        case "atualizar_escala":
            GrupoRotas.store.dispatch({ type: ENTREGADOR_ATUALIZAR_ESCALA, response });
            return false
        default:
            return false
    }
    return false
}
firebase.messaging().onMessage(message => {
    console.log("background message received")
    const post = prepareParams(message, { type: "DISPLAY" });
    if (post === undefined) return Promise.resolve();
    const { response, tempo_aceite, status, acao, coleta_id, type } = post;
    const triggerNotifier = switchActions(response, status, acao, type);
    if (triggerNotifier) {
        const notification = createNotifier(coleta_id);
        dispatchNotifier(notification, tempo_aceite, () => {
            console.log("destroy a coleta")
        })
    } else {
        _resolve()
    }
})
export default async message => {
    console.log("background message received")
    const post = prepareParams(message, {type:"BACKGROUND"});
    if (post === undefined) return Promise.resolve();
    const { response, tempo_aceite, status, acao, coleta_id, type} = post;
    return new Promise((_resolve) => {
        const triggerNotifier = switchActions(response, status, acao, type);
        if (triggerNotifier) {
            const notification = createNotifier(coleta_id);
            dispatchNotifier(notification, tempo_aceite, _resolve)
        } else {
            _resolve()
        }
    })
}