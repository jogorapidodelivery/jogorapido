import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces } from "@root/app.json";
export default StyleSheet.create({
    text:{
        paddingTop:normalize(spaces["01"]),
        paddingBottom:normalize(spaces["02"])
    }
})