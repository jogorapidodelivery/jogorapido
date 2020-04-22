import requestPermission from "./permission";
import Geolocation from "react-native-geolocation-service"
import { GrupoRotas } from "@sd/navigation/revestir";
import { globalParams } from "@sd/fetch/DataFormat";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { empty } from "@sd/uteis/StringUteis";
import { latLngDist } from "@sd/uteis/NumberUteis";
import { entregadorGeofence } from "@apis/actions/entregador";
import { dispatchNotifierOnResultGeofenceHttp } from "@libs/geofence";
let fences = {};
export const calcFence = (_fence) => {
    const { latitude, longitude, raio } = _fence;
    const distancia = globalParams.latitude === 0 ? 1000 : Math.round(latLngDist(globalParams.latitude, globalParams.longitude, latitude, longitude) * 1000);
    return { ..._fence, dentroDoRaio: distancia <= raio, distancia };
}
export const addFence = (data) => {
    fences[data.name] = data;
    return calcFence(data)
}
export const destroyFence = (name) => {
    delete fences[name];
}
const _currentLocation = () => {
    const _actionErr = _err => {
        console.warn(_err)
    }
    const defParans = {
        distanceFilter: 30// metros
    }
    let watchId = undefined;
    let lootLocation = false;
    let startTime = (new Date()).getTime()
    const _actionSuccess = ({ coords: { latitude, longitude } }) => {
        if (GrupoRotas.store !== undefined && GrupoRotas.store !== null) {
            const keys = Object.values(fences)
            if (keys.length > 0) {
                keys.forEach((_fence) => {
                    const { latitude: lat, longitude: lng, raio, callBack } = _fence;
                    _fence.distancia = Math.round(latLngDist(lat, lng, latitude, longitude) * 1000);
                    _fence.dentroDoRaio = _fence.distancia <= raio;
                    const _cp = { ..._fence }
                    delete _cp.callBack;
                    if (callBack) callBack(_cp);
                });
            }
            if (!lootLocation) {
                const state = GrupoRotas.store.getState();
                const usuario_id = getItemByKeys(state, "autenticacao.usuario_id");
                if (!empty(usuario_id)) {
                    const endTime = (new Date()).getTime();
                    const intervaloEmSegundos = (endTime - startTime) / 1000;
                    lootLocation = true;
                    const distancia = globalParams.latitude === 0 ? 1000 : Math.round(latLngDist(globalParams.latitude, globalParams.longitude, latitude, longitude) * 1000);
                    if (intervaloEmSegundos > 30 || distancia > 30) {
                        startTime = (new Date()).getTime();
                        entregadorGeofence({
                            body_post:{
                                tipo: "WATCH"
                            },
                            body_rsa: {
                                latitude,
                                longitude,
                                usuario_id
                            }
                        }).then(({ response}) => {
                            // console.log("DISPAROU A NOTIFICAÇÃO VIA WATCH LOCATION");
                            dispatchNotifierOnResultGeofenceHttp(response);
                            lootLocation = false;
                        }).catch(() => {
                            console.log("falha ao enviar a localização em BG")
                            lootLocation = false;
                        })
                    }
                }
            }
        }
        globalParams.latitude = latitude;
        globalParams.longitude = longitude;
    }
    Geolocation.getCurrentPosition(_actionSuccess, _actionErr, {
        enableHighAccuracy: false,
        timeout: 20000,// em ms
        maximumAge: 1000 * 60 * 60,// em ms
        ...defParans
    });
    console.log("WATCH ATIVADO");
    watchId = Geolocation.watchPosition(_actionSuccess, _actionErr, {
        enableHighAccuracy: true,
        interval: 10000,// em ms
        fastestInterval: 5000,// em ms
        ...defParans
    });
}
export default () => new Promise((_resolve, _reject) => {
    requestPermission(_resolve, _reject, _currentLocation)
})
