import { StyleSheet, Platform } from "react-native";
import { normalize } from '@sd/uteis/NumberUteis';
import { spaces, cor, size, font } from "@root/app.json";
export default StyleSheet.create({
    warpBase:{
        paddingTop:normalize(spaces["02"]),
        paddingHorizontal:normalize(spaces["03"])
    },
    warpInput:{
        paddingHorizontal:normalize(spaces["01"])
    },
    spacePassword:{
        marginTop:normalize(spaces["02"]),
        marginBottom:normalize(spaces["03"])
    },
    textoSenha:{
        textAlign:"right",
        marginRight:normalize(spaces["01"]),
        fontFamily: font[Platform.OS],
        fontSize:normalize(size["02"])
    },
    textCadastro:{
        color:cor["08"],
        textDecorationLine:"underline"
    },
    btnLoginSocial:{
        marginVertical:normalize(spaces["01"])
    }
})