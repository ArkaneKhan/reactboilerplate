import {
  createStackNavigator,
  createAppContainer,
  createDrawerNavigator
} from "react-navigation";

import { Home, Demo } from "../containers";

const HomeStack = createStackNavigator({
  home: {
    screen: Home
  },
  demo: {
    screen: Demo
  }
});

export default createAppContainer(HomeStack);
