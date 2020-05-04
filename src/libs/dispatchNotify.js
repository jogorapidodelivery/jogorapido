import firebase from "react-native-firebase";
import { GrupoRotas } from "@sd/navigation/revestir";
import { empty } from "@sd/uteis/StringUteis";
import { LayoutAnimation} from "react-native";
import * as Sentry from '@sentry/react-native';
import { SDNavigation } from "@sd/navigation";
import { COLETA_NOVA_TEMPO_EXPIRADO, BUSCAR_COLETA } from "@constants/";
import { cor } from "@root/app.json";
import {  fetchItem } from "@sd/fetch";
import Sound from "react-native-sound";
import moment from "moment";
Sound.setCategory("Playback");
let aguia = new Sound("http://177.101.149.36/aguia_small.mp3", Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        aguia = undefined;
        return;
    }
    aguia.setNumberOfLoops(-1);
});
let timerInProcess = undefined;
let notificarColetaId = undefined;
let channel;
if (Platform.OS === "android") {
    channel = new firebase.notifications.Android.Channel('receber-coleta-aguia', 'Grupo de coleta', firebase.notifications.Android.Importance.High);
    channel.setSound(null);
    firebase.notifications().android.createChannel(channel);
}
const prepareParamsDispatchNotifier = response => {
    let { acao, tempo_aceite, type, coleta: [{ data_hora_atual, data_notificacao, status_coleta_id}] } = response;
    let coleta_id = "";
    if (response.coleta.length > 0) {
        coleta_id = response.coleta.map(({ coleta_id }) => coleta_id);
        if (coleta_id.length > 1) {
            let coleta_id_lasted = coleta_id.pop();
            coleta_id = `As coletas ${coleta_id.join(", ")} e ${coleta_id_lasted} está aguardando sua decisão`
        } else {
            coleta_id = `A coleta ${coleta_id.join(", ")} está aguardando sua decisão`
        }
    }
    if (tempo_aceite) {
        const mill = moment(data_hora_atual, "AAAA-MM-DD H:mm:ss").diff(moment(data_notificacao, "AAAA-MM-DD H:mm:ss")) / 1000;
        const tempo_aceite_restante = tempo_aceite - mill;
        if (tempo_aceite_restante > 0 && tempo_aceite_restante <= tempo_aceite && Number(status_coleta_id) === 1 ) {
            return { response, tempo_aceite, tempo_aceite_restante, acao, type, status_coleta_id: Number(status_coleta_id), coleta_id }
        }
    }
    return undefined
}
const createNotifier = (coleta_id) => {
    console.log({ action: "dispatchNotify/createNotifier", coleta_id })
    const notification = new firebase.notifications.Notification({
        notificationId:"notificationId",
        title: coleta_id,
        show_in_foreground: true
    });
    notification.setSound(channel.sound);
    if (Platform.OS === "android") {
        const horaNotificacao = (new Date()).getTime()
        notification
            .android.setVibrate([100,200,100,200])
            .android.setChannelId(channel.channelId)
            .android.setSmallIcon('notifier')
            .android.setAutoCancel(false)// Definir esse sinalizador fará com que a notificação seja cancelada automaticamente quando o usuário clicar no painel.
            .android.setOnlyAlertOnce(false)// prioriza mostrar a notificação com visual mais som
            .android.setLocalOnly(false)// ?
            .android.setShowWhen(true)// Se aparece data e hora
            .android.setColor(cor["10"])
            .android.setColorized(true)
            .android.setTimeoutAfter(1000 * 5)// Especifica o horário em segundos em que esta notificação deve ser cancelada, se ainda não estiver cancelada.
            .android.setWhen(horaNotificacao)// Especifica a hora que foi notificado
            .android.setVisibility(true)// mostrar na tela de bloqueio
            .android.setUsesChronometer(true)// transforma a notificação em um cronometro
            .android.setPriority(firebase.notifications.Android.Priority.High);
    }
    return notification;
}
const renderNotifierDisplay = (notification, tempo_aceite, _tempo_aceite_restante, coleta_id, _resolve, _reject) => {
    console.log({ action: "dispatchNotify/renderNotifierDisplay", tempo_aceite, coleta_id })
    if (empty(coleta_id)) {
        _reject();
        console.log({ falha: "PARAMS BRIGATÓRIOS VAZIO coleta_id = undefined" })
        Sentry.captureMessage("PARAMS BRIGATÓRIOS VAZIO coleta_id = undefined");
        return false
    }
    
    if (notificarColetaId !== undefined) {
        _reject();
        console.log("coleta notificarColetaId = " + notificarColetaId);
        Sentry.captureMessage("PARAMS BRIGATÓRIOS VAZIO notificarColetaId = " + notificarColetaId);
        return false;
    }
    const startTimer = (new Date()).getTime()
    const loopInterval = () => {
        const endtimer = (new Date()).getTime();
        const counter = (endtimer - startTimer) / 1000;
        if (counter > tempo_aceite) {
            if (timerInProcess !== undefined) clearInterval(timerInProcess);
            timerInProcess = undefined;
            notificarColetaId = undefined;
            _resolve()
        } else if (Math.floor(counter) == tempo_aceite) {
            notification.android.setProgress(0, 0, true).android.setColor(cor["12"]);
            notification.setTitle("Tempo esgotado. Seja mais rápido da próxima vez");
            firebase.notifications().displayNotification(notification);
        } else {
            const percentAceite = Math.round(counter / tempo_aceite * 100);
            notification.android.setProgress(100, percentAceite, false);
            firebase.notifications().displayNotification(notification);
        }
    }
    firebase.notifications().removeAllDeliveredNotifications();
    firebase.notifications().displayNotification(notification);
    if (timerInProcess) clearInterval(timerInProcess);
    if (aguia !== undefined) aguia.play((_success) => {});
    timerInProcess = setInterval(loopInterval, 1000);
    notificarColetaId = coleta_id;
    loopInterval();
    return null;
}
export const triggerDestroyTimerProgress = () => {
    if (timerInProcess) clearInterval(timerInProcess);
    firebase.notifications().removeAllDeliveredNotifications();
    if (aguia !== undefined) aguia.stop();
    timerInProcess = undefined;
    notificarColetaId = undefined;
}
export const triggerNotifier = message => new Promise(async (_resolve, _reject) => {
    if (!empty(GrupoRotas.store)) {
        const state = GrupoRotas.store.getState();
        if (!empty(state)) {
            if (!empty(state.autenticacao)) {
                let { autenticacao: { tempo_aceite, usuario_id, entregador_id } } = state;
                if (!empty(message)) {
                    let blnDispatchNotifier = undefined;
                    const {acao, type} = message;
                    if("criar-coleta, editar-coleta, apagar-coleta".indexOf(acao) !== -1) {
                        try{
                            const {status, response:coleta} = await fetchItem({
                                type:"GET_COLETA",
                                action:"coleta/get",
                                method:"POST",
                                baseUrl:"php",
                                body_rsa: {
                                    usuario_id,
                                    entregador_id
                                }
                            });
                            if(status ===  "sucesso" && coleta !== null && coleta !== undefined) {
                                if(coleta.length > 0){
                                    const [{status_coleta_id}] = coleta;
                                    GrupoRotas.store.dispatch({ type: BUSCAR_COLETA, response:coleta });
                                    switch (status_coleta_id) {
                                        case 1:// Pendente
                                        case 7:// Cancelado
                                        case 8:// Expedindo
                                            if (type === "DISPLAY") SDNavigation.navegar.navigate("home");
                                            break;
                                        case 2:// Confirmado
                                        case 3:// Checkin Unidade
                                        case 4:// Checkout Unidade
                                        case 5:// Checkin Cliente
                                        // case 6:// Concluido ? isto deve mudar
                                            if (type === "DISPLAY") {
                                                triggerDestroyTimerProgress();
                                                SDNavigation.navegar.navigate("coletar");
                                            }
                                            break;
                                        default:
                                            // ?
                                    }
                                    message.coleta = coleta;
                                    message.tempo_aceite = tempo_aceite;
                                    blnDispatchNotifier = prepareParamsDispatchNotifier(message);
                                    if(blnDispatchNotifier) {
                                        const { tempo_aceite, tempo_aceite_restante, coleta_id } = blnDispatchNotifier;
                                        const notification = createNotifier(coleta_id);
                                        return renderNotifierDisplay(notification, tempo_aceite, tempo_aceite_restante, coleta_id, () => {
                                            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                                            GrupoRotas.store.dispatch({ type: COLETA_NOVA_TEMPO_EXPIRADO });
                                            triggerDestroyTimerProgress();
                                            SDNavigation.navegar.popToTop();
                                            _resolve();
                                        }, _reject);
                                    }
                                } else {
                                    triggerDestroyTimerProgress();
                                    if (type === "DISPLAY") SDNavigation.navegar.navigate("home");
                                    GrupoRotas.store.dispatch({ type: COLETA_NOVA_TEMPO_EXPIRADO });
                                }
                            }
                        } catch(e) {
                            if (type === "DISPLAY") SDNavigation.navegar.navigate("home");
                        }
                    } else console.log("acao ERR", acao);
                } else console.log("message EMPTY");
            } else console.log("autenticacao EMPTY");
        } else console.log("STATE EMPTY");
    } else console.log("STORE EMPTY");
    return _reject();
})