// locations={[0, locations, locations, 1]}
import React, { PureComponent, Fragment } from "react"
import { TouchableHighlight, Text, View, TouchableOpacity } from "react-native"
import { getItemByKeys } from "../../uteis/ArrayUteis"
import NativeLinearGradient from "react-native-linear-gradient";
import styl from "./styl"
import { cor } from "@root/app.json";
import { normalize } from "../../uteis/NumberUteis";

/*
estudar navegação assim:
<Link to="/page-2/">Go to page 2</Link>
*/
/*
Caso de uso:
<Button
    text={{
        value: "Sem counter esc",
        color:"07"
    }}
    onPress={() => {}}
    onPressAwait={actionUnlook => actionUnlook()}
    leftIcon={{
        value: "",
        color:"07"
    }}
    rightIcon={{
        value: "",
        color:"07"
    }}
    textCounter={{
        value: 120,
        color:"07"
    }}
    bg="03"
/>
*/
let clickUnlook = true;
export default class Button extends PureComponent {
    static defaultProps = {
        styleName: "padrao"
    };
    _action = this._renderHighlight
    _styleName;
    _highlightOver = cor["01"]
    constructor(props) {
        super(props)
        const { bg, styleName } = props
        this._styleName = styleName;
        if (bg === undefined) this._action = this._renderOpacity
        else this._action = this._renderHighlight
    }
    get _text() {
        const { value, color, style } = getItemByKeys(this.props, "text", {})
        const stylGroup = styl[this._styleName];
        const {text} = stylGroup
        let spaceIcon = {}
        if (this._styleName !== "vertical") {
            if (this.props["leftIcon"]) {
                spaceIcon = stylGroup.leftIcon;
            } else if (this.props["rightIcon"]) {
                spaceIcon = stylGroup.rightIcon;
            }
        }
        return value ? <Text style={[text, spaceIcon, { color: cor[color] }, style]}>{value}</Text> : <Fragment />
    }
    get _textCounter() {
        const { value, color, bg } = getItemByKeys(this.props, "textCounter", {})
        const { warpCounter, textCounter } = styl[this._styleName];
        return value ? <View style={[warpCounter, { backgroundColor: cor[bg || "12"] }]}><Text style={[textCounter, { color: cor[color] }]}>{value}</Text></View> : <Fragment />
    }
    _icon(_action) {
        const { value, color, style } = this.props[_action] || {}
        const { warpIcon, textIcon } = styl[this._styleName];
        const warpPos = this.props.text && (this._styleName === "padrao") ? {
            position: "absolute",
            top: 0,
            [_action === "leftIcon" ? "left" : "right"]: normalize(10)
        } : {}
        return value && <View style={[warpIcon, warpPos]}>
            <Text style={[textIcon, { color: cor[color || "01"] }, style]}>{value}</Text>
        </View>
    }
    _awaitTimer = undefined;
    onPress = () => {
        if (this._awaitTimer !== undefined) clearTimeout(this._awaitTimer);
        this._awaitTimer = setTimeout(() => (clickUnlook = true), 2000);
        const { onPress, onPressAwait } = this.props
        if (clickUnlook) {
            if (onPress) onPress()
            else if (onPressAwait) {
                clickUnlook = false
                onPressAwait(() => (clickUnlook = true))
            }
        }
    }
    _renderWarp = (_href) => {
        const { bg, style, gradientLocations } = this.props
        const _cor = cor[bg];
        const { warp } = styl[this._styleName];
        if (typeof _cor === "string") return <View style={[warp, { backgroundColor: _cor }, style]}>
            {_href}
        </View>
        let _props = {}
        if (gradientLocations) _props.locations = gradientLocations;
        return <NativeLinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={_cor}
            style={[warp, style]}
            {..._props}
        >
            {_href}
        </NativeLinearGradient>

    }
    _renderHighlight = () => {
        const { disable } = this.props
        const { btn } = styl[this._styleName];
        return this._renderWarp(<TouchableHighlight activeOpacity={disable ? .5 : 1} onPress={this.onPress} underlayColor={this._highlightOver} style={btn}>
            <Fragment>
                {this._icon("leftIcon")}
                {this._text}
                {this._icon("rightIcon")}
                {this._textCounter}
            </Fragment>
        </TouchableHighlight>)
    }
    _renderOpacity = () => {
        const { style } = this.props
        const { btn, warp } = styl[this._styleName];
        return <View style={[warp, style]}>
            <TouchableOpacity activeOpacity={.5} onPress={this.onPress} style={btn}>
                {this._icon("leftIcon")}
                {this._text}
                {this._icon("rightIcon")}
                {this._textCounter}
            </TouchableOpacity>
        </View>
    }
    render() {
        return this._action && this._action()
    }
}