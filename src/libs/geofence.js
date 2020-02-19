import { RSA } from "react-native-rsa-native"
import BackgroundGeolocation from "react-native-background-geolocation";
import { PUBLIC_KEY_RSA } from "@sd/fetch";
import { baseApp } from "@sd/fetch/Ajax";
import { empty } from "../../sd/uteis/StringUteis";
import RemoteMessage from "react-native-firebase/dist/modules/messaging/RemoteMessage";
import { SharedEventEmitter } from "react-native-firebase/dist/utils/events";
export const bgLocationFetch = async usuario_id => {
    const postdata = await RSA.encrypt(JSON.stringify(usuario_id), PUBLIC_KEY_RSA);
    if (postdata && postdata.length > 5) {
        BackgroundGeolocation.onHttp((response) => {
            if (!empty(response.responseText) && response.responseText.length > 20) {
                try{
                    let {data} = JSON.parse(response.responseText);
                    if (!empty(data)) {
                        data.acao = "nova_coleta";
                        SharedEventEmitter.emit('onMessage', new RemoteMessage({ data }));
                    }
                } catch(e) {
                }
            }
        });
        BackgroundGeolocation.ready({
            autoSync: true,
            distanceFilter: 20,
            batchSync: true,
            maxBatchSize: 50,
            locationTemplate: '{"lat":<%= latitude %>,"lng":<%= longitude %>}',
            params: {
                postdata
            },
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            url: `${baseApp}entregador/geofence`
        }).then((state) => {
            if (!state.enabled) {
                BackgroundGeolocation.start(function () {});
            }
        })
    }
}