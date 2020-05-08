import React, {memo} from 'react';
import {
  View,
  SafeAreaView,
  SectionList,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import styl from './styl';
import Header from '../../partial/header';
import Footer from './partial/footer';
import HeaderUnidade from '../checkout-estabelecimento/partial/header';
import FooterTotal from '../checkout-estabelecimento/partial/total';
import ItemCheckout from '../checkout-estabelecimento/partial/produto';
const dataVazio = [{actived: -1}];
const dataListVazio = [
  {sectionIndex: 0, data: dataVazio},
  {sectionIndex: 0, data: dataVazio},
  {sectionIndex: 1, data: dataVazio},
];
function CheckinClienteComponent({
  push,
  navigate,
  pop,
  data,
  changeCheckBox,
  footerData,
  refreshing,
  onRefresh,
  onChange,
}) {
  let vazio = data.length === 0;
  if (vazio) {
    data = dataListVazio;
  }
  console.log('listagem');
  console.log(data);
  return (
    <ImageBackground
      source={require('@images/gradiente.png')}
      style={styl.warpBackground}
      imageStyle={styl.imageBackground}>
      <SafeAreaView style={styl.container}>
        <Header titulo="Lista de produtos" goto={pop} />
        <View style={styl.warpList}>
          <SectionList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styl.list}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            sections={data}
            renderSectionFooter={({section: {total, frete}}) => (
              <FooterTotal frete={frete} total={total} />
            )}
            renderSectionHeader={({section: {titulo}}) => (
              <HeaderUnidade titulo={titulo} />
            )}
            renderItem={({item, index, section: {sectionIndex}}) => (
              <ItemCheckout
                checkbox={false}
                {...item}
                index={index}
                sectionIndex={sectionIndex}
                onChange={onChange}
              />
            )}
            keyExtractor={({actived}, index) => {
              const selecionado = actived ? 1 : 0;
              const key = `selecionado-${selecionado}-index-${index}`;
              return key;
            }}
            extraData={changeCheckBox}
            ListFooterComponent={
              vazio ? null : (
                <Footer
                  push={push}
                  navigate={navigate}
                  pop={pop}
                  {...data[0]}
                  {...footerData}
                />
              )
            }
          />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default memo(CheckinClienteComponent);
