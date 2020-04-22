import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces, size, cor, hButton } from "@root/app.json";
import { stylDefault } from "@src/stylDefault";

export default StyleSheet.create({
    warpBtn:{
        paddingHorizontal:normalize(spaces["02"])
    },
    warpLine:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    warpList:{
        marginLeft:normalize(hButton["01"]),
        marginTop:normalize(spaces["02"]),
        marginBottom:normalize(spaces["01"])
    },
    icon:{
        color:cor["08"]
    },
    titulo:{
        fontSize: normalize(size["04"]),
        flex:1
    },
    warpMoney:{
        flexDirection:"row",
        alignItems: "center"
    },
    lineVertical:{
        height:normalize(40),
        width:1,
        marginLeft:normalize(spaces["02"] + 3),
        marginRight:normalize(spaces["02"]),
        backgroundColor:cor["06"]
    },
    preco:{
        color:cor["08"],
        fontSize:normalize(size["06"])
    },
    warpHeaderList:{
        marginLeft: normalize(hButton["01"]),
        paddingVertical:normalize(spaces["01"]),
        borderTopColor:cor["06"],
        borderBottomColor:cor["06"],
        borderTopWidth:1,
        borderBottomWidth:1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerTitle:{
        ...stylDefault.span,
        fontWeight:"bold",
        color:cor["20"]
    }
})