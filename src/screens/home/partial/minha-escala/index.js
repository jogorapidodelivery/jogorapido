import React, { PureComponent, Fragment } from "react";
import { FlatList} from "react-native";
import Button from "@sd/components/button";
import { stylDefault } from "@src/stylDefault";
import { View as AnimatableView, Text as AnimatableText } from "react-native-animatable";
import styl from "./styl";
import { empty } from "@sd/uteis/StringUteis";
import MinhaEscalaItem from "@screens/disponibilidade/partial/index";
import { buscarDisponibilidade } from "@actions/disponibilidade";
export default class MinhaEscala extends PureComponent {
    _renderScale = ({ item: { icone, cor, data, disponibilidade, horario }, index}) => {
        return <MinhaEscalaItem
            {...{ index, icone, cor, data, disponibilidade, horario, delay: 1000 + (200 * index), actived: !empty(data)}}
        />
    }
    _extract = ({ data, horario}, index) => {
        if (data !== undefined) return `${data}-${index}`;
        return `${horario}-${index}`;
    }
    _submit = () => {
        const { disponibilidade, usuario_id, navigation:{push}} = this.props;
        buscarDisponibilidade({
            body_view:{
                disponibilidade
            },
            body_rsa:{
                usuario_id
            }
        }).then(() => {
            push("disponibilidade");
        }).catch(({mensagem}) => {
            push("alerta", {
                params: {
                    titulo: "Jogo Rápido",
                    mensagem
                }
            })
        })
    }
    render() {
        const { disponibilidade } = this.props;
        return <Fragment>
            <AnimatableText animation="fadeInUp" useNativeDriver={true} delay={800} style={[stylDefault.h1, styl.minhaEscala]}>Minha escala para hoje</AnimatableText>
            <FlatList
                showsVerticalScrollIndicator={false}
                extraData={disponibilidade}
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
        </Fragment>
    }
}