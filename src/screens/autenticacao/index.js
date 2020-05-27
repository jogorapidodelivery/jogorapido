import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Image, LayoutAnimation} from 'react-native';
import styl from './styl';
import {cor} from '@root/app.json';
import {actionAutenticar} from '@actions/';
import permissions from '@sd/uteis/permissions/index';
import {openPageStart} from './command';
import {View as ViewAnimatable} from 'react-native-animatable';
import Falhas from './partial/falhas';
function Autenticacao({navigation}) {
  const [falhas, setFalhas] = useState([]);
  useEffect(() => {
    permissions()
      .then(() => {
        actionAutenticar()
          .then(() => {
            openPageStart(navigation, 500);
          })
          .catch(() => {
            openPageStart(navigation, 0);
          });
      })
      .catch(_falhas => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        setFalhas(_falhas);
      });
  }, [navigation]);
  return (
    <ViewAnimatable
      useNativeDriver={true}
      delay={200}
      animation="flipInY"
      style={styl.container}>
      <Image
        source={require('@images/logo-splash.png')}
        style={styl.bgIos}
        resizeMode="contain"
      />
      {falhas.length === 0 ? (
        <ActivityIndicator size="large" color={cor['08']} />
      ) : (
        <Falhas falhas={falhas} />
      )}
    </ViewAnimatable>
  );
}
export default Autenticacao;
