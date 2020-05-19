import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { push } from '../../services/NavigationService';

export default class Login extends Component {

  state = {

  }

  componentDidMount() {

  }

  render() {

    const { } = this.props

    return (
      <View style={styles.container}>
        <Button
          title="Login"
          onPress={() => { }}
        /* 
          dont call navigate after login success.
          react navigation will automatically navigate when it will find user token
          and the auth stack will be destroyed just like switch navigator in v4.
          https://stackoverflow.com/questions/60402632/switchnavigator-with-react-navigation-5
        */
        />
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});