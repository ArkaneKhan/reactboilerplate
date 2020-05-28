import _ from "lodash";
import React, { createContext, Component } from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import RootNavigator from "./navigator";
import { navigatorRef } from "./services/NavigationService";
import singleton from "./singleton";
import SplashScreen from "react-native-splash-screen";
import { Colors, Metrics } from "./theme";
import HttpServiceManager from "./services/HttpServiceManager";
import constant from "./constants";
import FlashMessage, { showMessage } from "react-native-flash-message";
import Spinner from "react-native-globalspinner";
import Reachability from "react-native-reachability-popup";

export const LoginContext = createContext({
  isLogin: false,
  setLogin: () => { }
});

export default class App extends Component {

  componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL, {
      token: constant.applicationToken
    });
    //set designedAtX verify it on Adobe XD Desgin file
    //Metrics.designedAtX = false;
  }

  state = { isReduxLoaded: false };

  onBeforeLift = () => {
    singleton.storeRef = store;

    this.setState({ isReduxLoaded: true }, () => {
      SplashScreen.hide();
    });
  };


  render() {

    const { isReduxLoaded } = this.state

    return (
      <Provider store={store}>

        <StatusBar
          barStyle="light-content"
          backgroundColor={Colors.secondary.azure}
        />

        <PersistGate
          onBeforeLift={this.onBeforeLift}
          persistor={persistor}>

          {
            isReduxLoaded ?
              <RootNavigator
                ref={navigatorRef}
                isLogin={true} // perform a check on user token
              />
              :
              <View />
          }

        </PersistGate>

        <FlashMessage position="top" />

        <Spinner color={Colors.primary.theme} />

        <Reachability />

      </Provider>
    );
  }
}
