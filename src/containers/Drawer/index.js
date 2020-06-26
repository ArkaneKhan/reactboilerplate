import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button, SafeAreaView } from 'react-native';
import { navigate, toggleDrawer } from '../../services/NavigationService';
import { LoginContext } from '../../';

const drawerRoutes = [
  {
    title: "Notifications",
    route: "NotificationStack"
  },
  {
    title: "Settings",
    route: "SettingsStack"
  },
  {
    title: "Logout",
    route: ""
  },
]
export default class index extends Component {

  state = {

  }

  componentDidMount() {
    global.log('mount')
  }

  componentWillUnmount() {
    global.log('unmount')
  }

  onPress = (item, setLogin) => ev => {
    toggleDrawer()
    if (item.title === 'Logout') {
      setLogin(false)
    } else {
      navigate(item.route)
    }

  }

  render() {

    const { } = this.props

    return (
      <LoginContext.Consumer>
        {({ isLogin, setLogin }) => {
          return (
            <SafeAreaView style={styles.container}>
              <FlatList
                data={drawerRoutes}
                renderItem={({ item }) => <Button title={item.title} onPress={this.onPress(item, setLogin)} />}
                contentContainerStyle={{ paddingVertical: 15 }}
                keyExtractor={(item) => item.route}
              />
            </SafeAreaView>
          )
        }}
      </LoginContext.Consumer >
    )

  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});