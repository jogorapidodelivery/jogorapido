import React, {memo} from 'react';
import {View} from 'react-native';
import Button from '@sd/components/button';
import {whatsapp} from '@screens/home/menu/partial/item/commands';
import styl from './styl';
import {
  actionClickCheckout,
  actionGotoPay,
} from '../../actions/actionsCheckout';

function Footer({total, coleta_id, entregador_id, forma_pagamento}) {
  const onPress = () => {
    if (forma_pagamento === 'dinheiro') {
      actionClickCheckout({coleta_id, entregador_id});
    } else {
      console.log('PAGAMENTO COM CARTÃO AQUI');
      actionClickCheckout({coleta_id, entregador_id});
      if (false) {
        actionGotoPay({total, coleta_id, entregador_id});
      }
    }
  };
  return (
    <View style={styl.container}>
      <Button
        onPress={onPress}
        text={{
          value:
            forma_pagamento === 'dinheiro'
              ? 'Saindo cliente'
              : 'Receber do cliente',
          color: '07',
        }}
        bg={'14'}
      />
      <Button
        onPress={whatsapp}
        style={styl.btnAjuda}
        text={{value: 'Preciso de ajuda', color: '07'}}
        leftIcon={{value: '', color: '07'}}
        styleName="pequeno"
        bg="09"
      />
    </View>
  );
}
export default memo(Footer);
