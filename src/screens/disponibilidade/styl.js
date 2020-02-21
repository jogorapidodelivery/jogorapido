import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, cor } from "@root/app.json";

export default StyleSheet.create({
    container:{
        paddingTop:normalize(spaces["02"])
    },
    p:{
        textAlign:"center"
    },
    span:{
        textAlign:"center",
        color:cor["13"],
        marginBottom:normalize(spaces["02"])
    },
    dia:{
        textAlign:"center",
        marginVertical:normalize(spaces["01"])
    },
    info:{
        marginVertical:normalize(spaces["02"]),
        textAlign:"center"
    }
})