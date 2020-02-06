import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, hButton, cor } from "@root/app.json";

export default StyleSheet.create({
    item: {
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:cor["07"],
        paddingVertical:normalize(spaces["01"])
    },
    icon:{
        color:cor["08"],
    }
})