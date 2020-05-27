import React, {memo, Fragment} from 'react';
import styl from './styl';
import {Text, FlatList} from 'react-native';
import {stylDefault} from '@src/stylDefault';
import MenuItem from '../menuItem';
import {
  View as AnimatableView,
  Text as AnimatableText,
} from 'react-native-animatable';
function Header({toogleDay, dia, semana, diaSelecionado}) {
  const _extractHeader = (_item, index) => {
    return `index-${index}-${diaSelecionado || '0'}`;
  };
  const _renderDay = ({item, index}) => {
    return (
      <MenuItem
        onPress={toogleDay}
        {...item}
        index={index}
        selected={diaSelecionado === index}
      />
    );
  };
  return (
    <Fragment>
      <AnimatableText
        animation="flipInX"
        useNativeDriver={true}
        style={[stylDefault.p, styl.p]}>
        Clique no dia da semana e marque a{'\n'}
        <Text style={stylDefault.bold}>escala</Text> que deseja estar
        disponível.
      </AnimatableText>
      <AnimatableText
        animation="fadeIn"
        useNativeDriver={true}
        delay={50}
        style={[stylDefault.span, styl.span]}>
        Repita esta ação para todos os dias{'\n'}da semana e clique em salvar
      </AnimatableText>
      <AnimatableView animation="flipInX" useNativeDriver={true}>
        <FlatList
          extraData={diaSelecionado || 0}
          data={semana}
          numColumns={7}
          keyExtractor={_extractHeader}
          renderItem={_renderDay}
        />
      </AnimatableView>
      <AnimatableText
        animation="fadeIn"
        useNativeDriver={true}
        delay={50}
        style={[stylDefault.p, styl.dia]}>
        Escala de todas as {dia}
      </AnimatableText>
    </Fragment>
  );
}
export default memo(Header);
