import { RSA } from "react-native-rsa-native"
import BackgroundGeolocation from "react-native-background-geolocation";
import { baseApp} from "@root/app.json";
import { PUBLIC_KEY_RSA } from "@sd/fetch";
// async await
export const bgLocationFetch = async usuario_id => {
    const postdata = await RSA.encrypt(JSON.stringify(usuario_id), PUBLIC_KEY_RSA);
    if (postdata && postdata.length > 5) {
        console.log("ligando cercas e monitorando localização")
        BackgroundGeolocation.ready({
            autoSync: true,
            distanceFilter: 10,
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
    } else {
        console.warn("falha ao criptografar no RSA geofence")
    }
}
// BackgroundGeolocation.addGeofences([{
        //     identifier: "New World",
        //     radius: 200,
        //     latitude: -16.7139,
        //     longitude: -49.2707,
        //     notifyOnEntry: true,
        //     notifyOnExit: true,
        // }, {
        //     identifier: "Della",
        //     radius: 200,
        //     latitude: -16.7135,
        //     longitude: -49.2743,
        //     notifyOnEntry: true,
        //     notifyOnExit: true
        // }]).then((success) => {
        //     console.log("[addGeofences] success", success);
        // }).catch((error) => {
        //     console.log("[addGeofences] FAILURE: ", error);
        // });
        // BackgroundGeolocation.onHttp((response) => {
        //     console.log("[http] response: ", response.success, response.status, response.responseText);
        // });