import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, hButton, cor } from "@root/app.json";

export default StyleSheet.create({
    container: {},
    btnRota: {
        marginTop:normalize(spaces["01"]),
        // marginRight: normalize(spaces["01"]),
        // top: -normalize(spaces["02"]),
        // marginBottom: -normalize(spaces["02"]),
        flexDirection:"row",
        justifyContent:"flex-end"
    },
    spacer:{
        marginHorizontal: normalize(spaces["01"])
    }
})