import React, { } from "react"
import { CameraKitGalleryView } from "react-native-camera-kit"
export default function GaleriaDevice({ action, actionToogle, pop}) {
    return <CameraKitGalleryView
        style={{ flex: 1, margin: 5 }}
        albumName="All Photos"
        minimumInteritemSpacing={5}
        minimumLineSpacing={5}
        columnCount={3}
        selection={{
            selectedImage: require("@images/camera/hugging.png"),
            imagePosition: "top-right",
            width: 50,
            height: 40
        }}
        onTapImage={e => action(e, pop)}
        remoteDownloadIndicatorType={"progress-pie"}
        remoteDownloadIndicatorColor={"white"}
        customButtonStyle={{
            image: require("@images/camera/openCamera.png"),
            backgroundColor: "#f1f1f1"
        }}
        onCustomButtonPress={actionToogle}
    />
}