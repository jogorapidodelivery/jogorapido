import { StyleSheet, Platform } from "react-native"
import { normalize } from "../../uteis/NumberUteis";
import { spaces, cor, font, hButton, radius, size } from "@root/app.json";
const bigWh = normalize(hButton["02"])
const smallWh = normalize(hButton["01"])
export default {
    padrao: StyleSheet.create({
        btn: {
            flex:1,
            position:"relative",
            justifyContent:"space-between",
            flexDirection:"row",
            borderRadius:normalize(radius["03"]),
        },
        warp:{
            height: bigWh,
            borderRadius:normalize(radius["03"]),
        },
        text:{
            fontSize:normalize(size["04"]),
            fontFamily: font[Platform.OS],
            fontWeight:"bold",
            flex:1,
            textAlign:"center",
            alignSelf:"center"
        },
        warpIcon:{
            width: bigWh,
            height: bigWh,
            justifyContent:"center",
            alignItems:"center"
        },
        textIcon:{
            fontFamily:"icomoon",
            fontSize:normalize(size["08"])
        },
        warpCounter:{
            justifyContent:"center",
            alignItems:"center",
            borderRadius: normalize(size["06"] / 2),
            width: normalize(size["06"]),
            height: normalize(size["06"])
        },
        textCounter:{
            fontSize:normalize(size["01"])
        },
        leftIcon:{},
        rightIcon:{}
    }),
    vertical: StyleSheet.create({
        btn:{
            alignItems:"center"
        },
        warpIcon:{
            width:bigWh,
            height:bigWh,
            justifyContent:"center",
            alignItems:"center",
            marginBottom:normalize(spaces["01"]),
            borderRadius:Math.abs(bigWh/2),
            backgroundColor:cor["06"]
        },
        textIcon: {
            fontFamily: "icomoon",
            fontSize: normalize(size["08"] * 1.2)
        },
        text: {
            paddingHorizontal: bigWh,
            fontSize: normalize(size["03"]),
            fontFamily: font[Platform.OS],
            textAlign: "center",
            lineHeight: normalize(size["03"] + 2)
        },
        leftIcon: {},
        rightIcon: {}
    }),
    pequeno: StyleSheet.create({
        btn:{
            height: smallWh,
            flexDirection:"row",
            justifyContent:"center",
            alignItems:"center",
            borderRadius:normalize(radius["02"])
        },
        warp:{
            borderRadius:normalize(radius["02"])
        },
        warpIcon: {
            width: smallWh,
            height: smallWh,
            justifyContent: "center",
            alignItems: "center"
        },
        textIcon: {
            fontFamily: "icomoon",
            fontSize: normalize(size["07"])
        },
        text: {
            fontSize: normalize(size["02"]),
            fontFamily: font[Platform.OS],
            fontWeight:"bold"
        },
        leftIcon: {
            marginRight: normalize(spaces["02"])
        },
        rightIcon: {
            marginLeft: normalize(spaces["02"])
        },
    })
}