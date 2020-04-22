import React, { PureComponent } from "react";
import { View } from "react-native";
import Button from "@sd/components/button";
import styl from "./styl";
export default class BtnCodigoEmailAjuda extends PureComponent {
    render() {
        return <View style={styl.warpActions}>
            <Button
                text={{
                    value: `Reenviar\ncódigo`,
                    color: "05"
                }}
                leftIcon={{
                    value: "",
                    color: "10"
                }}
                styleName="vertical"
            />
            <Button
                text={{
                    value: `Alterar\nemail`,
                    color: "05"
                }}
                leftIcon={{
                    value: "",
                    color: "08"
                }}
                styleName="vertical"
            />
            <Button
                text={{
                    value: `Preciso de\najuda`,
                    color: "05"
                }}
                leftIcon={{
                    value: "",
                    color: "12"
                }}
                styleName="vertical"
            />
        </View>
    }
}