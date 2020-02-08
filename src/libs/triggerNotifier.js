import firebase from "react-native-firebase";
import { Platform } from "react-native";
import { cor } from "@root/app.json";
import { GrupoRotas } from "@sd/navigation/revestir";
import { COLETA_LIMPAR } from "@constants/";

let timerInProcess = undefined;
let inProgress = false
export const triggerNotifier = (tempo_aceite, coleta_id) => {
    if (inProgress) return;
    inProgress = true;
    const notification = new firebase.notifications.Notification({
        sound: 'aguia.pm3',
        show_in_foreground: true
    })
        .setNotificationId('notificationId')
        .setTitle(`A coleta #${coleta_id} estaá aguardando sua decisão`)
    if (Platform.OS === "android") {
        notification.android.setChannelId("default_notification_channel_id");
        notification.android.setSmallIcon('notifier');
        notification.android.setAutoCancel(false); 
        notification.android.setColor(cor["08"]);
        notification.android.setColorized(true);
        notification.android.setNumber(10);
        notification.android.setVibrate([200, 200, 200, 200]);
        notification.android.setCategory('progress')
        notification.android.setPriority(firebase.notifications.Android.Priority.High);
        notification.android.setProgress(100, 0, false);
        notification.android.setOnlyAlertOnce(false);
        notification.android.setLocalOnly(false);
    }
    firebase.notifications().displayNotification(notification);
    console.log("logo abaixo bem o loop de espera", { tempo_aceite, coleta_id});
    let counter = 0;
    if (timerInProcess) clearInterval(timerInProcess);
    timerInProcess = setInterval(() => {
        console.log(counter, tempo_aceite, Math.round(counter / tempo_aceite * 100))
        if (counter >= tempo_aceite) {
            GrupoRotas.store.dispatch({ type: COLETA_LIMPAR });
            console.log("destroy loop interval triggerNotifier");
            triggerDestroyTimerProgress();
        } else {
            notification.android.setProgress(100, Math.round(counter / tempo_aceite * 100), false);
            // firebase.notifications().displayNotification(notification);
            firebase.notifications().scheduleNotification(notification);
        }
        counter++;
    }, 1000);
}
export const triggerDestroyTimerProgress = () => {
    if (timerInProcess) clearInterval(timerInProcess);
    firebase.notifications().removeAllDeliveredNotifications();
    inProgress = false;
}