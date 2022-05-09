import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../../containers';
import DrawerNav from '../Drawer';

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={Login}
      options={{ title: 'Login' }}
    />
  </Stack.Navigator>
)

const MainStack = ({ navigation }) => (
  <Stack.Navigator
    headerMode='none'>
    <Stack.Screen
      name="DrawerNav"
      component={DrawerNav}
    />
  </Stack.Navigator>
)

export {
  AuthStack,
  MainStack
}