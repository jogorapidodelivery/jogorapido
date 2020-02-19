import { AppRegistry, Platform, Linking, Alert } from "react-native"
import firebase from "react-native-firebase"
import { globalParams } from "@sd/fetch/DataFormat";
export const initFirebase = (_callBack = undefined) => {
    const _dataNotification = data => new Promise((_resolve) => {
        console.log("DADOS RECEBIDOS VIA NOTIFICAÇÃO")
        console.log(data);
        if (_resolve !== undefined) _callBack(data, _resolve);
        else _resolve();
    })
    const _sucessToken = _token => {
        globalParams.app_id = _token;
        console.log({ app_id: _token});
        firebase.messaging().subscribeToTopic("todos")
        firebase.messaging().subscribeToTopic(`${Platform.OS}`)
        firebase.notifications().onNotificationOpened(({_data:data}) => {
            _dataNotification({ ...data, type: "DISPLAY"});
        })
        firebase.notifications().onNotification(({ _data:data}) => {
            _dataNotification({ ...data, type: "DISPLAY" });
        })
        firebase.messaging().onMessage(({ _data:data}) => {
            _dataNotification({ ...data, type: "DISPLAY" });
        })
        /*firebase.notifications().onNotificationDisplayed((message) => {
            // somente IOS
            if (!empty(message)) _dataNotification(message);
        })*/
    }
    const _getToken = () => {
        firebase.messaging().getToken().then(_newToken => {
            if (_newToken) {
                firebase.messaging().onTokenRefresh(_sucessToken)
                _sucessToken(_newToken)
            }
        }).catch(_e => {
            firebase.messaging().onTokenRefresh(_sucessToken)
        })
    }
    const _requestPermission = () => {
        firebase.messaging().requestPermission().then(() => _getToken()).catch(_e => {
            setTimeout(() => {
                Alert.alert("PERMITIR NOTIFICAÇÕES", "Ative o recurso de receber mensagens via push para se manter atualizado. Deseja ativar o recebimento de push?", [
                    { text: "Agora não", style: "cancel" },
                    { text: "Ativar", onPress: () => Linking.openURL("app-settings:") }
                ], { cancelable: true });
            }, 2000);
        })
    }
    
    AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => async ({data}) => {
        return _dataNotification({ ...data, type: "BACKGROUND" });
    })
    firebase.messaging().hasPermission().then(enabled => {
        if (enabled) _getToken()
        else _requestPermission()
    }).catch(_e => _requestPermission())
}