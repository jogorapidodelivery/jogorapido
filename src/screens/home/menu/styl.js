import { StyleSheet } from "react-native";
import { cor, spaces, radius } from "@root/app.json";
import { normalize } from "@sd/uteis/NumberUteis";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");
export default StyleSheet.create({
    container:{
        flex:1,
        marginTop:25
    },
    flatList:{
        borderTopEndRadius: normalize(radius["02"])
    },
    version:{
        textAlign:"center",
        backgroundColor:cor["07"],
        paddingBottom:normalize(spaces["03"])
    }
})