import React, { } from "react"
import { CameraKitCameraScreen } from "react-native-camera-kit"
export default function CameraDevice({ action, setIsCamera, pop}) {
    return <CameraKitCameraScreen
        imageSizeAndroid="medium"
        actions={{ leftButtonText: "  Galeria" }}
        onBottomButtonPressed={(e) => action(e, setIsCamera, pop)}
        cameraOptions={{
            flashMode: "auto",
            focusMode: "on",
            zoomMode: "on",
            ratioOverlay: "1:1",
            ratioOverlayColor: "#00000077"
        }}
        flashImages={{
            on: require("@images/camera/flashOn.png"),
            off: require("@images/camera/flashOff.png"),
            auto: require("@images/camera/flashAuto.png")
        }}
        cameraFlipImage={require("@images/camera/cameraFlipIcon.png")}
        captureButtonImage={require("@images/camera/cameraButton.png")}
    />
}