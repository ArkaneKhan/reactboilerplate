import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../../containers/Tabs/Home';
import Details from '../../containers/Tabs/Details';
import { Images } from '../../theme';
import { toggleDrawer } from '../../services/NavigationService';
import Example from '../../containers/Tabs/Example';
import { backButton } from '../navigatorHelper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNav = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarLabel: "Home"
      }}
    />
    <Tab.Screen
      name="Details"
      component={Details}
      options={{
        tabBarLabel: "Details"
      }}
    />
  </Tab.Navigator>
)

export default TabStack = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      ...backButton()
    }}>
    <Stack.Screen
      name="TabNav"
      component={TabNav}
      options={{
        headerLeft: () =>
          <TouchableOpacity onPress={() => toggleDrawer()}>
            <Image source={Images.icMenu} style={{ marginHorizontal: 15 }} />
          </TouchableOpacity>,
        headerTitle: null
      }}
    />
    <Stack.Screen
      name="Example"
      component={Example}
    />
  </Stack.Navigator>
)