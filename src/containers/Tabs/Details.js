import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Details extends Component {

  state = {

  }

  componentDidMount() {

  }

  render() {

    const { } = this.props

    return (
      <View style={styles.container}>
        <Text>Details</Text>
      </View>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});