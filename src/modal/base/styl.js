import { Platform, StyleSheet } from "react-native";
import { size, font, cor, radius, spaces, hButton } from "@root/app.json";
import { normalize } from "@sd/uteis/NumberUteis";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:cor["02"]
    },
    group: {
        flex: 1,
        justifyContent:"center"
    },
    setaClose:{
        fontFamily: "icomoon",
        color:cor["06"],
        textAlign:"center",
        marginTop:normalize(20),
        fontSize: normalize(size["08"])
    },
    warp:{
        backgroundColor:cor["07"],
        borderRadius:radius["02"],
        margin:spaces["02"]
    },
    header:{
        borderBottomColor:cor["06"],
        borderBottomWidth:.8,
        flexDirection:"row",
        alignItems:"center"
    },
    btnClose:{
        width:normalize(hButton["02"])
    },
    title:{
        fontFamily:font[Platform.OS],
        fontSize: normalize(size["05"]),
        color:cor["09"],
        fontWeight:"bold",
        flex:1,
        marginLeft:spaces["02"]
    },
    warpConteudo:{
        margin: spaces["02"]
    }
})