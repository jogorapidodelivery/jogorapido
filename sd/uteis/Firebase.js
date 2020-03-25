import { AppRegistry, Platform, Linking, Alert } from "react-native"
import firebase from "react-native-firebase"
import { globalParams } from "@sd/fetch/DataFormat";
export const initFirebase = (_callBack = undefined) => {
    const _dataNotification = data => {
        return new Promise(async (_resolve, _reject) => {
            if (_callBack !== undefined) {
                try{
                    await _callBack(data);
                    console.log("INNER_NOTIFIER_THEN", new Date())
                    _resolve();
                }catch(e){
                    console.log("INNER_NOTIFIER_CATCH", new Date())
                    _reject();
                }
            }
            else {
                console.log("INNER_NOTIFIER_CALLBACK_NULL", new Date())
                _reject();
            }
        })
    }
    const _sucessToken = _token => {
        globalParams.app_id = _token;
        console.log({ app_id: _token});
        firebase.messaging().subscribeToTopic("todos")
        firebase.messaging().subscribeToTopic(`${Platform.OS}`)
        firebase.notifications().onNotificationOpened(async ({ notification: { _data:data}}) => {
            console.log("ON_OPENED", new Date());
            try{
                return await _dataNotification({ ...data, type: "DISPLAY", listener: "ON_OPENED" });
            } catch(_err) {
                return Promise.resolve()
            }
        })
        firebase.notifications().onNotification(async ({ _data:data}) => {
            console.log("ON_NOTIFICATION", new Date());
            try{
                return await _dataNotification({ ...data, type: "DISPLAY", listener: "ON_NOTIFICATION" });
            } catch (_err) {
                return Promise.resolve()
            }
        })
        firebase.messaging().onMessage(async ({ _data:data}) => {
            console.log("ON_DISPLAY_MESSAGING", new Date());
            console.log(data)
            try{
                return await _dataNotification({ ...data, type: "DISPLAY", listener: "ON_DISPLAY_MESSAGING" });
            } catch (_err) {
                return new Promise(_resolve => _resolve)
            }
        })
        try{
            if (firebase.messaging().setBackgroundMessageHandler !== undefined) {
                firebase.messaging().setBackgroundMessageHandler(async ({ _data:data}) => {
                    console.log("ON_BACKGROUND_MESSAGING", new Date());
                    try{
                        return await _dataNotification({ ...data, type: "DISPLAY", listener: "ON_BACKGROUND_MESSAGING" });
                    } catch (_err) {
                        return Promise.resolve()
                    }
                })
            }
        } catch(_err){
            // 
        }
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
        // Dados ok
        console.log("ON_BACKGROUND", new Date());
        try{
            return await _dataNotification({ ...data, type: "BACKGROUND", listener: "ON_BACKGROUND" });
        } catch (_err) {
            return Promise.resolve();
        }
    })
    firebase.messaging().hasPermission().then(enabled => {
        if (enabled) _getToken()
        else _requestPermission()
    }).catch(_e => _requestPermission())
}