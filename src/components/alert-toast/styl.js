import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces, cor } from "@root/app.json";
export default StyleSheet.create({
    container:{
        paddingTop:25,
        minHeight:25,
        zIndex:9,
        backgroundColor:cor["20"]
    },
    mensagem:{
        color:cor["07"],
        textAlign:"center",
        paddingHorizontal:normalize(spaces["02"]),
        paddingBottom:normalize(spaces["02"]),
        paddingTop:normalize(spaces["01"])
    }
})