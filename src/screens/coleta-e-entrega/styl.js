import { StyleSheet } from "react-native";
import { hButton, cor, spaces, radius, size } from "@root/app.json";
import { normalize } from "@sd/uteis/NumberUteis";
import { stylDefault } from "@src/stylDefault";

export default StyleSheet.create({
    container:{
        backgroundColor:cor["06"],
        paddingVertical:normalize(spaces["03"])
    },
    warpTab:{
        height:normalize(hButton["02"] * 1.1),
    },
    shadow:{
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation:1,
    },
    textTab:{
        textTransform: "uppercase",
        ...stylDefault.p,
        fontWeight: "bold",
        color:cor["07"]
    },
    textDist:{
        textTransform: "uppercase",
        ...stylDefault.span,
        color:cor["07"]
    },
    btnTab:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
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