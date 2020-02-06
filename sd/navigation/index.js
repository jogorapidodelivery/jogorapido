import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import createAnimatedSwitchNavigator from "react-navigation-animated-switch";
import {createDrawerNavigator} from "react-navigation-drawer";
// import {FluidNavigator} from "react-navigation-fluid-transitions";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { Transition } from 'react-native-reanimated';
import { connect } from 'react-redux';
import { UDID } from "../uteis/StringUteis";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation-tabs";
import { normalize} from "@sd/uteis/NumberUteis";
import Revestir, { GrupoRotas } from "./revestir";
import { SDCreateStore } from "./store";
import { getItemByKeys } from "../uteis/ArrayUteis";
import { Platform, UIManager } from "react-native";
import { cor } from "@root/app.json";
const styleCard = {
    backgroundColor: "transparent",
    opacity: 1
}
const card = {
    cardStyle:styleCard,
    // cardOverlayEnabled:true,
    // stackPresentation:"transparentModal",
    // cardStyleInterpolator:() => ({
    //     cardStyle:styleCard,
    //     containerStyle:styleCard,
    //     overlayStyle:styleCard,
    //     shadowStyle:styleCard
    // })
}
class _Navigation {
    _data = {}
    navegar = {vazio:true};
    conectar = screen => {
        const { mapStateToProps, mapTransformProps } = screen;
        return connect((_state, { navigation }) => {
            if (this.navegar.vazio) this.navegar = navigation;
            if (mapStateToProps === undefined) {
                return { sd: {} }
            }
            let _r = {};
            mapStateToProps.forEach((key) => {
                const _start = key.lastIndexOf(".") + 1
                const _end = key.length
                const _name = key.substr(_start, _end)
                _r[_name] = getItemByKeys(_state, key)
            });
            return { sd: mapTransformProps ? mapTransformProps(_r) : _r }
        })(screen);
    }
    filterNavigation = _r => {
        let _navigation = {}
        _r.forEach((v) => {
            if (typeof v === "string") {
                const screen = this.conectar(this._data[v].screen);
                _navigation[v] = {
                    navigationOptions: {
                        headerShown: false,
                        // ...card
                    },
                    screen
                }
            } else {
                const { name, screen } = v;
                _navigation[name] = {
                    screen,
                    navigationOptions: {
                        headerShown: false,
                        // ...card
                    }
                }
            }
        });
        return _navigation;
    }
    registerScreens(_r) {
        this._data = { ..._r};
    }
    addModal(_r) {
        const _navigation = this.filterNavigation(_r);
        const createModalStack = createStackNavigator(_navigation, {
            mode:"modal",
            headerMode: "none",
            defaultNavigationOptions: {
                ...card,
                gestureEnabled: true,
                cardOverlayEnabled: true
            }
        });
        GrupoRotas.container = createAppContainer(createModalStack);
    }
    addSwitch(_r) {
        const _navigation = this.filterNavigation(_r);
        return {
            name:UDID(),
            screen: createAnimatedSwitchNavigator(_navigation, {
                defaultNavigationOptions: {
                    ...card,
                    cardOverlayEnabled: true
                },
                transition:<Transition.Together>
                    <Transition.In
                        type="fade"
                        durationMs={400}
                        interpolation="easeIn"
                    />
                    <Transition.Out type="fade" durationMs={800} />
                </Transition.Together>
                }
            )
        }
    }
    addStack(_r) {
        
        const _navigation = this.filterNavigation(_r)
        return {
            name: UDID(),
            screen: createStackNavigator(_navigation, {
                defaultNavigationOptions: {
                    ...card
                }
            })
        }
    }
    addFluidStack(_r) {// createSharedElementStackNavigator
        const _navigation = this.filterNavigation(_r);
        return {
            name: UDID(),
            screen: createSharedElementStackNavigator(createAnimatedSwitchNavigator,_navigation, {
                transition:<Transition.Together>
                    <Transition.Out
                        type="slide-bottom"
                        durationMs={400}
                        interpolation="easeIn"
                    />
                    <Transition.In type="fade" durationMs={800} />
                </Transition.Together>,
                defaultNavigationOptions: {
                    ...card
                }
            })
        }
    }
    addDrawer(contentComponent, _r) {
        const SlideFromRight = (index, position, width) => {
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [width, 0, 0]
            })
            const slideFromRight = { transform: [{ translateX }] }
            return slideFromRight
        };
        const _navigation = this.filterNavigation(_r)
        return {
            name: UDID(),
            screen: createDrawerNavigator(_navigation, {
                drawerWidth: normalize(280),
                contentComponent: this.conectar(contentComponent),
                drawerPosition: 'left',
                overlayColor:cor["01"],
                drawerBackgroundColor:"transparent",
                gestureEnabled:true,
                transitionConfig: SlideFromRight
            })
        }
    }
    addBottomTabs(_r) {
        const _navigation = this.filterNavigation(_r)
        return {
            name: UDID(),
            screen: createBottomTabNavigator(_navigation)
        }
    }
    addTopTabs(_r) {
        const _navigation = this.filterNavigation(_r)
        return {
            name: UDID(),
            screen: createMaterialTopTabNavigator(_navigation)
        }
    }
    initProject(initProject) {
        if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        GrupoRotas.store = SDCreateStore(initProject)
        return Revestir
    }
}
export const SDNavigation = new _Navigation();