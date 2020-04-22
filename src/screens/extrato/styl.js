import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, cor } from "@root/app.json";
import { stylDefault } from "@src/stylDefault";

export default StyleSheet.create({
    container: {
        paddingTop: normalize(spaces["02"])
    },
    warpEmpty:{
        height:normalize(200),
        justifyContent:"center",
        alignItems: "center"
    },
    textEmpty:{
        ...stylDefault.span,
        textAlign:"center",
        color:cor["08"]
    }
})