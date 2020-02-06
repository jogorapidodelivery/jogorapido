import { Platform, StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces, cor, font, radius, size, hButton } from "@root/app.json";
export default StyleSheet.create({
    base:{
        paddingTop: normalize(spaces["02"])
    },
    input: {
        marginBottom: normalize(spaces["01"])
    },
    button: {
        marginTop: normalize(spaces["02"])
    },
    warpInputs:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    warpEye:{
        backgroundColor:cor["06"],
        padding:normalize(spaces["01"]),
        marginBottom:normalize(spaces["02"]),
        marginHorizontal: -normalize(spaces["02"])
    },
    text:{
        textAlign:"center"
    },///Abaixo analisar
    warpCode:{
        position:"relative",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal:normalize(spaces["02"]),
        height: normalize(hButton["02"])
    },
    spacerBox: {
        width: normalize(hButton["02"]),
        height: normalize(hButton["02"]),
        borderRadius: normalize(radius["02"]),
        backgroundColor: cor["06"],
    },
    code:{
        position:"absolute",
        flex:1,
        left:0,
        right:0,
        ...Platform.select({
            ios:{
                lineHeight: normalize(size["08"] * 1.35),
                letterSpacing: normalize(hButton["02"]),
                paddingLeft: normalize(hButton["01"] * .8)
            },
            android: {
                left:4,
                letterSpacing: normalize(hButton["02"] * 1.02),
                lineHeight: normalize(size["08"] * 1.05)
            }
        }),
        fontFamily: font[Platform.OS],
        fontSize: normalize(size["08"])
    }
})