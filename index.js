import {AppRegistry, Text, TextInput, Platform} from 'react-native';
import App from '@src/App';
import {YellowBox} from 'react-native';
import {name as appName} from '@root/app.json';
import {initFirebase} from '@sd/uteis/Firebase';
import {triggerNotifier} from '@libs/dispatchNotify';
import {bgLocationFetch} from '@libs/geofence';
import CodePush from 'react-native-code-push';

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
  'Require cycle: node_modules/react-native-firebase',
]);
if (Platform.OS === 'android') {
  const codePushOptions = {
    checkFrequency: CodePush.CheckFrequency.ON_APP_START,
  };
  const AppUpdater = CodePush(codePushOptions)(App);
  AppRegistry.registerComponent(appName, () => AppUpdater);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
initFirebase(triggerNotifier);
bgLocationFetch();

// import 'react-native-gesture-handler';
// import React from 'react';
// import { AppRegistry } from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { name as appName } from './app.json';
// import RootStack from './src-bluetooth';

// const App = createAppContainer(RootStack);
// AppRegistry.registerComponent(appName, () => App);
