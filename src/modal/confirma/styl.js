import { StyleSheet, Platform } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, cor, size, font } from "@root/app.json";

export default StyleSheet.create({
    warpBtns:{
        alignItems:"flex-end",
        marginTop:normalize(spaces["02"])
    },
    text: {
        fontFamily: font[Platform.OS],
        fontSize: normalize(size["03"]),
        color: cor["20"]
    },
    strong: {
        fontFamily: font[Platform.OS],
        fontSize: normalize(size["03"]),
        color: cor["08"],
        fontWeight: "bold"
    },
    b: {
        fontFamily: font[Platform.OS],
        fontSize: normalize(size["03"]),
        color: cor["08"],
        fontWeight: "bold"
    }
})