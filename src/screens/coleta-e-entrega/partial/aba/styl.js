import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { cor, hButton, spaces, radius } from "@root/app.json";
import { stylDefault } from "@src/stylDefault";

export default StyleSheet.create({
    container:{
        marginHorizontal:normalize(spaces["01"]),
        position:"relative",
        borderWidth:1,
        borderColor:cor["06"],
        backgroundColor:cor["07"],
        marginBottom:normalize(spaces["01"]),
        borderRadius:normalize(radius["03"]),
        flexDirection: 'row'
    },
    bg:{
        position:"absolute",
        top:-2,
        width:"50%",
        backgroundColor:cor["08"],
        borderRadius:normalize(radius["03"]),
        height: normalize(hButton["01"] + 4),
    },
    btn:{
        height:normalize(hButton["01"]),
        justifyContent:"center",
        alignItems:"center",
        flex:1
    },
    warpBtn:{
        flex: 1
    },
    textBtn:{
        ...stylDefault.p,
        fontWeight:"bold"
    }
})