import React, {memo} from 'react';
import styl from './styl';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  View,
  Text,
  RefreshControl,
} from 'react-native';
import Header from './partial/header';
import HeaderScreen from '@screens/coleta-entrega/partial/header';
import Footer from './partial/footer';
import Item from './partial/item';
import {cor} from '@root/app.json';
function Component({
  filtros,
  entregador_id,
  loading,
  data,
  mes_atual,
  totalPeriodo,
  total_mes_atual,
  navigation,
  refresh,
  load,
}) {
  const renderCorrida = ({item}) => <Item {...item} />;
  const extract = (_item, index) => `index-${index}`;
  return (
    <ImageBackground
      source={require('@images/gradiente.png')}
      style={styl.warpBackground}
      imageStyle={styl.imageBackground}>
      <SafeAreaView style={styl.container}>
        <HeaderScreen titulo="Minhas corridas" goto={navigation.pop} />
        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={cor['07']}
              refreshing={false}
              onRefresh={refresh}
            />
          }
          style={styl.list}
          ListHeaderComponent={
            <Header
              {...{
                load,
                navigation,
                filtros,
                entregador_id,
                mes_atual,
                total_mes_atual,
              }}
            />
          }
          ListFooterComponent={
            !loading &&
            data.length > 0 && <Footer totalPeriodo={totalPeriodo} />
          }
          ListEmptyComponent={
            <View style={styl.warpEmpty}>
              <Text style={styl.textEmpty}>
                Nenhuma atividade{'\n'}registrada neste periodo
              </Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={extract}
          renderItem={renderCorrida}
        />
      </SafeAreaView>
    </ImageBackground>
  );
}
export default memo(Component);
