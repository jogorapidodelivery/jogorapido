import { StyleSheet, Platform } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { font, hButton, cor, spaces, radius, size } from "@root/app.json";
export default StyleSheet.create({
    warp:{
        flexDirection:"row",
        borderTopColor:cor["06"],
        borderTopWidth:1,
        paddingTop:normalize(spaces["01"]),
        justifyContent:"space-between",
        marginTop:normalize(spaces["01"])
    },
    p: {
        fontFamily: font[Platform.OS],
        fontSize: normalize(size["03"]),
        color: cor["20"],
        fontWeight:"normal"
    },
    bold:{
        fontWeight:"bold"
    },
    hora:{
        color:cor["08"]
    }
});