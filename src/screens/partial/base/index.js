import React, { PureComponent } from "react";
import { Animated, View, Text, Dimensions, KeyboardAvoidingView, Platform, LayoutAnimation } from "react-native";
import styl from "./styl";
import LinearGradient from 'react-native-linear-gradient';
import Button from "@sd/components/button";
import { cor } from "@root/app.json";
const { height: hWindow } = Dimensions.get("window");
import { normalize } from "@sd/uteis/NumberUteis";
const behavior = Platform.select({
    android: "height",
    ios: "padding"
})
const heightGoBack = 15;
const heightHeader = 20;
export default class BaseScreen extends PureComponent {
    listView = undefined;
    constructor(props) {
        super(props)
        this.state = {
            scrollY: new Animated.Value(0)
        }
    }
    // componentDidUpdate(prevProps, prevState){
    //     if (prevProps !== prevState) {
    //         LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    //     }
    // }
    _clickScrollTop = () => {
        if (this.listView) this.listView.getNode().scrollTo({ y: 0, animated: true });
    }
    get renderHeader() {
        const { titulo, tituloBold, navigation } = this.props
        const { goBack } = navigation || {}
        return <View style={[styl.header, (goBack ? {} : { justifyContent: "center" })]}>
            {goBack && <Button onPress={goBack} leftIcon={{ value: "", color: "07" }} />}
            {(titulo || tituloBold) && <Text style={[styl.titulo]}>
                {tituloBold && <Text style={styl.bold}>{tituloBold} </Text>}
                {titulo && <Text>{titulo}</Text>}
            </Text>}
        </View>
    }
    render() {
        const { children, header, headerFix } = this.props;
        const headerHeight = header ? this.props.headerHeight : normalize(50);
        const { scrollY } = this.state;
        const translateY = scrollY.interpolate({
            inputRange: [0, headerHeight],
            outputRange: [-60, 0],
            extrapolate: 'clamp'
        });
        const scale = scrollY.interpolate({
            inputRange: [0, headerHeight],
            outputRange: [1, .8],
            extrapolate: 'clamp'
        });
        const translateY2 = scrollY.interpolate({
            inputRange: [headerHeight * .2, headerHeight],
            outputRange: [headerFix ? 0 : heightGoBack, -(headerHeight)],
            extrapolate: 'clamp'
        });
        const event = Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true });
        const minHeight = hWindow - headerHeight;
        const paddingBottom = headerHeight + heightHeader;
        return <KeyboardAvoidingView style={styl.container} behavior={behavior} enabled>
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: .5, y: .7 }}
                // colors={[cor["08"], cor["13"], cor["22"], cor["07"]]}
                colors={["#6763DE", "#6C63FF"]}
                style={styl.gradiente}
            >
            {/* <View style={[styl.gradiente, { backgroundColor: cor["08"]}]}> */}
                {headerFix}
                <View style={styl.warpContent}>
                    <Animated.ScrollView
                        ref={ref => this.listView = ref}
                        overScrollMode="never"
                        scrollEventThrottle={16}
                        showsVerticalScrollIndicator={false}
                        style={[styl.awareScrollView, { paddingTop: headerHeight - heightGoBack - (headerFix ? heightHeader : 0), top: heightHeader + heightGoBack }]}
                        onScroll={event}
                    >
                        <View style={[styl.warp, this.props.style, { minHeight, paddingBottom }]}>
                            {children}
                        </View>
                    </Animated.ScrollView>
                    <Animated.View style={[styl.warpHeaderAnn, {
                        transform: [{
                            translateY: translateY2
                        }, { perspective: scale }],
                    }]}>
                        {header === undefined ? this.renderHeader : header}
                    </Animated.View>
                    <Animated.View style={{
                        position: "absolute",
                        top: 0,
                        transform: [{
                            translateY
                        }],
                        width: "100%",
                    }}>
                        <Button
                            onPress={this._clickScrollTop}
                            style={{
                                alignItems: "center"
                            }}
                            leftIcon={{
                                value: "",
                                color: "07"
                            }}
                        />
                    </Animated.View>
                </View>
            </LinearGradient>
            {/* </View> */}
        </KeyboardAvoidingView>
    }
}