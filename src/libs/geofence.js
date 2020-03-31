import { RSA } from "react-native-rsa-native"
import BackgroundGeolocation from "react-native-background-geolocation";
import { PUBLIC_KEY_RSA } from "@sd/fetch";
import * as Sentry from '@sentry/react-native';
import { getBaseUrl } from "@sd/fetch/Ajax";
import { empty } from "@sd/uteis/StringUteis";
import RemoteMessage from "react-native-firebase/dist/modules/messaging/RemoteMessage";
import { SharedEventEmitter } from "react-native-firebase/dist/utils/events";
import { cor } from "@root/app.json";
import { Alert } from "react-native";
export const dispatchNotifierOnResultGeofenceHttp = data => {
    if (!empty(data) && !empty(data.coleta) && data.coleta.length > 0) {
        data.acao = "nova_coleta";
        SharedEventEmitter.emit('onMessage', new RemoteMessage({ data}));
    }
}
export const setUserBackground = async usuario_id => {
    console.log("ADD USER_ID IN GEOFENCE BACKGROUND");
    try{
        const postdata = await RSA.encrypt(JSON.stringify(usuario_id), PUBLIC_KEY_RSA);
        BackgroundGeolocation.setConfig({
            params: {
                tipo:"GEOFENCE",
                postdata
            },
        })
    } catch(_err) {
        Sentry.captureException(_err);
        Alert.alert("Erro", `${_err}`);
    }
}
export const bgLocationFetch = () => {
    BackgroundGeolocation.onHttp((response) => {
        if (response.success){
            if (!empty(response.responseText) && response.responseText.length > 20) {
                try {
                    let { data } = JSON.parse(response.responseText);
                    dispatchNotifierOnResultGeofenceHttp(data);
                } catch (_err) {
                    Sentry.captureException(_err);
                }
            } else {
                Sentry.captureMessage("GEOFENCE: Falha ao enviar os dados do geofence");
            }
        } else {
            Sentry.captureMessage("GEOFENCE:"+response.responseText);
            console.log(response.responseText);
        }
    });
    const url = getBaseUrl({ baseUrl: "php", action: "entregador/geofence" });
    BackgroundGeolocation.ready({
        distanceFilter: 30,
        startOnBoot: true,// Iniciar automaticamente o rastreamento quando o dispositivo estiver ligado.
        locationTemplate: '{"lat":<%= latitude %>,"lng":<%= longitude %>}',
        // stopOnTerminate: false,// Permita que o serviço em segundo plano continue acompanhando quando o aplicativo for encerrado.
        autoSync: true,// Defina true para sincronizar cada local com o servidor quando ele chegar.
        autoSyncThreshold: 1,
        batchSync: true,// Defina true para sincronizar locais com o servidor em uma única solicitação HTTP.
        maxBatchSize: 50,
        notification:{
            title:"JogoRápido",
            smallIcon: "drawable/notifier",
            color:cor["08"],
            text:"Sincronizando sua localização com o servidor"
        },
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        url
    }).then((state) => {
        if (!state.enabled) {
            BackgroundGeolocation.start(function () {
                console.log("- Start success");
            });
        }
    });
}