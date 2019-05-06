import React from "react";
import { View, StyleSheet } from "react-native";

const CardSection = props => {
  return (
    <View style={[styles.containerStyle, props.style]}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderColor: "#d1d1d1",
    position: "relative"
  }
});
export { CardSection };
