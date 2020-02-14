import firebase from "react-native-firebase";
import { GrupoRotas } from "@sd/navigation/revestir";
import { empty } from "@sd/uteis/StringUteis";
import { LayoutAnimation} from "react-native";
import { COLETA_LIMPAR, COLETA_ATUALIZAR_STATUS, COLETA_NOVA, ENTREGADOR_ATUALIZAR_ESCALA } from "@constants/";
import { cor } from "@root/app.json";
import Sound from "react-native-sound";
import moment from "moment";
Sound.setCategory("Playback");
let aguia = new Sound("http://177.101.149.36/aguia_small.mp3", Sound.MAIN_BUNDLE, (error) => {
    if (error) {
        console.log("ERRO AU CARREGAR O SOM INICIO");
        console.log(error)
        console.log("ERRO AU CARREGAR O SOM FIM");
        aguia = undefined;
        return;
    }
    aguia.setNumberOfLoops(-1);
});
let timerInProcess = undefined;
let inProgress = false;
let channel;
if (Platform.OS === "android") {
    channel = new firebase.notifications.Android.Channel('receber-coleta-aguia', 'Grupo de coleta', firebase.notifications.Android.Importance.High);
    channel.setSound(null);
    firebase.notifications().android.createChannel(channel);
}
const prepareParams = ({ data, _data }, type) => {
    const response = data || _data;
    if (inProgress) return undefined
    inProgress = true;
    let { status, acao, coleta_id, data_hora_atual, data_notificacao } = response;
    if (!empty(GrupoRotas.store)) {
        const state = GrupoRotas.store.getState();
        if (!empty(state.autenticacao)) {
            let { autenticacao: { tempo_aceite } } = state;
            if (tempo_aceite) {
                if(__DEV__) data_hora_atual = "2020-02-13 20:33:45";
                if (__DEV__) data_notificacao = "2020-02-13 20:33:00";
                const mill = moment(data_hora_atual).diff(moment(data_notificacao)) / 1000;
                const novoTempo = tempo_aceite - mill;
                if (novoTempo > 0 && novoTempo <= tempo_aceite) {
                    tempo_aceite = novoTempo
                    return { response, tempo_aceite, status, acao, coleta_id, type}
                }
            }
        }
    }
    return undefined
}
export const triggerDestroyTimerProgress = () => {
    if (timerInProcess) clearInterval(timerInProcess);
    firebase.notifications().removeAllDeliveredNotifications();
    if (aguia !== undefined) aguia.stop();
    inProgress = false;
}
const createNotifier = (coleta_id, tempo_aceite) => {
    const notification = new firebase.notifications.Notification({
        notificationId:"notificationId",
        title: `A coleta #${coleta_id} está aguardando sua decisão`,
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
const dispatchNotifier = (notification, tempo_aceite, _resolve) => {
    firebase.notifications().removeAllDeliveredNotifications();
    firebase.notifications().displayNotification(notification);
    let counter = 0;
    if (timerInProcess) clearInterval(timerInProcess);
    if (aguia !== undefined) aguia.play((success) => {
        if (success) {
            console.log('successfully finished playing');
        } else {
            console.log('playback failed due to audio decoding errors');
        }
    });
    timerInProcess = setInterval(() => {
        console.log({ method:"interval", counter, tempo_aceite})
        if (counter > tempo_aceite) {
            if (timerInProcess) clearInterval(timerInProcess);
            inProgress = false;
            _resolve()
        } else if (counter == tempo_aceite) {
            notification.android.setProgress(0, 0, true).android.setColor(cor["12"]);
            notification.setTitle("Tempo esgotado. Seja mais rápido da próxima vez");
            firebase.notifications().displayNotification(notification);
        } else {
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
                    console.log("nova coleta porra")
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
    const post = prepareParams(message, { type: "DISPLAY" });
    if (post !== undefined) {
        const { response, tempo_aceite, status, acao, coleta_id, type } = post;
        const triggerNotifier = switchActions(response, status, acao, type);
        if (triggerNotifier) {
            const notification = createNotifier(coleta_id, tempo_aceite);
            dispatchNotifier(notification, tempo_aceite, () => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                GrupoRotas.store.dispatch({ type: COLETA_LIMPAR });
                if (aguia !== undefined) aguia.stop();
            })
        }
    }
})
export default async message => {
    const post = prepareParams(message, { type: "DISPLAY" });
    if (post !== undefined) {
        const { response, tempo_aceite, status, acao, coleta_id, type } = post;
        const triggerNotifier = switchActions(response, status, acao, type);
        if (triggerNotifier) {
            const notification = createNotifier(coleta_id, tempo_aceite);
            return new Promise((_resolve) => {
                dispatchNotifier(notification, tempo_aceite, () => {
                    GrupoRotas.store.dispatch({ type: COLETA_LIMPAR });
                    if (aguia !== undefined) aguia.stop();
                    _resolve();
                })
            })
        }
    }
    return Promise.resolve();
}