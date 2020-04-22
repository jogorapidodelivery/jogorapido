import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { radius, spaces, hButton, cor } from "@root/app.json";

export default StyleSheet.create({
    container:{},
    btn:{
        position:"relative"
    },
    warpItem:{
        flex:1,
        marginLeft:normalize(hButton["01"]),
        borderWidth:1,
        borderRadius:normalize(radius["02"]),
        borderColor:cor["06"],
        padding: normalize(spaces["01"]),
        backgroundColor: cor["07"]
    },
    strong: {
        fontWeight:"bold"
    },
    icon:{
        position:"absolute",
        left:-normalize(spaces["01"]),
        top:0
    },
    captalize:{
        textTransform: "capitalize"
    },
    p:{
        marginLeft:normalize(hButton["01"]),
        marginTop:normalize(spaces["02"])
    },
    warpTempo:{
        borderTopColor:cor["06"],
        borderTopWidth:1,
        marginTop: normalize(spaces["01"]),
        paddingTop:normalize(spaces["01"]),
        flexDirection:"row",
        justifyContent:"space-between"
    },
    chegada:{
        color:cor["08"]
    },
    espera:{
        color:cor["09"]
    },
    btnRota:{
        marginRight: normalize(spaces["01"]),
        top: -normalize(spaces["02"]),
        marginBottom:-normalize(spaces["02"]),
        alignSelf:"flex-end"
    }
})