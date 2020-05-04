import OpenMap from "react-native-open-map";
import { Linking } from "react-native";
export const _addressOpenMapsDefaultProps = {
    title: "JogoRápido",
    cancelText: "Cancelar",
    actionSheetTitle: "Escolha o App",
    actionSheetMessage: "Apps disponíveis"
}
export const actionOpenMap = ({latitude, longitude}) => {
    OpenMap.show({ latitude, longitude, ..._addressOpenMapsDefaultProps });
}
export const actionLigar = (telefone) => {
    const phone = telefone.replace(/\D/g, "");
    Linking.openURL(`tel:${phone}`)
}