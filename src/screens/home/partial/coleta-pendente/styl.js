import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { hButton, radius, spaces, cor, font } from "@root/app.json";
export default StyleSheet.create({
    container:{
    },
    warp:{
        position:"relative"
    },
    iconAte:{
        color:cor["05"],
        position:"absolute",
        left:-normalize(spaces["01"]),
        top: normalize(hButton["02"] - spaces["02"])
    },
    containerInputFake:{
        marginLeft:-normalize(spaces["01"]),
        flexDirection:"row",
        height: normalize(hButton["02"]),
    },
    containerInputFakeFirst:{
        marginBottom:normalize(spaces["02"])
    },
    warpInputFake:{
        flex:1,
        paddingLeft:normalize(spaces["02"]),
        justifyContent:"center",
        borderRadius:normalize(radius["01"]),
        borderColor:cor["06"],
        borderWidth:1
    },
    distancia:{
        marginTop:normalize(10),
        marginBottom:normalize(spaces["03"]),
        marginLeft: normalize(hButton["02"] - 5),
        color:cor["20"]
    },
    bold:{
        fontWeight:"bold"
    }
})