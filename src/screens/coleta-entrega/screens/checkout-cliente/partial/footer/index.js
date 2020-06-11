import React, {memo} from 'react';
import {View} from 'react-native';
import Button from '@sd/components/button';
import {whatsapp} from '@screens/home/menu/partial/item/commands';
import styl from './styl';
import {actionClickCheckout} from '../../actions/actionsCheckout';
import Counter from '../../../checkout-estabelecimento/partial/footer/counter';
function Footer({
  push,
  navigate,
  pop,
  coleta_id,
  entregador_id,
  forma_pagamento,
  pinpad,
  split_rules,
  valorTotal,
  totalPedidosSelecionado,
  totalPedidos,
}) {
  console.log({pinpad});
  const hasSubmit = totalPedidosSelecionado === totalPedidos;
  const actionAlert = mensagem => {
    push('alerta', {
      params: {
        titulo: 'JogoRápido',
        mensagem,
      },
    });
  };
  const handlerSaindoCliente = () => {
    if (hasSubmit) {
      actionClickCheckout({push, navigate, pop, coleta_id, entregador_id});
    } else {
      actionAlert(
        'Para sair do cliente é necessário selecionar todos os produtos da coleta.',
      );
    }
  };
  const handlerCredito = () => {
    if (hasSubmit) {
      push('coletaPagamento', {
        params: {
          split_rules,
          tipoPagamentoValue: 'CreditCard',
          tipoPagamentoLabel: 'Crédito',
          valorTotal,
          coleta_id,
        },
      });
    } else {
      actionAlert(
        'Para receber do cliente é necessário selecionar todos os produtos da coleta.',
      );
    }
  };
  const handlerDebito = () => {
    if (hasSubmit) {
      push('coletaPagamento', {
        params: {
          split_rules,
          tipoPagamentoValue: 'DebitCard',
          tipoPagamentoLabel: 'Débito',
          valorTotal,
          coleta_id,
        },
      });
    } else {
      actionAlert(
        'Para receber do cliente é necessário selecionar todos os produtos da coleta.',
      );
    }
  };
  return (
    <View style={styl.container}>
      <Counter
        totalPedidosSelecionado={totalPedidosSelecionado}
        totalPedidos={totalPedidos}
      />
      {!pinpad && (
        <Button
          onPress={handlerSaindoCliente}
          text={{
            value: 'Saindo cliente',
            color: '07',
          }}
          bg={hasSubmit ? '14' : '15'}
        />
      )}
      {pinpad && (
        <Button
          onPress={handlerCredito}
          text={{
            value: 'Receber no crédito',
            color: '07',
          }}
          bg={hasSubmit ? '14' : '15'}
        />
      )}
      {pinpad && (
        <Counter
          totalPedidosSelecionado={totalPedidosSelecionado}
          totalPedidos={totalPedidos}
        />
      )}
      {pinpad && (
        <Button
          onPress={handlerDebito}
          text={{
            value: 'Receber no débito',
            color: '07',
          }}
          bg={hasSubmit ? '14' : '15'}
        />
      )}
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
