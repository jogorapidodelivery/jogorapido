import { AppRegistry } from 'react-native';
import App from '@src/App';
import { YellowBox } from 'react-native';
import { name as appName } from '@root/app.json';
import { initFirebase } from "@sd/uteis/Firebase";
import { triggerNotifier } from '@libs/dispatchNotify';
import { bgLocationFetch } from "@libs/geofence";
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'Require cycle: node_modules/react-native-firebase'
]);
AppRegistry.registerComponent(appName, () => App);
initFirebase(triggerNotifier);
bgLocationFetch();