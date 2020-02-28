import React, { Component, Fragment } from "react";
import { ActivityIndicator, View, Image, Linking, LayoutAnimation } from "react-native";
import styl from "./styl";
import { cor } from "@root/app.json";
import { empty } from "@sd/uteis/StringUteis";
import {actionAutenticar} from "@actions/";
import permissions from "@sd/uteis/permissions/index";
import Button from "@sd/components/button";
import Info from "@screens/partial/info";
import { openPageStart } from "./command";
import { View as ViewAnimatable } from "react-native-animatable";
export default class Autenticacao extends Component {
  static mapStateToProps = ["autenticacao.email", "autenticacao.senha"];
  constructor(props){
    super(props)
    this.state = {
      falhas:[]
    }
  }
  componentDidMount(){

    permissions().then(() => {
      actionAutenticar().then(() => {
        openPageStart(this.props.navigation, 500);
      }).catch(() => {
        openPageStart(this.props.navigation, 0);
      });
    }).catch(falhas => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({ falhas })
    })
  }
  _confirmarCodigo = () => {
    Linking.openSettings().catch((_err) => {
      console.warn("catch", _err)
    })
  }
  get _renderLoader(){
    return <ActivityIndicator size="large" color={cor["08"]} />
  }
  get renderFalhas(){
    const { falhas } = this.state
    const _fraseFinal = falhas.length === 1 ? "\nPara conceder esta permissão\nclique no botão abaixo e reinicie o app." : "\nPara conceder estas permissões\nclique no botão abaixo e reinicie o app."
    let _f = falhas.length > 2 ? ` e ${falhas.pop()}` : ""
    const msg = falhas.join(", ") + _f;
    return <Fragment>
      <Info data={["O App Jogo Rápido precisa de\nacesso ao(s) seguinte(s) recurso(s):\n", msg, _fraseFinal]} />
      <Button
        style={styl.button}
        onPress={this._confirmarCodigo}
        text={{
          value: "Configurações do APP",
          color: "07"
        }}
        bg="14"
        rightIcon={{
          value: "",
          color: "07"
        }}
      />
    </Fragment>
  }
  render() {
    const {falhas} = this.state
    return <ViewAnimatable useNativeDriver={true} delay={200} animation="flipInY" style={styl.container}>
      <Image source={require("@images/logo-splash.png")} style={styl.bgIos} resizeMode="contain"/>
      {falhas.length === 0 ? this._renderLoader : this.renderFalhas}
    </ViewAnimatable>
  }
}