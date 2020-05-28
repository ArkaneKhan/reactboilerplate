import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../containers/Tabs/Home';
import Details from '../../containers/Tabs/Details';
import { Images } from '../../theme';
import { toggleDrawer } from '../../services/NavigationService';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={Home}
      options={{
        headerLeft: () =>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            <Image source={Images.icMenu} style={{ marginHorizontal: 15 }} />
          </TouchableOpacity>
      }}
    />
  </Stack.Navigator >
)


const DetailsStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Details"
      component={Details}
      options={{
        headerLeft: () =>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            <Image source={Images.icMenu} style={{ marginHorizontal: 15 }} />
          </TouchableOpacity>
      }}
    />
  </Stack.Navigator >
)

export default TabNav = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        tabBarLabel: "Home"
      }}
    />
    <Tab.Screen
      name="DetailsStack"
      component={DetailsStack}
      options={{
        tabBarLabel: "Details"
      }}
    />
  </Tab.Navigator>
)