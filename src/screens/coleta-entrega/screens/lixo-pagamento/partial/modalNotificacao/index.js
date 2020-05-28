import React, {memo} from 'react';
import {Modal, View, ActivityIndicator, Text} from 'react-native';
import styl from './styl';
import {cor} from '@root/app.json';
function ModalNotificacao({erro, info}) {
  const visible =
    (erro !== null && erro !== '') || (info !== null && info !== '');
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styl.container}>
        <View style={styl.warp}>
          <ActivityIndicator size="large" color={cor['07']} />
          <Text style={styl.text}>carregando...</Text>
        </View>
        {erro && <Text style={styl.erro}>{erro}</Text>}
        {info && <Text style={styl.info}>{info}</Text>}
      </View>
    </Modal>
  );
}
export default memo(ModalNotificacao);
