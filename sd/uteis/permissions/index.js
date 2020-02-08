import requestPermission from "./permission";
import Geolocation from "react-native-geolocation-service"
import { GrupoRotas } from "@sd/navigation/revestir";
import { globalParams } from "@sd/fetch/DataFormat";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import { empty } from "@sd/uteis/StringUteis";
import { latLngDist } from "@sd/uteis/NumberUteis";
import { entregadorGeofence } from "@apis/actions/entregador";
let fences = [];
export const addFence = ({ latitude, longitude, raio, callBack, name }) => {
    fences.push({ latitude, longitude, raio, callBack, name });
    const distancia = globalParams.latitude === 0 ? 1000 : Math.round(latLngDist(globalParams.latitude, globalParams.longitude, latitude, longitude) * 1000);
    return { dentroDoRaio: distancia <= raio, distancia };
}
export const destroyFence = () => {
    fences = [];
}
const _currentLocation = () => {
    const _actionErr = _err => {
        console.log(_err)
    }
    let lootLocation = false;
    let startTime = (new Date()).getTime()
    const _actionSuccess = ({ coords: { latitude, longitude } }) => {
        if (GrupoRotas.store !== undefined && GrupoRotas.store !== null) {
            if (fences.length > 0) {
                fences.forEach(({ latitude: lat, longitude: lng, raio, callBack, name}) => {
                    const distancia = Math.round(latLngDist(lat, lng, latitude, longitude) * 1000);
                    if (callBack) callBack({ dentroDoRaio: distancia <= raio, distancia})
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
                            body_rsa: {
                                latitude,
                                longitude,
                                usuario_id
                            }
                        }).then(() => {
                            lootLocation = false;
                        }).catch(() => {
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
        distanceFilter: 10// metros
    });
    Geolocation.watchPosition(_actionSuccess, _actionErr, { 
        enableHighAccuracy: true,
        interval: 10000,// em ms
        fastestInterval: 5000,// em ms
        distanceFilter: 10// metros
    });
}
export default () => new Promise((_resolve, _reject) => {
    requestPermission(_resolve, _reject, _currentLocation)
})
