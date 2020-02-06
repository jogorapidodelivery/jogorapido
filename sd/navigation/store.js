import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from "redux-thunk"
import { Platform, NativeModules } from 'react-native';
let _op;
if (__DEV__) {
    if (Platform.OS === 'ios') {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
    }
    _op = composeWithDevTools(
        applyMiddleware()
        // thunkMiddleware
    );
} else {
    _op = compose(
        applyMiddleware()
        // thunkMiddleware
    );
}
export const SDCreateStore = reducers => createStore(reducers, undefined, _op);
