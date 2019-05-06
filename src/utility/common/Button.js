import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.buttonStyle}>
      <Text style={styles.textStyle}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    flex: 1,
    borderColor: "#007aff"
  },
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 17,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10
  }
});
export { Button };
