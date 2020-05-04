import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View, Text, Platform} from 'react-native';
import styl from './styl';
import Header from './partial/header';
import Item from './partial/item/index';
import {version} from '@root/package.json';
import {stylDefault} from '@src/stylDefault';
import {useSelector} from 'react-redux';
import codePush from 'react-native-code-push';

export default function Menu({navigation}) {
  const {menu, email, telefone, foto, nome} = useSelector(
    ({autenticacao}) => autenticacao,
  );
  const extractItemList = useCallback((_item, index) => index.toString(), []);
  const renderItemList = useCallback(
    ({item, index}) => <Item {...item} index={index} navigation={navigation} />,
    [navigation],
  );
  const [versao, setVersao] = useState(version);
  useEffect(() => {
    if (Platform.OS === 'android') {
      codePush
        .getUpdateMetadata()
        .then(update => {
          if (update) {
            setVersao(update.appVersion + '-codepush:' + update.label);
          }
        })
        .catch(_err => {});
      return () => {
        // ?
      };
    }
  }, [versao]);
  return (
    <View style={styl.container}>
      <FlatList
        ListHeaderComponent={() => (
          <Header
            navigation={navigation}
            data={{email, telefone, foto, nome}}
          />
        )}
        style={styl.flatList}
        showsVerticalScrollIndicator={false}
        data={menu}
        keyExtractor={extractItemList}
        renderItem={renderItemList}
        ListFooterComponent={() => (
          <Text style={[stylDefault.span, styl.version]}>{versao}</Text>
        )}
      />
    </View>
  );
}
