import { StyleSheet, PixelRatio, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;
const iphoneX = height == 812;

const guidelineBaseWidth = iphoneX ? 375 : 414;
const guidelineBaseHeight = iphoneX ? 812 : 736;

const scaleHorizontal = size => (screenWidth / guidelineBaseWidth) * +size;
const scaleVertical = size => (screenHeight / guidelineBaseHeight) * size;

const heightRatio = size => scaleVertical(size);
const widthRatio = size => scaleHorizontal(size);

const generatedFontSize = size => scaleVertical(size);

const NAVBAR_HEIGHT = Platform.OS === "ios" ? 44 : 56;
// const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : 24;
const STATUSBAR_HEIGHT = Platform.OS === "ios" ? (iphoneX ? 44 : 20) : 24;

// width: 750,
// height: 110,

export default {
    heightRatio,
    widthRatio,
    screenWidth,
    screenHeight,
    generatedFontSize,

    searchBarHeight: heightRatio(50),
    smallMargin: heightRatio(8),
    baseMargin: heightRatio(16),
    doubleBaseMargin: heightRatio(24),
    xDoubleBaseMargin: heightRatio(32),
    horizontalLineHeight: heightRatio(1),

    statusBarHeight: STATUSBAR_HEIGHT,
    navBarHeight: NAVBAR_HEIGHT + STATUSBAR_HEIGHT,

    tabBarHeight: 49, // Default tab bar height in iOS 10

    icons: {
        tiny: heightRatio(16),
        small: heightRatio(24),
        normal: heightRatio(32),
        medium: heightRatio(48),
        large: heightRatio(64),
        xl: heightRatio(128)
    },
    images: {
        xSmall: heightRatio(15),
        small: heightRatio(20),
        medium: heightRatio(40),
        large: heightRatio(55),
        xLarge: heightRatio(70),
        avatar: heightRatio(90),
        logo: heightRatio(200),
        radius: heightRatio(100),
        coverWidth: screenWidth,
        coverHeight: screenWidth / 2
    }
};
