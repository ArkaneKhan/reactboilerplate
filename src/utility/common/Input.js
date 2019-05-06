import React from "react";
import { TextInput, Text, View, StyleSheet } from "react-native";

const Input = props => {
  return (
    <View style={styles.viewStyle}>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        style={styles.textInputStyle}
        value={props.value}
        onChangeText={props.onChangeText}
        autoCorrect={false}
        autoFocus={true}
        autoCapitalize="none"
        secureTextEntry={props.secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    paddingTop: 5,
    paddingBottom: 5
  },
  textInputStyle: {
    fontSize: 17,
    lineHeight: 23,
    flex: 3
  },
  labelStyle: {
    flex: 1,
    paddingLeft: 5,
    fontSize: 17
  }
});

export { Input };
