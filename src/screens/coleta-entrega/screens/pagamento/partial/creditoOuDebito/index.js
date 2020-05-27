import React, {memo, Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styl from './styl';
function TenderBtn({actived, argument, action, titulo}) {
  const stylKey = actived === argument ? 'Actived' : 'Deactived';
  return (
    <TouchableOpacity
      onPress={() => action(argument)}
      style={[styl.btn, styl[`btn${stylKey}`], {flex: titulo.length}]}>
      <Text style={[styl.titulo, styl[`txt${stylKey}`]]}>{titulo}</Text>
    </TouchableOpacity>
  );
}
function CreditoOuDebito({creditoOuDebito, setCreditoOuDebito}) {
  return (
    <Fragment>
      <Text style={styl.h1}>Como deseja pagar</Text>
      <View style={styl.container}>
        <View style={styl.warp}>
          <TenderBtn
            titulo="Crédito"
            argument="CreditCard"
            actived={creditoOuDebito}
            action={setCreditoOuDebito}
          />
          <TenderBtn
            titulo="Débito"
            argument="DebitCard"
            actived={creditoOuDebito}
            action={setCreditoOuDebito}
          />
        </View>
      </View>
    </Fragment>
  );
}
export default memo(CreditoOuDebito);
