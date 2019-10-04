//
//  Fonts.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:47:26 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import Metrics from "./Metrics";

export default class Fonts {
    static FontFamily = {
        default: "Gibson",
        secondary: "Georgia"
    };

    static Type = {
        BoldItalic: "BoldItalic",
        Regular: "Regular",
        SemiboldIt: "SemiboldIt",
        Italic: "Italic",
        Bold: "Bold",
        LightIt: "LightIt",
        SemiBold: "SemiBold",
        Light: "Light"
    };

    static Size = {
        xxxSmall: Metrics.generatedFontSize(11),
        xxSmall: Metrics.generatedFontSize(13),
        xSmall: Metrics.generatedFontSize(14),
        small: Metrics.generatedFontSize(15),
        normal: Metrics.generatedFontSize(17),
        medium: Metrics.generatedFontSize(19),
        large: Metrics.generatedFontSize(21),
        xLarge: Metrics.generatedFontSize(23),
        xxLarge: Metrics.generatedFontSize(28),
        xxxLarge: Metrics.generatedFontSize(31),
        huge: Metrics.generatedFontSize(34),
        xhuge: Metrics.generatedFontSize(37),
        xxhuge: Metrics.generatedFontSize(40),
        xxxhuge: Metrics.generatedFontSize(43)
    };

    static font = (
        fontFamily = Fonts.FontFamily.default,
        type = Fonts.Type.Regular,
        size = Fonts.Size.medium
    ) => {
        return {
            fontFamily: fontFamily + "-" + type,
            fontSize: size
        };
    };
}
