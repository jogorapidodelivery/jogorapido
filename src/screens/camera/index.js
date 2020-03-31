import React, { useState } from "react"
import BaseScreen from "@screens/partial/base";
import styl from "./styl"
import GaleriaDevice from "./partial/galeria";
import CameraDevice from "./partial/camera";
import { CameraKitGallery } from "react-native-camera-kit"
import ImageResizer from "react-native-image-resizer"
import { empty } from "@sd/uteis/StringUteis";
const onTapImage = async (_e, pop) => {
    const image = await CameraKitGallery.getImageForTapEvent(_e.nativeEvent)
    if (!empty(image) && !empty(image.imageUri)) _resize(image.imageUri, pop)
}
const _upload = (file, pop) => {
    console.log(file);
    pop()
}
const _resize = (_f, pop) => {
    ImageResizer.createResizedImage(_f, 400, 400, "JPEG", 80).then(_fNew => {
        _upload(_fNew.uri, pop)
    }).catch((_erro) => {
        _upload(_f, pop)
    })
}
const _actionsCamera = (_e, setState, pop) => {
    switch (_e.type) {
        case "left":
            setState(false)
            break
        case "capture":
            _resize(`file://${_e.captureImages[0].uri}`, pop)
            break
        default:
            console.warn("Actions.pop")
            pop();
            break
    }
}
export default function Camera({ navigation}){
    const [isCamera, setIsCamera] = useState(false)
    return <BaseScreen
        styleImportant={styl.container}
        tituloBold="GALERIA"
        navigation={navigation}
        titulo="DE FOTOS"
    >
        {isCamera ? <CameraDevice pop={navigation.pop} action={_actionsCamera} setIsCamera={setIsCamera} /> : <GaleriaDevice pop={navigation.pop} action={onTapImage} actionToogle={setIsCamera}/>}
    </BaseScreen>
}
/*

export default class GoTrainerCamera extends Component<any, any> {
    static defaultProps: any = {}
    props: any
    state: any = {
        album: "All Photos",
        presentedImage: undefined,
        selectedImages: [],
        showPresentedImage: false,
        isCamera: false
    }
    async onTapImage (_e) {
        const image = await CameraKitGallery.getImageForTapEvent(_e.nativeEvent)
        if (!empty(image) && !empty(image.imageUri)) this._resize(image.imageUri)
    }
    componentDidMount() {
        analyticsScreen("camera", "index")
    }
    _resize = _f => {
        ImageResizer.createResizedImage(_f, 400, 400, "JPEG", 80).then(_fNew => {
            this._upload(_fNew.uri)
        }).catch((_erro) => {
            this._upload(_f)
        })
    }
    _upload = _f => {
        this.props.fetchFoto({
            foto:{
                uri: _f,
                type: `image/${imageExtensao(_f)}`,
                name: imageName(_f)
            }
        })
    }
    _actionsCamera = _e => {
        switch (_e.type) {
            case "left":
                this.setState({ isCamera:false })
                break
            case "capture":
                this._resize(`file://${_e.captureImages[0].uri}`)
                break
            default:
                Actions.pop()
                break
        }
    }
    get _camera() {
        return <View style={styl.container}>
            <CameraKitCameraScreen
                imageSizeAndroid="medium"
                actions={{ leftButtonText: "  Galeria" }}
                onBottomButtonPressed={ _e => this._actionsCamera(_e)}
                cameraOptions={{
                    flashMode: "auto",
                    focusMode: "on",
                    zoomMode: "on",
                    ratioOverlay:"1:1",
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
        </View>
    }

    get _galeria() {
        return <View style={styl.container}>
            <Header titulo="Fotos" />
            <CameraKitGalleryView
                style={{ flex: 1, margin: 5 }}
                albumName={this.state.album}
                minimumInteritemSpacing={5}
                minimumLineSpacing={5}
                columnCount={3}
                selection={{
                    selectedImage: require("@images/camera/hugging.png"),
                    imagePosition: "top-right",
                    width:50,
                    height:40
                }}
                onTapImage={this.onTapImage.bind(this)}
                remoteDownloadIndicatorType={"progress-pie"}
                remoteDownloadIndicatorColor={"white"}
                customButtonStyle={{
                    image: require("@images/camera/openCamera.png"),
                    backgroundColor: "#f1f1f1"
                }}
                onCustomButtonPress={() => {
                    this.setState({ isCamera: true })
                }}
            />
        </View>
    }
    render(): any {
        if (this.state.isCamera) return this._camera
        return this._galeria
    }
} */