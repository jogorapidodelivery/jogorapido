import React, { PureComponent } from "react";
import { View, Text, FlatList} from "react-native";
import Button from "@sd/components/button";
import { stylDefault } from "@src/stylDefault";
import { cor as corJson} from "@root/app.json";
import styl from "./styl";
import { empty } from "@sd/uteis/StringUteis";
export default class MinhaEscala extends PureComponent {
    _renderScale = ({ item: { icone, cor, data, disponibilidade, horario}}) => {
        return <View style={[styl.containerItem, {opacity:empty(data) ? .2 : 1}]}>
            <Text style={[stylDefault.icon, { color: cor}]}>{icone}</Text>
            <View>
                <Text style={[stylDefault.span, styl.titulo]}>{disponibilidade}</Text>
                <Text style={stylDefault.span}>{horario}</Text>
            </View>
        </View>
    }
    _extract = (item, index) => {
        if (item.categoria_atividade_id !== undefined) return item.categoria_atividade_id.toString()
        return index.toString()
    }
    render() {
        const { disponibilidade } = this.props;
        return <View>
            <Text style={[stylDefault.h1, styl.minhaEscala]}>Minha escala para hoje</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={disponibilidade}
                numColumns={2}
                keyExtractor={this._extract}
                renderItem={this._renderScale}
            />
            <Button
                style={styl.btnDisponibilizar}
                text={{
                    value: "Disponibilidade",
                    color: "07"
                }}
                rightIcon={{
                    value: "",
                    color: "07"
                }}
                onPress={this._submit}
                bg="14"
            />
        </View>
    }
}