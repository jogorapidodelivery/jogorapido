import React, { PureComponent } from "react";
import { Text } from "react-native";
import { stylDefault } from "@src/stylDefault";
import styl from "./styl";
export default class Ul extends PureComponent {
    render() {
        const { titulo, lis} = this.props;
        const t = lis.length - 1
        return <Text style={[stylDefault.p, styl.container]}>
            <Text style={stylDefault.bold}>{titulo}{"\n"}</Text>
            {lis.map((_v, _k) => {
                console.log("-->", _v);
                return <Text key={`li-${_k}`}><Text style={styl.counter}>{_k + 1}) </Text>{_v}{_k !== t ? "\n" : ""}</Text>
            })}
        </Text>
    }
}