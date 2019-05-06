import React from "react";
import { Text, View, ImageBackground, StyleSheet } from "react-native";
import { Images, UIFont, fonts, fontSize, colors } from "../Assets";
import { widthRatio, heightRatio } from "../utility/utility";
import LinearGradient from "react-native-linear-gradient";

export const PriceView = props => (
  <LinearGradient
    colors={["#03C4FF", "#4B8DFF"]}
    style={[styles.LinearGradientStyle, props.priceViewStyle]}
  >
    <View style={[styles.priceStyle, props.priceStyle]}>
      <Text style={styles.priceTextStyle}>${props.price}</Text>
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  LinearGradientStyle: {
    width: widthRatio(194),
    height: heightRatio(142),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8
  },
  priceTextStyle: {
    marginHorizontal: 5,
    ...UIFont.font(fonts.regular, fontSize.large, colors.white)
  }
});
