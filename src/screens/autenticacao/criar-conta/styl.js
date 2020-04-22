import { StyleSheet } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces } from "@root/app.json";
export default StyleSheet.create({
    conteudo:{
        flex:1,
        borderTopEndRadius:10,
        borderTopLeftRadius:10,
        backgroundColor:"#fff"
    },
    warpBase: {
        paddingTop: normalize(spaces["02"]),
        paddingHorizontal: normalize(spaces["03"])
    },
    warpInput: {
        paddingHorizontal: normalize(spaces["01"]),
        marginTop:normalize(spaces["01"])
    },
    text: {
        paddingHorizontal: normalize(spaces["01"])
    },
    button:{
        marginTop: normalize(spaces["03"]),
        marginBottom: normalize(spaces["01"])
    }
})