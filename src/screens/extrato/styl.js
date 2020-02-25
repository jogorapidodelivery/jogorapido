import { StyleSheet } from "react-native";
import { normalize } from "@sd/uteis/NumberUteis";
import { spaces } from "@root/app.json";

export default StyleSheet.create({
    container: {
        paddingTop: normalize(spaces["02"])
    }
})