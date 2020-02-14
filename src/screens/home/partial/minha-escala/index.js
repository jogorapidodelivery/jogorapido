import React, { PureComponent } from "react";
import { View, Text, FlatList} from "react-native";
import Button from "@sd/components/button";
import { stylDefault } from "@src/stylDefault";
import { View as AnimatableView, Text as AnimatableText } from "react-native-animatable";
import styl from "./styl";
import { empty } from "@sd/uteis/StringUteis";
export default class MinhaEscala extends PureComponent {
    _renderScale = ({ item: { icone, cor, data, disponibilidade, horario }, index}) => {
        return <AnimatableView animation="fadeInUp" useNativeDriver={true} delay={1000 + (200 * index)} style={styl.containerItem}>
            <View style={[styl.containerItemWarp, { opacity: empty(data) ? .2 : 1 }]}>
                <Text style={[stylDefault.icon, { color: cor}]}>{icone}</Text>
                <View>
                    <Text style={[stylDefault.span, styl.titulo]}>{disponibilidade}</Text>
                    <Text style={stylDefault.span}>{horario}</Text>
                </View>
            </View>
        </AnimatableView>
    }
    _extract = (item, index) => {
        if (item.categoria_atividade_id !== undefined) return item.categoria_atividade_id.toString()
        return index.toString()
    }
    render() {
        const { disponibilidade } = this.props;
        return <View>
            <AnimatableText animation="fadeInUp" useNativeDriver={true} delay={800} style={[stylDefault.h1, styl.minhaEscala]}>Minha escala para hoje</AnimatableText>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={disponibilidade}
                numColumns={2}
                keyExtractor={this._extract}
                renderItem={this._renderScale}
            />
            <AnimatableView animation="flipInX" useNativeDriver={true} delay={1800}>
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
            </AnimatableView>
        </View>
    }
}