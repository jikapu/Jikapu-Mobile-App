import { Dimensions,PixelRatio } from "react-native";

const {width, height} = Dimensions.get('window');

export const widthToDP = number => {
    let givenWidth = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
}

export const heightToDP = number => {
    let givenHeight = typeof number === 'number' ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
}

