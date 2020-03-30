import { AppRegistry } from 'react-native';
import App from '@src/App';
import { YellowBox } from 'react-native';
import { name as appName } from '@root/app.json';
import { initFirebase } from "@sd/uteis/Firebase";
import { triggerNotifier } from '@libs/dispatchNotify';
import { bgLocationFetch } from "@libs/geofence";
import codePush from 'react-native-code-push';
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'Require cycle: node_modules/react-native-firebase'
]);

const codePushOptions = {
    checkFrequency: codePush.CheckFrequency.ON_APP_START
}
const AppUpdater = codePush(codePushOptions)(App);
AppRegistry.registerComponent(appName, () => AppUpdater);
initFirebase(triggerNotifier);
bgLocationFetch();