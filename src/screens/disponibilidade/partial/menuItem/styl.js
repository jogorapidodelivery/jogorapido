import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { cor } from "@root/app.json";
export default StyleSheet.create({
    container:{
        flexGrow:1
    },
    warp:{
        width:normalize(42),
        height:normalize(42),
        borderRadius:normalize(21),
        justifyContent:"center",
        alignItems:"center"
    },
    warpMarcacao:{
        flexDirection:"row",
    },
    sigla:{
        marginTop:0,
        marginBottom:0
    },
    marcacao:{
        width: normalize(4),
        height: normalize(4),
        borderRadius:normalize(2),
        margin:normalize(1)
    }
});