import { Platform, StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { font, hButton, spaces, cor, size } from "@root/app.json";
export default StyleSheet.create({
    container:{
        flexGrow:1
    },
    gradiente:{
        flex:1
    },
    warpContent:{
        flex:1
    },
    setaClose: {
        fontFamily: "icomoon",
        color: cor["06"],
        textAlign: "center",
        fontSize: normalize(size["08"])
    },
    awareScrollView:{
        flex:1,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
    },
    warp: {
        flex: 1,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: cor["07"],
        paddingHorizontal: normalize(spaces["02"]),
    },
    warpHeaderAnn:{
        position:"absolute",
        width:"100%",
        top:0,
        borderRadius:1,
        left:0
    },
    header:{
        height:normalize(hButton["02"]),
        alignItems:"center",
        flexDirection:"row"
    },
    titulo:{
        color:cor["07"],
        fontFamily: font[Platform.OS],
        fontSize:normalize(size["04"])
    },
    bold:{
        fontWeight:"bold"
    }
})