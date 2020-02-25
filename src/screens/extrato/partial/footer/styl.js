import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { hButton, spaces } from "@root/app.json";

export default StyleSheet.create({
    btn:{
        marginTop:normalize(spaces["02"]),
        marginLeft:normalize(hButton["01"])
    }
})