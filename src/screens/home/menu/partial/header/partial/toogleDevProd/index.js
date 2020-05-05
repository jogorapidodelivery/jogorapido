import React, {useState} from 'react';
import {View, Switch, Text} from 'react-native';
import {actionAutenticar} from '@actions/';
import {SDNavigation} from '@sd/navigation';
import {cor} from '@root/app.json';
import styl from './styl';
import {setBaseUrl, hasDev} from '@sd/fetch/baseUrl';
export default function ToogleDevProd() {
  const [isProduction, setIsProduction] = useState(hasDev);
  const toggleBetaProduction = async () => {
    try {
      SDNavigation.navegar.push('carregando');
      const isDev = !isProduction;
      setBaseUrl(isDev);
      setIsProduction(isDev);
      await actionAutenticar(true);
      SDNavigation.navegar.pop();
    } catch (_err) {
      SDNavigation.navegar.pop();
    }
  };
  return (
    <View style={styl.warp}>
      <Switch
        trackColor={{false: cor['25'], true: cor['25']}}
        thumbColor={isProduction ? cor['10'] : cor['05']}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleBetaProduction}
        value={isProduction}
      />
      <Text style={styl.text}>
        {isProduction ? 'Admin Beta' : 'Admin Produção'}
      </Text>
    </View>
  );
}
