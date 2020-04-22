import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces, cor } from "@root/app.json";
import { stylDefault } from "@src/stylDefault";
export default StyleSheet.create({
    strong:{
        fontWeight:"bold",
        color:cor["08"]
    },
    normal:{},
    base:{
        ...stylDefault.p,
        marginVertical: normalize(spaces["02"]),
        textAlign: "center"
    }
})