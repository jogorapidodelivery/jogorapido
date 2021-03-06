import React, {memo} from 'react';
import {View} from 'react-native';
import Button from '@sd/components/button';
import {whatsapp} from '@screens/home/menu/partial/item/commands';
import styl from './styl';
import {actionClickCheckout} from '../../actions/actionsCheckout';
import Counter from './counter';
function Footer({
  totalPedidosSelecionado,
  totalPedidos,
  coleta_ids,
  entregador_id,
  pop,
  navigate,
  push,
}) {
  const hasSubmit = totalPedidosSelecionado === totalPedidos;
  const onPress = () => {
    if (hasSubmit) {
      actionClickCheckout({pop, navigate, push, coleta_ids, entregador_id});
    } else {
      push('alerta', {
        params: {
          titulo: 'JogoRápido',
          mensagem:
            'Para dar saida do estabelecimento é necessário selecionar todos os produtos da coleta.',
        },
      });
    }
  };
  return (
    <View style={styl.container}>
      <Counter
        totalPedidosSelecionado={totalPedidosSelecionado}
        totalPedidos={totalPedidos}
      />
      <Button
        onPress={onPress}
        text={{
          value: 'Saindo estabelecimento',
          color: '07',
        }}
        bg={hasSubmit ? '14' : '15'}
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
