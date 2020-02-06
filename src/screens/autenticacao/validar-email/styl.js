import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces } from "@root/app.json";
export default StyleSheet.create({
    input:{
        marginBottom: normalize(spaces["01"])
    },
    button:{
        marginTop: normalize(spaces["02"])
    }
})