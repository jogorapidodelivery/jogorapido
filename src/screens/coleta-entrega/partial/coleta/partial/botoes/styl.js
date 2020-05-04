import { StyleSheet, Platform } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { font, hButton, cor, spaces, radius, size } from "@root/app.json";
export default StyleSheet.create({
  warp:{
    flexDirection:"row",
    justifyContent:"flex-end",
    marginHorizontal:normalize(spaces["02"]),
    marginTop:normalize(spaces["01"])
  },
  btnWarp:{
    flexDirection:"row",
    alignItems:"center",
    borderWidth:1,
    borderRadius:normalize(radius["02"]),
    marginLeft:normalize(spaces["02"]),
    borderColor:cor["06"]
  },
  icone:{
    fontFamily:"icomoon",
    fontSize:normalize(size["08"])
  },
  p: {
    fontFamily: font[Platform.OS],
    fontSize: normalize(size["03"]),
    color: cor["20"],
    fontWeight:"bold",
    marginRight:normalize(spaces["02"])
},
});