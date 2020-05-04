/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  RefreshControl,
  TouchableOpacity,
  Animated,
  View,
  Text,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ImageBackground,
} from 'react-native';
import styl from './styl';
import Button from '@sd/components/button';
const {height: hWindow} = Dimensions.get('window');
import {normalize} from '@sd/uteis/NumberUteis';
import {cor} from '@root/app.json';
const behavior = Platform.select({
  android: 'height',
  ios: 'padding',
});
const heightHeader = 25;
export default class BaseScreen extends Component {
  listView = undefined;
  constructor(props) {
    super(props);
    this.state = {
      refreshingActived: false,
      scrollY: new Animated.Value(0),
    };
  }
  _onRefresh = () => {
    this.setState({refreshingActived: true});
    this.props.onRefresh(() => {
      this.setState({refreshingActived: false});
    });
  };
  _clickScrollTop = () => {
    if (this.listView) {
      this.listView.getNode().scrollTo({y: 0, animated: true});
    }
  };
  get renderHeader() {
    const {titulo, tituloBold, navigation} = this.props;
    const {goBack} = navigation || {};
    return (
      <View style={[styl.header, goBack ? {} : {justifyContent: 'center'}]}>
        {goBack && (
          <Button onPress={goBack} leftIcon={{value: '', color: '07'}} />
        )}
        {(titulo || tituloBold) && (
          <Text style={[styl.titulo]}>
            {tituloBold && <Text style={styl.bold}>{tituloBold} </Text>}
            {titulo && <Text>{titulo}</Text>}
          </Text>
        )}
      </View>
    );
  }
  render() {
    const {refreshingActived, scrollY} = this.state;
    const {
      children,
      header,
      headerFix,
      footerFix,
      onRefresh,
      noTopButton,
    } = this.props;
    const headerHeight = header ? this.props.headerHeight : normalize(50);
    const translateY = scrollY.interpolate({
      inputRange: [headerHeight, headerHeight + 50],
      outputRange: [-60, 0],
      extrapolate: 'clamp',
    });
    const opacity = scrollY.interpolate({
      inputRange: [0, headerHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    const event = Animated.event(
      [{nativeEvent: {contentOffset: {y: scrollY}}}],
      {useNativeDriver: true},
    );
    const minHeight = hWindow - headerHeight;
    const paddingBottom = heightHeader + 20;
    const marginTop = headerHeight;
    return (
      <KeyboardAvoidingView style={styl.container} behavior={behavior} enabled>
        <ImageBackground
          source={require('@images/gradiente.png')}
          style={styl.warpBackground}
          imageStyle={styl.imageBackground}>
          {headerFix}
          <Animated.ScrollView
            refreshControl={
              onRefresh ? (
                <RefreshControl
                  tintColor={cor['07']}
                  refreshing={refreshingActived}
                  onRefresh={this._onRefresh}
                />
              ) : null
            }
            ref={ref => (this.listView = ref)}
            overScrollMode="never"
            scrollEventThrottle={16}
            stickyHeaderIndices={[0]}
            showsVerticalScrollIndicator={false}
            style={[styl.awareScrollView, {top: heightHeader}]}
            onScroll={event}>
            <Animated.View
              style={[
                styl.warpHeaderAnn,
                {
                  opacity,
                  top: 0,
                  left: 0,
                  right: 0,
                  position: 'absolute',
                },
              ]}>
              {header === undefined ? this.renderHeader : header}
            </Animated.View>
            <View
              style={[
                styl.warp,
                this.props.style,
                {minHeight, paddingBottom, marginTop},
                this.props.styleImportant,
              ]}>
              {children}
            </View>
          </Animated.ScrollView>
          {footerFix && footerFix()}
          {noTopButton !== true && (
            <Animated.View
              style={[styl.warpButtomClose, {transform: [{translateY}]}]}>
              <TouchableOpacity
                onPress={this._clickScrollTop}
                style={styl.warpTop}>
                <View style={styl.bgTop} />
                <View style={styl.warpIconTop}>
                  <Text style={styl.warpTextTop}></Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          )}
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}
