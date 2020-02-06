import { request, PERMISSIONS, RESULTS } from "react-native-permissions"
export default (_resolve, _reject, _currentLocation) => {
    let falhaEmPermissoes = []
    const _accessCamera = () => {
        request(PERMISSIONS.ANDROID.CAMERA).then((camera) => {
            console.log(camera, RESULTS)
            if (camera !== RESULTS.GRANTED) falhaEmPermissoes.push("câmera")
            if (falhaEmPermissoes.length > 0) _reject(falhaEmPermissoes);
            else {
                _currentLocation();
                _resolve();
            }
        }).catch((_err) => {
            falhaEmPermissoes.push("câmera")
            if (falhaEmPermissoes.length > 0) _reject(falhaEmPermissoes);
            else {
                _currentLocation();
                _resolve();
            }
        })
    }
    const _accessFine = () => {
        request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((fine) => {
            if (fine !== RESULTS.GRANTED) falhaEmPermissoes.push("localização")
            _accessCamera()
        }).catch((_err) => {
            falhaEmPermissoes.push("localização")
            _accessCamera()
        })
    }
    request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION).then(() => {
        _accessFine()
    }).catch((_err) => {
        falhaEmPermissoes.push("localização")
        _accessFine()
    })
}
/**
 * geofence
 * https://transistorsoft.github.io/react-native-background-geolocation/interfaces/_react_native_background_geolocation_.geofence.html
 * https://www.npmjs.com/package/react-native-geo-fencing
 */