import React, { PureComponent } from "react";
import {Text} from "react-native";
import styl from "./styl";
import { empty } from "@sd/uteis/StringUteis";
export default class Info extends PureComponent {
    render() {
        const {data} = this.props;
        if(empty(data)) return null;
        return <Text style={styl.base}>
            {data.map((_v, _k) => <Text key={`p-${_k}`} style={styl[_k % 2 === 1 ? "strong" : "normal"]}>{_v}</Text>)}
        </Text>
    }
}