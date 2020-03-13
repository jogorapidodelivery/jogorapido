import { request, PERMISSIONS, RESULTS } from "react-native-permissions"
export default (_resolve, _reject, _currentLocation) => {
    Promise.all([
        // request(PERMISSIONS.IOS.LOCATION_ALWAYS),
        request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
        // request(PERMISSIONS.IOS.MOTION),
        request(PERMISSIONS.IOS.CAMERA),
        request(PERMISSIONS.IOS.PHOTO_LIBRARY),
        /*
        <key>NSLocationWhenInUseUsageDescription</key>
	    <string>Sua localização é necessária para listar as empresas mais próximas a você</string> */
    ]).then(([locationAlways, locationWhenUse, camera, galeria]) => {
        let falhaEmPermissoes = []
        switch (locationAlways) {
            case RESULTS.DENIED:
                // local sempre) A permissão não foi solicitada / foi negada, mas solicitada;
            case RESULTS.UNAVAILABLE:
                // local sempre) Este recurso não está disponível (neste dispositivo / neste contexto);
            case RESULTS.BLOCKED:
                falhaEmPermissoes.push("localização")
                // local sempre) A permissão é negada e não é mais solicitada;
                break;
            case RESULTS.GRANTED:
            default:
                // local sempre) A permissão é concedida;
                break;
        }
        switch (locationWhenUse) {
            case RESULTS.DENIED:
                // local em uso) A permissão não foi solicitada / foi negada, mas solicitada;
            case RESULTS.UNAVAILABLE:
                // local em uso) Este recurso não está disponível (neste dispositivo / neste contexto);
            case RESULTS.BLOCKED:
                if (falhaEmPermissoes.length === 0) {
                    falhaEmPermissoes.push("localização")
                }
                // local em uso) A permissão é negada e não é mais solicitada;
                break;
            case RESULTS.GRANTED:
            default:
                // local em uso) A permissão é concedida;
                break;
        }
        switch (camera) {
            case RESULTS.DENIED:
                // camera) A permissão não foi solicitada / foi negada, mas solicitada;
            case RESULTS.UNAVAILABLE:
                // camera) Este recurso não está disponível (neste dispositivo / neste contexto);
            case RESULTS.BLOCKED:
                falhaEmPermissoes.push("câmera")
                // camera) A permissão é negada e não é mais solicitada;
                break;
            case RESULTS.GRANTED:
            default:
                // camera) A permissão é concedida;
                break;
        }
        switch (galeria) {
            case RESULTS.DENIED:
                // galeria) A permissão não foi solicitada / foi negada, mas solicitada;
            case RESULTS.UNAVAILABLE:
                // galeria) Este recurso não está disponível (neste dispositivo / neste contexto);
            case RESULTS.BLOCKED:
                falhaEmPermissoes.push("galeria de fotos")
                // galeria) A permissão é negada e não é mais solicitada;
                break;
            case RESULTS.GRANTED:
            default:
                // galeria) A permissão é concedida;
                break;
        }
        if (falhaEmPermissoes.length > 0) _reject(falhaEmPermissoes);
        else {
            _currentLocation();
            _resolve();
        }
    })
}