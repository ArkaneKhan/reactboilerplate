import Metrics from "./Metrics";

const type = {
    // bold: "Soleil-Bold",
    // book: "Soleil-Book",
    medium: "Roboto-Medium",
    regular: "Roboto-Regular"
};

const size = {
    xxxSmall: Metrics.generatedFontSize(11),
    xxSmall: Metrics.generatedFontSize(13),
    xSmall: Metrics.generatedFontSize(14),
    small: Metrics.generatedFontSize(15),
    normal: Metrics.generatedFontSize(17),
    medium: Metrics.generatedFontSize(19),
    large: Metrics.generatedFontSize(21),
    xLarge: Metrics.generatedFontSize(23),
    xxLarge: Metrics.generatedFontSize(28),
    xxxLarge: Metrics.generatedFontSize(50)
};

export default {
    type,
    size
};
