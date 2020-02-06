import { StyleSheet } from "react-native";
import { cor, spaces, radius, size } from "@root/app.json";
import { normalize } from "@sd/uteis/NumberUteis";

export default StyleSheet.create({
    container:{
        backgroundColor:cor["06"]
    },
    h2:{
        fontSize:normalize(size["01"]),
        textAlign:"center",
        marginBottom: normalize(spaces["02"])
    },
    btnAjuda: {
        marginTop: normalize(spaces["02"]),
        marginBottom: normalize(spaces["03"]),
        borderRadius: normalize(radius["03"]),
        alignSelf: "center"
    }
})