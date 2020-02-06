/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import { YellowBox } from 'react-native';
import {name as appName} from './app.json';
YellowBox.ignoreWarnings([
    'VirtualizedLists should never be nested',
    'Require cycle: node_modules/react-native-firebase'
])
AppRegistry.registerComponent(appName, () => App);
