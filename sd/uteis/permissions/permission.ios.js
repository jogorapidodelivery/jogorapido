import { request, PERMISSIONS, RESULTS } from "react-native-permissions"
export default (_resolve, _reject, _currentLocation) => {
    Promise.all([
        request(PERMISSIONS.IOS.LOCATION_ALWAYS),
        request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE),
        request(PERMISSIONS.IOS.CAMERA),
        request(PERMISSIONS.IOS.PHOTO_LIBRARY),
        // …
    ]).then(([locationAlways, locationWhenUse, camera, galeria]) => {
        let falhaEmPermissoes = []
        switch (locationAlways) {
            case RESULTS.DENIED:
                console.log('local sempre) A permissão não foi solicitada / foi negada, mas solicitada');
            case RESULTS.UNAVAILABLE:
                console.log('local sempre) Este recurso não está disponível (neste dispositivo / neste contexto)');
            case RESULTS.BLOCKED:
                falhaEmPermissoes.push("localização")
                console.log('local sempre) A permissão é negada e não é mais solicitada');
                break;
            case RESULTS.GRANTED:
            default:
                console.log('local sempre) A permissão é concedida');
                break;
        }
        switch (locationWhenUse) {
            case RESULTS.DENIED:
                console.log('local em uso) A permissão não foi solicitada / foi negada, mas solicitada');
            case RESULTS.UNAVAILABLE:
                console.log('local em uso) Este recurso não está disponível (neste dispositivo / neste contexto)');
            case RESULTS.BLOCKED:
                if (falhaEmPermissoes.length === 0) {
                    falhaEmPermissoes.push("localização")
                }
                console.log('local em uso) A permissão é negada e não é mais solicitada');
                break;
            case RESULTS.GRANTED:
            default:
                console.log('local em uso) A permissão é concedida');
                break;
        }
        switch (camera) {
            case RESULTS.DENIED:
                console.log('camera) A permissão não foi solicitada / foi negada, mas solicitada');
            case RESULTS.UNAVAILABLE:
                console.log('camera) Este recurso não está disponível (neste dispositivo / neste contexto)');
            case RESULTS.BLOCKED:
                falhaEmPermissoes.push("câmera")
                console.log('camera) A permissão é negada e não é mais solicitada');
                break;
            case RESULTS.GRANTED:
            default:
                console.log('camera) A permissão é concedida');
                break;
        }
        switch (galeria) {
            case RESULTS.DENIED:
                console.log('galeria) A permissão não foi solicitada / foi negada, mas solicitada');
            case RESULTS.UNAVAILABLE:
                console.log('galeria) Este recurso não está disponível (neste dispositivo / neste contexto)');
            case RESULTS.BLOCKED:
                falhaEmPermissoes.push("galeria de fotos")
                console.log('galeria) A permissão é negada e não é mais solicitada');
                break;
            case RESULTS.GRANTED:
            default:
                console.log('galeria) A permissão é concedida');
                break;
        }
        if (falhaEmPermissoes.length > 0) _reject(falhaEmPermissoes);
        else {
            _currentLocation();
            _resolve();
        }
    })
}