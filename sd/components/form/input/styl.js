import { StyleSheet, Platform } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { cor, font, hButton, radius, size } from "@root/app.json";
const bigWh = normalize(hButton["02"])
export default {
    padrao: StyleSheet.create({
        stylContainer: {
            height:bigWh,
        },
        stylWarpInput:{
            flex:1,
            position:"relative"
        },
        stylTextInput: {
            paddingTop: normalize(20),
            fontFamily: font[Platform.OS],
            fontSize: normalize(size["03"])
        },
        stylLavel:{
            position:"absolute",
            left: Platform.OS === "android" ? 3 : 0,
            top:normalize(5),
            fontFamily: font[Platform.OS],
            fontSize: normalize(size["01"]),
        },
        stylWarpConteiner:{
            flexDirection:"row",
            alignItems:"center",
            flex:1
        },
        stylWarpWarning:{
            marginBottom:Platform.OS === "android" ? 8 : 0,
            height: normalize(size["08"]),
            width:normalize(10),
            marginLeft: -normalize(10),
            justifyContent:"flex-end"
        },
        stylBlobWarning:{
            width:normalize(6),
            height:normalize(6),
            marginBottom:normalize(8),
            borderRadius:normalize(3)
        },
        stylWarpIcon: {
            width: bigWh,
            height: bigWh,
            justifyContent: "center",
            alignItems: "flex-end"
        },
        stylTextIcon: {
            fontFamily: "icomoon",
            fontSize: normalize(size["07"])
        },
        stylInderline:{
            height:1
        }
    }),
    code:{
        stylContainer: {
            height: bigWh,
            width: bigWh,
            borderRadius: normalize(radius["02"]),
            backgroundColor:cor["06"],
            marginHorizontal:10
        },
        stylWarpInput: {
            flex: 1
        },
        stylWarpConteiner: {
            flexDirection: "row",
            alignItems: "center",
            flex: 1
        },
        stylTextInput: {
            textAlign:"center",
            flex:1,
            ...Platform.select({
                android:{
                    lineHeight: normalize(size["08"]),
                    height:normalize(size["08"]),
                    marginBottom:-normalize(10)
                }
            }),
            fontFamily: font[Platform.OS],
            fontSize: normalize(size["08"])
        },
    }
}