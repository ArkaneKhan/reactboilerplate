import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { navigate } from '../../services/NavigationService';
import { LoginContext } from '../../';
export default class Login extends Component {

  state = {

  }

  componentDidMount() {

  }

  render() {

    const { } = this.props

    return (
      <LoginContext.Consumer>
        {({ isLogin, setLogin }) => {
          return (
            <View style={styles.container}>
              <Button
                title="Login"
                onPress={() => setLogin()}

              />
            </View>
          )
        }}
      </LoginContext.Consumer >
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});