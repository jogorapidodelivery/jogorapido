import firebase from "react-native-firebase";
import { GrupoRotas } from "@sd/navigation/revestir";
import { empty } from "@sd/uteis/StringUteis";
import { LayoutAnimation} from "react-native";
import * as Sentry from '@sentry/react-native';
import { SDNavigation } from "@sd/navigation";
import { COLETA_LIMPAR, COLETA_ATUALIZAR_STATUS, COLETA_NOVA, ENTREGADOR_ATUALIZAR_ESCALA } from "@constants/";
import { cor } from "@root/app.json";
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
const prepareParams = response => {
    if (typeof response.coleta === "string") {
        response.coleta = response.coleta.replace(/[/\"]/gi, '"').replace(/(\"\[\{\")/gi, '[{"').replace(/(\"\}\]\")/gi, '}]"');
        response.coleta = JSON.parse(response.coleta);
    }
    let { acao, type, coleta: [{
        data_hora_atual,
        data_notificacao,
        status_coleta_id}] } = response;
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
    if (!empty(GrupoRotas.store)) {
        const state = GrupoRotas.store.getState();
        if (!empty(state.autenticacao)) {
            let { autenticacao: { tempo_aceite } } = state;
            if (tempo_aceite) {
                const mill = moment(data_hora_atual, "AAAA-MM-DD H:mm:ss").diff(moment(data_notificacao, "AAAA-MM-DD H:mm:ss")) / 1000;
                const tempo_aceite_restante = tempo_aceite - mill;
                if (tempo_aceite_restante > 0 && tempo_aceite_restante <= tempo_aceite) {
                    return { response, tempo_aceite, tempo_aceite_restante, acao, type, status_coleta_id: Number(status_coleta_id), coleta_id
                    }
                } else {
                    Sentry.addBreadcrumb({ action: "dispatchNotify::prepareParams", tempo_aceite_restante, coleta_id, tempo_aceite, status_coleta_id, data_hora_atual, data_notificacao });
                    console.log("prepareParams:", {tempo_aceite_restante, coleta_id, tempo_aceite, status_coleta_id, data_hora_atual, data_notificacao});
                }
            } else {
                Sentry.addBreadcrumb({ action:"dispatchNotify::prepareParams", tempo_aceite, data_notificacao, data_hora_atual, tempo_aceite_restante });
                console.log("prepareParams tempo_aceite empty", { tempo_aceite, data_notificacao, data_hora_atual, tempo_aceite_restante})
            }
        } else {
            Sentry.captureMessage("prepareParams autenticacao empty");
            console.log("prepareParams autenticacao empty")
        }
    } else {
        Sentry.captureMessage("prepareParams GrupoRotas.store empty");
        console.log("prepareParams GrupoRotas.store empty")
    }
    Sentry.captureMessage("prepareParamsNotificacão sem coleta, isto não deveria acontecer");
    return undefined
}
const createNotifier = (coleta_id) => {
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
const renderNotifierDisplay = (notification, tempo_aceite, coleta_id, _resolve) => {
    if (empty(coleta_id)) {
        console.warn({ falha: "PARAMS BRIGATÓRIOS VAZIO", coleta_id })
        return false
    }
    
    if (notificarColetaId !== undefined) return false;
    const startTimer = (new Date()).getTime()
    const loopInterval = () => {
        const endtimer = (new Date()).getTime();
        const counter = (endtimer - startTimer) / 1000;
        if (counter > tempo_aceite) {
            if (timerInProcess) clearInterval(timerInProcess);
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
}

const switchActions = ({type, acao, coleta}) => {// status_coleta_id, acao, type
    const [{status_coleta_id}] = coleta;
    // const { autenticacao: { coleta: coletaAtual}} = GrupoRotas.store.getState();
    // if (!empty(coletaAtual) && coletaAtual.length > 0) return false;
    switch (acao) {
        case "nova_coleta":
            switch (status_coleta_id) {
                case 1:// Pendente
                    GrupoRotas.store.dispatch({ type: COLETA_NOVA, coleta });
                    if (type === "DISPLAY") SDNavigation.navegar.navigate("home");
                    return true
                case 2:// Confirmado
                    GrupoRotas.store.dispatch({ type: COLETA_ATUALIZAR_STATUS, coleta });
                    if (type === "DISPLAY") SDNavigation.navegar.navigate("coletar");
                    return false
                default:
                    return false
            }
            return false
        case "atualizar_escala":
            // GrupoRotas.store.dispatch({ type: ENTREGADOR_ATUALIZAR_ESCALA, {} });
            return false
        default:
            return false
    }
    return false
}
export const triggerDestroyTimerProgress = () => {
    if (timerInProcess) clearInterval(timerInProcess);
    firebase.notifications().removeAllDeliveredNotifications();
    if (aguia !== undefined) aguia.stop();
    timerInProcess = undefined;
    notificarColetaId = undefined;
}
export const triggerNotifier = message => new Promise((_resolve, _reject)=>{
    if (!empty(message)) {
        const post = prepareParams(message);
        if (post !== undefined) {
            const { response, tempo_aceite, tempo_aceite_restante, coleta_id } = post;
            const _isNotify = switchActions(response);
            if (_isNotify) {
                const notification = createNotifier(coleta_id, tempo_aceite, );
                renderNotifierDisplay(notification, tempo_aceite, tempo_aceite_restante, coleta_id, () => {
                    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                    GrupoRotas.store.dispatch({ type: COLETA_LIMPAR });
                    triggerDestroyTimerProgress();
                    SDNavigation.navegar.popToTop();
                    _resolve();
                })
            } else {
                _reject();
                Sentry.addBreadcrumb({ falha: "DISPATCH_NOTIFY ação a ser executada não existe ou o player já possui uma coleta pendente", ...post});
                console.log("DISPATCH_NOTIFY ação a ser executada não existe ou o player já possui uma coleta pendente", post);
            }
        } else {
            _reject();
            Sentry.captureMessage("DISPATCH_NOTIFY POST EMPTY");
            console.log("DISPATCH_NOTIFY POST EMPTY", post);
        }
    } else {
        _reject();
        Sentry.captureMessage("DISPATCH_NOTIFY MESSAGE EMPTY");
        console.log("DISPATCH_NOTIFY MESSAGE EMPTY");
    }
})