import React from "react";
import { View, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { colors } from '../../Assets/colors';
// import Spinkit from "react-native-spinkit";

const Spinner = props => {
  return (
    <Modal
      animationType="none"
      onRequestClose={() => console.log("close")}
      supportedOrientations={["landscape", "portrait"]}
      transparent
      visible={true}
    >
      <View
        style={[styles.container, { backgroundColor: "rgba(0, 0, 0, 0.25)" }]}
        key={`spinner_${Date.now()}`}
      >
        <View style={styles.background}>
          {/* <ActivityIndicator size={'large'} color={"#0480D9"}/> */}
          <ActivityIndicator size={'large'} color={colors.themeColor} />
          {/* <Spinkit
            style={styles.spinner}
            isVisible={true}
            size={37}
            type={"FadingCircleAlt"}
            color={props.color}
          /> */}
          {/* <View style={styles.textContainer}>
                        <Text style={styles.textContent}>Loading..</Text>
                    </View> */}
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  spinner: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center"
  },
  textContainer: {
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  },
  textContent: {
    top: 80,
    height: 50,
    fontSize: 20,
    fontWeight: "bold"
  }
});
export { Spinner };
