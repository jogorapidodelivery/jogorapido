import React, {memo} from 'react';
import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import styl from './styl';
import ItemColeta from './partial/coleta';
import Button from '@sd/components/button';
import {whatsapp} from '@screens/home/menu/partial/item/commands';
import Header from './partial/header';
import Filtro from './partial/filtro';
function MinhasColetasComponent({
  data,
  refreshing,
  onRefresh,
  filter,
  updateFilter,
}) {
  return (
    <ImageBackground
      source={require('@images/gradiente.png')}
      style={styl.warpBackground}
      imageStyle={styl.imageBackground}>
      <SafeAreaView style={styl.container}>
        <Header titulo="Minhas coletas" />
        <FlatList
          ListHeaderComponent={<Filtro filter={filter} action={updateFilter} />}
          ListFooterComponent={
            <Button
              onPress={whatsapp}
              style={styl.btnAjuda}
              text={{value: 'Preciso de ajuda', color: '07'}}
              leftIcon={{value: '', color: '07'}}
              styleName="pequeno"
              bg="09"
            />
          }
          refreshControl={
            <RefreshControl
              tintColor="#fff"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={data}
          renderItem={({item}) => <ItemColeta {...item} />}
          keyExtractor={({name}) => name}
          style={styl.list}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
export default memo(MinhasColetasComponent);
