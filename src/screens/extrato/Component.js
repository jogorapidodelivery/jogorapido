import React, {memo} from 'react';
import styl from './styl';
import {FlatList, View, Text} from 'react-native';
import BaseScreen from '@screens/partial/base';
import Header from './partial/header';
import Footer from './partial/footer';
import Item from './partial/item';
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
    <BaseScreen
      style={styl.container}
      tituloBold="MINHAS"
      onRefresh={refresh}
      navigation={navigation}
      titulo="CORRIDAS">
      <FlatList
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
        ListFooterComponent={!loading && <Footer totalPeriodo={totalPeriodo} />}
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
    </BaseScreen>
  );
}
export default memo(Component);
