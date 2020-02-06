import { SDNavigation } from "@sd/navigation"
import { GrupoRotas } from "@sd/navigation/revestir";
import { getItemByKeys } from "@sd/uteis/ArrayUteis";
import reducers from "@reducers/";
import Autenticacao from "@screens/autenticacao";
import Alerta from "@modal/alerta";
import Carregando from "@modal/carregando";
import Confirma from "@modal/confirma";
import Conectar from "@screens/autenticacao/conectar";
import CriarConta from "@screens/autenticacao/criar-conta";
import ValidarEmail from "@screens/autenticacao/validar-email";
import RecuperarSenha from "@screens/autenticacao/recuperar-senha";
import ChecarTokenEmailGoRecuperarSenha from "@screens/autenticacao/recuperar-senha/checar-token-email";
import AlterarSenha from "@screens/autenticacao/recuperar-senha/alterar-senha";
import Gaveta from "@screens/home/menu";
import Home from "@screens/home";
import ChecarTokenEmailGoHome from "@screens/autenticacao/validar-email/checar-token-email/index";
import { initFirebase } from "@sd/uteis/Firebase";
import Coletar from "@screens/coleta-e-entrega";
import MeusDadosChecarTokenEmail from "@screens/home/meus-dados/checar-token-email/index";
import MeusDadosAlterarSenha from "@screens/home/meus-dados/alterar-senha/index";
import { COLETA_NOVA, COLETA_ATUALIZAR_STATUS } from '@constants/';
import moment from "moment"
import ptLocale from "moment/locale/pt";
moment.updateLocale("pt", ptLocale)
SDNavigation.registerScreens({
    autenticacao: { name: "autenticacao", screen: Autenticacao },
    alerta: { name: "alerta", screen: Alerta },
    carregando: { name: "carregando", screen: Carregando },
    confirma: { name: "confirma", screen: Confirma },
    conectar: { name: "conectar", screen: Conectar },
    criarConta: { name: "criarConta", screen: CriarConta },
    validarEmail: { name: "validarEmail", screen: ValidarEmail },
    recuperarSenha: { name: "recuperarSenha", screen: RecuperarSenha },
    checarTokenEmailGoRecuperarSenha: { name: "checarTokenEmailGoRecuperarSenha", screen: ChecarTokenEmailGoRecuperarSenha },
    checarTokenEmailGoHome: { name: "checarTokenEmailGoHome", screen: ChecarTokenEmailGoHome },
    alterarSenha: { name: "alterarSenha", screen: AlterarSenha },
    home: { name: "home", screen: Home },
    coletar: { name: "coletar", screen: Coletar },
    meusDadosChecarTokenEmail: { name: "meusDadosChecarTokenEmail", screen: MeusDadosChecarTokenEmail },
    meusDadosAlterarSenha: { name: "meusDadosAlterarSenha", screen: MeusDadosAlterarSenha }
})

SDNavigation.addModal([
    SDNavigation.addSwitch([
        "autenticacao",
        SDNavigation.addStack([
            "conectar",
            "recuperarSenha",
            "checarTokenEmailGoRecuperarSenha",
            "alterarSenha",
            "criarConta"
        ]),
        SDNavigation.addDrawer(Gaveta, [
            SDNavigation.addStack([
                "home",
                "meusDadosChecarTokenEmail",
                "meusDadosAlterarSenha"
            ])
        ]),
        SDNavigation.addStack(["validarEmail", "checarTokenEmailGoHome"]),
        SDNavigation.addStack(["coletar"])
    ]),
    "alerta",
    "carregando",
    "confirma"
])
initFirebase((response) => {
    const state = GrupoRotas.store.getState();
    console.log("[initFirebase] switch case response")
    // response = { "acao": "nova_coleta", "bairro_cliente": "Vila Pedroso altera", "bairro_unidade": "Setor Bueno", "cep_cliente": "74770160", "cep_unidade": "74230-100", "cidade_cliente": "GOIANIA", "cidade_unidade": "Goiânia", "cliente": "VILMAR", "coleta_id": "11", "complemento_cliente": "complemento alter", "complemento_unidade": "", "data_agendamento": "2020-02-03", "data_cadastro": "2020-01-30 08:15:38-03", "distancia_unidade_cliente": "17.84", "endereco_cliente": "ENDERECO PRINCIPAL", "endereco_unidade": "Rua T 63", "hora_agendamento": "23:00", "latitude_cliente": "-16.6603317", "latitude_unidade": "-16.7138298", "longitude_cliente": "-49.1816084", "longitude_unidade": "-49.2707126", "numero_cliente": "sn alter", "numero_unidade": "", "pedido_id": "824", "ponto_referencia_cliente": "", "ponto_referencia_unidade": "", "status": "Pendente", "status_color": "#f39c12", "tempo_rota_unidade_cliente": "29 minutos", "total_pedido": "209.34", "uf_cliente": "GO", "uf_unidade": "GO", "unidade": "SITIO DIGITAL", "valor_frete": "19.84" }
    const usuario_id = getItemByKeys(state, "autenticacao.usuario_id");
    if (usuario_id) {
        const status = getItemByKeys(response, "status");
        switch (status) {
            case "Pendente":
                GrupoRotas.store.dispatch({ type: COLETA_NOVA, response });
                SDNavigation.navegar.navigate("home");
                break;
            case "Confirmado":
                GrupoRotas.store.dispatch({ type: COLETA_ATUALIZAR_STATUS, response });
                SDNavigation.navegar.navigate("coletar");
                break;
            default:
                break;
        }
    }
    console.log(response);
})

//inicio geofence
// import BackgroundGeolocation from "react-native-background-geolocation";



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
// BackgroundGeolocation.onGeofence(geofence => {
//     console.log("[geofence] ", geofence.identifier, geofence.action);
// });




// const onLocation = (location) => {
//     console.log('[location] -', location);
// }
// const onError = (error) => {
//     console.warn('[location] ERROR -', error);
// }
// const onActivityChange = (event) => {
//     console.log('[activitychange] -', event);  // eg: 'on_foot', 'still', 'in_vehicle'
// }
// const onProviderChange = (provider) => {
//     console.log('[providerchange] -', provider.enabled, provider.status);
// }
// const onMotionChange = (event) => {
//     console.log('[motionchange] -', event.isMoving, event.location);
// }


// // This handler fires when movement states changes (stationary->moving; moving->stationary)
// BackgroundGeolocation.onMotionChange(onMotionChange);

// // This event fires when a change in motion activity is detected
// BackgroundGeolocation.onActivityChange(onActivityChange);

// // This event fires when the user toggles location-services authorization
// BackgroundGeolocation.onProviderChange(onProviderChange);

// ////
// // 2.  Execute #ready method (required)
// //
// BackgroundGeolocation.ready({
    // reset: true,
    // // Geolocation Config
    // desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
    // distanceFilter: 10,
    // // Activity Recognition
    // stopTimeout: 1,
    // // Application config
    // debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
    // logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
//     // HTTP / SQLite config
//     url: 'http://yourserver.com/locations',
//     stopOnTerminate: false,   // <-- Permita que o serviço em segundo plano continue acompanhando quando o usuário fechar o aplicativo.
//     startOnBoot: true,        // <-- Iniciar automaticamente o rastreamento quando o dispositivo estiver ligado.
//     batchSync: false,       // <-- [Default: false] Defina true para sincronizar locais com o servidor em uma única solicitação HTTP.
//     autoSync: true,         // <-- [Default: true] Defina true para sincronizar cada local com o servidor quando ele chegar.
//     headers: {              // <-- Optional HTTP headers
//         "X-FOO": "bar"
//     },
//     params: {               // <-- Optional HTTP params
//         "auth_token": "maybe_your_server_authenticates_via_token_YES?"
//     }
// }, (state) => {
//     console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

//     if (!state.enabled) {
//         ////
//         // 3. Start tracking!
//         //
//         BackgroundGeolocation.start(function () {
//             console.log("- Start success");
//         });
//     }
// });

//fim geofence
export default SDNavigation.initProject(reducers)