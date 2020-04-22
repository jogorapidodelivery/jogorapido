import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces } from "@root/app.json";
export default StyleSheet.create({
    base:{
        paddingTop:normalize(spaces["02"])
    },
    input:{
        marginBottom: normalize(spaces["01"])
    },
    button:{
        marginTop: normalize(spaces["02"])
    }
})