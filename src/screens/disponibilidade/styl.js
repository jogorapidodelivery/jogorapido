import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { hButton, radius, spaces, size, cor } from "@root/app.json";

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
        textAlign:"center"
    },
    info:{
        marginVertical:normalize(spaces["01"]),
        textAlign:"center"
    },
    warpLegenda:{
        marginVertical:normalize(spaces["02"]),
        height:normalize(size["02"] * 3)
    },
    loader:{
        flexBasis: 0,
        flexGrow: 1,
        height:normalize(65),
        borderRadius: normalize(radius["01"]),
        margin: normalize(spaces["01"] / 2)
    },
    warpBtn:{
        borderRadius: normalize(radius["01"]),
        height:normalize(hButton["02"])
    }
})