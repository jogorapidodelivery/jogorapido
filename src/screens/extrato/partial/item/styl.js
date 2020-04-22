import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, hButton, cor, size } from "@root/app.json";

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
    },
    loader:{
        height:normalize(25),
        width:normalize(80),
        borderRadius:5
    }
})