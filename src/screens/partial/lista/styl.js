import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces, cor } from "@root/app.json";
export default StyleSheet.create({
    container:{
        paddingHorizontal:normalize(spaces["01"]),
        paddingVertical:normalize(spaces["02"])
    },
    counter:{
        color:cor["12"],
        fontWeight:"bold"
    }
})