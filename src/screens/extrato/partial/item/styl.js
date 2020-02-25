import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, hButton, cor } from "@root/app.json";

export default StyleSheet.create({
    warp:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        marginLeft:normalize(hButton["01"]),
        marginVertical:normalize(spaces["01"])
    },
    preco:{
        color:cor["08"]
    }
})