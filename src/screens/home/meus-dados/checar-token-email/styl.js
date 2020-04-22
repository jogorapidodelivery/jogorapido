import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces, cor } from "@root/app.json";
export default StyleSheet.create({
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
    }
})