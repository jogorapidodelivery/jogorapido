import { StyleSheet, Platform } from "react-native";
import { font, size, cor, radius, spaces } from "@root/app.json"
import { stylDefault } from "../../stylDefault";
import { normalize } from "@sd/uteis/NumberUteis";
export default StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        paddingHorizontal:normalize(spaces["02"]),
        backgroundColor:cor["07"]
    },
    bgIos:{
        height: 277,
        width: "100%",
        marginBottom:normalize(spaces["01"])
    },
    button: {
        marginTop: normalize(spaces["02"])
    },
})