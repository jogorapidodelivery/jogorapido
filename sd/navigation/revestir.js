import { Provider } from "react-redux"
import React, { PureComponent, Fragment } from "react";
import { StatusBar } from "react-native";
// import AlertTipoToast from "@src/components/alert-toast/index";
// import LinearGradient from "react-native-linear-gradient";
// import { cor } from "@root/app.json";
// import styl from "./styl";
export let GrupoRotas = {
    container: undefined,
    store: undefined
}
export default class Revestir extends PureComponent {
    render() {
        return <Fragment>
            <StatusBar translucent backgroundColor="rgba(20,20,20,0)" barStyle="light-content" />
            <Provider store={GrupoRotas.store}>
                <GrupoRotas.container />
            </Provider>
        </Fragment>
    }
}