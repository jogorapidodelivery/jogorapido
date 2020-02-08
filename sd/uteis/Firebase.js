import { Platform, Linking, Alert } from "react-native"
import firebase from "react-native-firebase"
// import { empty } from "@sd/uteis/StringUteis";
import { globalParams } from "@sd/fetch/DataFormat";
export const initFirebase = () => {// _resolve
    const _sucessToken = _token => {
        globalParams.app_id = _token;
        console.log({ app_id: _token});
        // firebase.messaging().subscribeToTopic("todos")
        // firebase.messaging().subscribeToTopic(`${Platform.OS}`)
        // firebase.notifications().onNotificationOpened((_n) => {
        //     // console.log("onNotificationOpened", _n)
        //     if (!empty(_n) && !empty(_n.notification)) {
        //         const { notification: { _data } } = _n
        //         _dataNotification(_data)
        //     } // else console.log("firebase::onNotificationOpened/empty:", _n)
        // })
        // firebase.notifications().getInitialNotification().then((_n) => {
        //     // console.log("getInitialNotification", _n)
        //     if (!empty(_n)) {
        //         const { notification: { _data } } = _n
        //         _dataNotification(_data)
        //     }// else console.log("firebase::getInitialNotification/empty:", _n)
        // })
        // firebase.notifications().onNotification((_n) => {
        //     // console.log("onNotification", _n)
        //     if (!empty(_n)) {
        //         const { _data } = _n
        //         _dataNotification(_data)
        //     }// else console.log("firebase::onNotification/empty:", _n)
        // })
        // firebase.notifications().onNotificationDisplayed((_n) => {
        //     // console.log("onNotificationDisplayed", _n)
        //     if (!empty(_n)) _dataNotification(_n)
        //     // else console.log("firebase::onNotificationDisplayed/empty:", _n)
        // })
        // firebase.messaging().onMessage(_r => {
        //     // console.log("firebase.messaging().onMessage", _r)
        //     const { _data } = _r
        //     _dataNotification({ ..._data })
        // })
    }
    // const _dataNotification = _data => {
    //     _resolve(_data)
    // }
    const _getToken = () => {
        // console.log("_getToken")
        firebase.messaging().getToken().then(_newToken => {
            // console.log(_newToken)
            if (_newToken) {
                firebase.messaging().onTokenRefresh(_sucessToken)
                _sucessToken(_newToken)
            }
        }).catch(_e => {
            // console.log(_e)
            firebase.messaging().onTokenRefresh(_sucessToken)
        })
    }
    const _requestPermission = () => {
        firebase.messaging().requestPermission().then(() => _getToken()).catch(_e => {
            setTimeout(() => {
                Alert.alert("PERMITIR NOTIFICAÇÕES", "Ative o recurso de receber mensagens via push para se manter atualizado. Deseja ativar o recebimento de push?", [
                    { text: "Agora não", style: "cancel" },
                    { text: "Ativar", onPress: () => Linking.openURL("app-settings:") }
                ], { cancelable: true })
            }, 2000)
        })
    }
    firebase.messaging().hasPermission().then(enabled => {
        if (enabled) _getToken()
        else _requestPermission()
    }).catch(_e => _requestPermission())
}