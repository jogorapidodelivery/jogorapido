import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces, cor, radius } from "@root/app.json";
export default StyleSheet.create({
    minhaEscala:{
        color:cor["20"]
    },
    btnDisponibilizar:{
        opacity:.2,
        marginTop:normalize(spaces["01"]),
        marginBottom:normalize(spaces["01"])
    },
    containerItem:{
        flexBasis: 0,
        flexGrow: 1,
        margin: normalize(spaces["01"] / 2),
    },
    containerItemWarp:{
        flexDirection:"row",
        alignItems: "center",
        backgroundColor: cor["06"],
        borderRadius:normalize(radius["01"]),
        padding: normalize(spaces["01"])
    },
    titulo:{
        fontWeight:"bold",
        color:cor["08"]
    }
})