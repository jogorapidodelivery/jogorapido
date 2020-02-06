import requestPermission from "./permission";
import Geolocation from "react-native-geolocation-service"

import { globalParams } from "@sd/fetch/DataFormat";

const _currentLocation = () => {
    const _actionErr = _err => {
        console.log(_err)
    }
    const _actionSuccess = ({ coords: { latitude, longitude } }) => {
        console.log({ latitude, longitude })
        globalParams.latitude = latitude
        globalParams.longitude = longitude
    }
    const _op = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000 * 60 * 60,
        distanceFilter: 800
    }
    Geolocation.getCurrentPosition(_actionSuccess, _actionErr, _op)
    Geolocation.watchPosition(_actionSuccess, _actionErr, _op)
}
export default () => new Promise((_resolve, _reject) => {
    requestPermission(_resolve, _reject, _currentLocation)
})
