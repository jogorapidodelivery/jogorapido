import { StyleSheet, Platform } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { font, cor, size } from "@root/app.json";
export default StyleSheet.create({
    header:{
        justifyContent:"center",
        alignItems:"center"
    },
    slogan:{
        fontFamily: font[Platform.OS],
        color:cor["07"],
        fontSize:normalize(size["04"])
    },
    posDrawer:{
        position:"absolute",
        top:0,
        right:0,
        zIndex:3
    },
    logo:{
        width:normalize(168),
        height:normalize(86)
    }
})