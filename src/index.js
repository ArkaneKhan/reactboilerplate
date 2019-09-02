import React, { Component } from "react";
import { StatusBar, NativeModules } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Navigator from "./navigator";
import { setNavigatorRef } from "./services/NavigationService";
import singleton from "./singleton";
import HttpServiceManager from "./services/HttpServiceManager";
import constant from "./services/constant";

export default class App extends Component {
  componentDidMount() {
    HttpServiceManager.initialize(constant.baseURL, {
      token: "api.Pd*!(5675"
    });
  }

  state = { isReduxLoaded: false };

  onBeforeLift = () => {
    //   this.setState({ isReduxLoaded: true }, () => {
    //     if (Utils.isPlatformAndroid()) {
    //       NativeModules.SplashScreen.hide();
    //     }
    //   });
    singleton.storeRef = store;
  };

  render() {
    return (
      <Provider store={store}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0.24)"
          animated
        />
        <PersistGate
          onBeforeLift={this.onBeforeLift}
          persistor={persistor}
        >
          <Navigator ref={ref => setNavigatorRef(ref)} />
        </PersistGate>
      </Provider>
    );
  }
}
