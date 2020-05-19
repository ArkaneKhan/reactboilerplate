import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button, SafeAreaView } from 'react-native';

const drawerRoutes = [
  {
    title: "Notifications",
    route: "NotificationStack"
  },
  {
    title: "Settings",
    route: "SettingsStack"
  },
]
export default class index extends Component {

  state = {

  }

  componentDidMount() {

  }

  render() {

    const { } = this.props

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={drawerRoutes}
          renderItem={({ item }) => <Button title={item.title} onPress={() => this.props.navigation.navigate(item.route)} />}
          contentContainerStyle={{ paddingVertical: 15 }}
          keyExtractor={(item) => item.route}
        />
      </SafeAreaView>
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});