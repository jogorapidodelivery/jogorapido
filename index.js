import { AppRegistry, Text, TextInput } from "react-native";
import App from '@src/App';
import { YellowBox } from 'react-native';
import { name as appName } from '@root/app.json';
import { initFirebase } from "@sd/uteis/Firebase";
import { triggerNotifier } from '@libs/dispatchNotify';
import { bgLocationFetch } from "@libs/geofence";
import codePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'Require cycle: node_modules/react-native-firebase'
]);
Sentry.init({
    dsn: 'https://9b5931fcc9dc405eaa228e45b3ea5f1e@sentry.io/5182924',
});
const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START
}
const AppUpdater = codePush(codePushOptions)(App);
AppRegistry.registerComponent(appName, () => AppUpdater);
initFirebase(triggerNotifier);
bgLocationFetch();