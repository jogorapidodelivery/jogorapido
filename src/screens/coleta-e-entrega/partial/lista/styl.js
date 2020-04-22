import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { size, spaces, radius, cor } from "@root/app.json";

export default StyleSheet.create({
    h1:{
        color:cor["03"],
        marginTop: normalize(spaces["01"])
    },
    btn:{
        flexDirection:"row",
        alignItems:"center",
    },
    groupItem:{
        flex:1,
        flexDirection:"row",
        borderTopWidth:1,
        alignItems:"center",
        borderTopColor: cor["06"],
        backgroundColor:cor["07"]
    },
    warpItem:{
        flex:1,
        padding:normalize(spaces["02"])
    },
    radiusTopLeft:{
        borderTopEndRadius:normalize(radius["02"]),
        borderTopLeftRadius:normalize(radius["02"]),
    },
    radiusBottomLeft:{
        borderBottomEndRadius:normalize(radius["02"]),
        borderBottomLeftRadius:normalize(radius["02"]),
    },
    warpUniPreco:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    strong:{
        flex:1,
        fontWeight:"bold"
    },
    nome:{
        textTransform:"capitalize",
        color:cor["08"],
        fontWeight:"bold"
    },
    valor:{
        alignSelf:"flex-end",
        fontWeight:"bold",
        color:cor["09"]
    },
    icon:{
        marginRight: -normalize(spaces["02"]),
        fontSize:normalize(size["08"])
    },
    warpTotal:{
        borderTopColor: cor["06"],
        borderTopWidth:1,
        paddingVertical: normalize(spaces["01"]),
        alignItems:"flex-end",
        marginRight: normalize(spaces["01"])
    }
})