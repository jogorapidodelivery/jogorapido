import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import DatePicker from "react-native-date-picker";
import moment from "moment"
const defCustomInput = {
    min: moment().subtract(70, "years").format("YYYY-MM-DD"),
    max: moment().subtract(10, "years").format("YYYY-MM-DD"),
    receiverDateFormat: "YYYY-MM-DD",
    renderDateFormat: "DD/MM/YYYY"
}
export default class InputDate extends PureComponent{
    _data = {}
    _dateChange = (valueModal) => {
        const { onChante} = this.props
        this._data.value = valueModal
        const value = moment(valueModal).format(this._data.renderDateFormat)
        onChante && onChante(value)
    }
    
    _emptyAction = () => {/* */}
    componentWillMount() {
        this._data = InputDate.tratarDados(this.props)
    }
    setValue = (value) => {
        const { receiverDateFormat } = { ...defCustomInput, ...this.props.customInput }
        const _nv = moment(value, receiverDateFormat).toDate()
        this._data.value.toDateString() !== _nv.toDateString() && this._dateChange(_nv)
    }
    static tratarDados = (props) => {
        const { minDate, maxDate, receiverDateFormat, renderDateFormat } = { ...defCustomInput, ...props.customInput }
        const { value } = props
        return {
            max: moment(maxDate, receiverDateFormat).toDate(),
            min: moment(minDate, receiverDateFormat).toDate(),
            value: moment(value, receiverDateFormat).toDate(),
            renderDateFormat,
            receiverDateFormat,
            valueRender: moment(value, receiverDateFormat).format(renderDateFormat)
        }   
    }
    
    render() {
        const { onCloseModal, showModal} = this.props
        const {min, max, value} = this._data
        return <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
        >
            <View style={{ flex: 1 }}>
                <TouchableOpacity style={{ flex: 1, justifyContent: "flex-end" }} onPress={onCloseModal || this._emptyAction}>
                    <View style={{ backgroundColor: "#F8F7F6", borderTopColor: "#B2B2B2", borderTopWidth: 1, alignItems: "flex-end" }}>
                        <Text style={{ paddingHorizontal: 20, paddingVertical: 15, fontSize: 16, color: "#007AFF", fontWeight: "bold" }}>Done</Text>
                    </View>
                </TouchableOpacity>
                <View style={{ backgroundColor: "#ffffff" }}>
                    <DatePicker
                        locale="pt"
                        mode="date"
                        maximumDate={max}
                        minimumDate={min}
                        date={value}
                        style={{ backgroundColor: "#ffffff", alignSelf: "center", borderRadius: 5 }}
                        onDateChange={this._dateChange}
                    />
                </View>
            </View>
        </Modal>
    }
}