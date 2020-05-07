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
import HeaderUnidade from './partial/header';
import ItemCheckout from './partial/produto';
import FooterTotal from './partial/total';
import AjaxLoad from '@screens/partial/ajaxload';
const dataVazio = [{actived: -1}];
const dataListVazio = [
  {sectionIndex: 0, data: dataVazio},
  {sectionIndex: 0, data: dataVazio},
  {sectionIndex: 1, data: dataVazio},
];
function CheckoutUnidadeComponent({
  data,
  changeCheckBox,
  footerData,
  refreshing,
  onErrorReload,
  loadError,
  onRefresh,
  onChange,
  pop,
  navigate,
  push,
}) {
  let vazio = data.length === 0;
  if (vazio) {
    data = dataListVazio;
  }
  return (
    <ImageBackground
      source={require('@images/gradiente.png')}
      style={styl.warpBackground}
      imageStyle={styl.imageBackground}>
      <SafeAreaView style={styl.container}>
        <Header titulo="Coletas e produtos" goto={pop} />
        <AjaxLoad hasErro={loadError} callBack={onErrorReload}>
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
                  checkbox={true}
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
                    pop={pop}
                    navigate={navigate}
                    push={push}
                    {...footerData}
                  />
                )
              }
            />
          </View>
        </AjaxLoad>
      </SafeAreaView>
    </ImageBackground>
  );
}
export default memo(CheckoutUnidadeComponent);
