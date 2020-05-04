import { StyleSheet, Platform } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { font, cor, spaces, radius, size } from "@root/app.json";
export default StyleSheet.create({
    item: {
      backgroundColor: cor["28"]
    },
    border:{
        marginHorizontal:normalize(spaces["02"]),
        padding:normalize(spaces["01"]),
        backgroundColor:cor["07"],
        borderRadius:normalize(radius["02"]),
        borderColor:cor["06"],
        borderWidth:1
    },
    tituloSpace:{
        marginLeft:normalize(spaces["02"]),
        marginTop:normalize(spaces["02"]),
        marginBottom:normalize(spaces["01"])
    },
    titulo: {
        fontFamily: font[Platform.OS],
        fontSize: normalize(size["03"]),
        color: cor["20"],
        fontWeight:"bold",
    },
    distancia:{
        fontWeight:"normal",
        color:cor["08"]
    },
    coleta:{
        color:cor["08"]
    },
    regular:{
        fontWeight:"normal",
    }
  });