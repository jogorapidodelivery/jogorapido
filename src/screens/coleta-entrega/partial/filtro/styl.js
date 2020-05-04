import { StyleSheet, Platform } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { radius, spaces, cor, size, font } from "@root/app.json";
export default StyleSheet.create({
    container:{
        backgroundColor:cor["28"],
        borderTopRightRadius:normalize(radius["02"]),
        borderTopLeftRadius:normalize(radius["02"])
    },
    warp:{
        flexDirection:"row",
        justifyContent:"space-between",
        backgroundColor:cor["07"],
        borderWidth:1,
        borderColor:cor["26"],
        marginHorizontal:normalize(spaces["02"]),
        marginTop:normalize(spaces["02"]),
        borderRadius:normalize(radius["02"]),
        backgroundColor:cor["26"]
    },
    estabelecimento:{
        minWidth:120  
    },
    titulo:{
        color:cor["08"],
        textAlign:"center",
        fontFamily: font[Platform.OS],
        fontSize:normalize(size["04"]),
        fontWeight:"bold",
    },
    btn:{
        justifyContent:"center",
        borderRadius:normalize(radius["02"]),
        padding:normalize(spaces["01"])
    },
    btnActived:{
        backgroundColor:cor["07"]
    },
    btnDeactived:{
    },
    txtActived:{
    },
    txtDeactived:{
        color:cor["05"],
        fontWeight:"normal",
    }
  });