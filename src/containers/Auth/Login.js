import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { LoginContext } from "../../contexts";
import { Button } from "../../components";

const Login = (props) => {
  const {} = props;
  const { setLogin } = useContext(LoginContext);

  global.log("LOGIN");
  return (
    <View style={styles.container}>
      {/* <Button
        title="Login"
        onPress={() => setLogin()}

      /> */}
      <Button>Login</Button>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
