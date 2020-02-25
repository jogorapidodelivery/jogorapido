import { Platform, StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { font, hButton, spaces, cor, size } from "@root/app.json";
export default StyleSheet.create({
    container:{
        flexGrow:1,
        backgroundColor:cor["07"]
    },
    warpBackground:{
        flex:1
    },
    imageBackground:{
        resizeMode: "cover",
        bottom:null,
        height:normalize(260)
    },
    warpButtomClose:{
        zIndex: 20,
        position: "absolute",
        left: 0,
        right: 0,
        height: normalize(55)
    },
    warpTop:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"center"
    },
    bgTop:{
        position:"absolute",
        zIndex:1,
        top:0,
        left:0,
        right:0,
        height:25,
        backgroundColor:cor["19"]
    },
    warpIconTop:{
        width: normalize(50),
        height: normalize(24),
        borderBottomEndRadius: normalize(24),
        borderBottomLeftRadius: normalize(24),
        marginBottom:normalize(6),
        backgroundColor:cor["19"]
    },
    warpTextTop:{
        fontFamily:"icomoon",
        color:cor["07"],
        textAlign:"center",
        top:-normalize(5),
        fontSize:normalize(40)
    },
    // ***********
    awareScrollView:{
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
    },
    warp: {
        flex: 1,
        zIndex:10,
        borderTopEndRadius: 10,
        borderTopLeftRadius: 10,
        backgroundColor: cor["07"],
        paddingHorizontal: normalize(spaces["02"]),
    },
    warpHeaderAnn:{
        zIndex:1
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