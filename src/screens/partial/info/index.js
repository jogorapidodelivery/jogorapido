import React, { PureComponent } from "react";
import {Text} from "react-native";
import styl from "./styl";
import { stylDefault } from "@src/stylDefault";
export default class Info extends PureComponent {
    render() {
        return <Text style={styl.base}>
            {this.props.data.map((_v, _k) => <Text key={`p-${_k}`} style={styl[_k % 2 === 1 ? "strong" : "normal"]}>{_v}</Text>)}
        </Text>
    }
}