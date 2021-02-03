import React, { useContext } from 'react';
import { StyleSheet, FlatList, Button, SafeAreaView } from 'react-native';
import { navigate, toggleDrawer } from '../../services/NavigationService';
import { LoginContext } from '../../contexts';

const drawerRoutes = [
  {
    title: "Notifications",
    route: "Notifications"
  },
  {
    title: "Settings",
    route: "Settings"
  },
  {
    title: "Logout",
    route: ""
  },
]

const index = (props) => {

  const { } = props
  const { setLogin } = useContext(LoginContext);

  const onPress = (item, setLogin) => ev => {
    toggleDrawer()
    if (item.title === 'Logout') {
      setLogin(false)
    } else {
      navigate(item.route)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={drawerRoutes}
        renderItem={
          ({ item }) =>
            <Button title={item.title}
              onPress={onPress(item, setLogin)}
            />
        }
        contentContainerStyle={{ paddingVertical: 15 }}
        keyExtractor={(item) => item.route}
      />
    </SafeAreaView>
  )

}

export default index;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
