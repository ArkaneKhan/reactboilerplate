import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { Platform } from "react-native";
import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import Reducers from "./src/Store/Reducer";
import HttpServiceManager from "./src/HttpServiceManager/HttpServiceManager";
import constant from "./src/HttpServiceManager/constant";
import { AppContainer } from "./src/AppNavigator";
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer
} from "react-navigation-redux-helpers";
import {
  persistStore,
  persistReducer,
  persistCombineReducers
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { PersistGate } from "redux-persist/lib/integration/react";
import logger from "redux-logger";
import {
  createFilter,
  createWhitelistFilter
} from "redux-persist-transform-filter";
import { LoadingView } from "./src/ReuseableComponents/LoadingView";
import KeyboardManager from "react-native-keyboard-manager";
import { BackHandler } from "react-native";
import { NavigationActions } from "react-navigation";

const navReducer = createNavigationReducer(AppContainer);

const appReducer = {
  nav: navReducer,
  ...Reducers
};

// const appReducer = {
//   // nav: navReducer,
//   ...Reducers
// }

const middleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const App = reduxifyNavigator(AppContainer, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

const filter = createFilter("signIn", ["user", "language", "location"]);

const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  transforms: [filter],
  whitelist: ["signIn"],
  blacklist: ["nav"]
};

const pReducer = persistCombineReducers(persistConfig, appReducer);

export const store = createStore(
  pReducer,
  // applyMiddleware(middleware, ReduxThunk, logger),
  applyMiddleware(middleware, ReduxThunk)
);

export const persistor = persistStore(store);

let close = false;

export default class Root extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this._handleBackPress);
    if (Platform.OS === "ios") {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
    HttpServiceManager.initialize(constant.baseURL, {
      token: "api.Pd*!(5675"
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this._handleBackPress);
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWithNavigationState />
        </PersistGate>
      </Provider>
    );
  }

  _handleBackPress = () => {
    console.log("store.getState().nav: ", store.getState().nav);
    if (this._isDrawerOpen(store.getState().nav)) {
      this._closeDrawer();
      return true;
    }
    if (this._shouldCloseApp(store.getState().nav)) {
      return false; // exit
    }
    this._goBack();
    return true; //pop
  };

  _isDrawerOpen = nav => nav.routes[0].index === 1;

  _shouldCloseApp = nav => {
    console.log("CLOSE NAVIGATION :: ", nav);
    if (nav.index > 0) {
      if (nav.routes[nav.index].routes && nav.routes[nav.index].index === 0) {
        return nav.routes[nav.index].routes.every(this.checkIndex);
      } else if (nav.routes[nav.index].index) {
        console.log("aya");
        return false;
      } else {
        return true;
      }
    }
  };

  checkIndex = nav => {
    console.log("INDEX NAVIGATION :: ", nav);
    console.log("INDEX :: ", nav.index);
    if (nav.routes && nav.index === 0) {
      nav.routes.every(this.checkIndex);
    } else if (nav.index) {
      close = false;
    } else {
      close = true;
    }
    console.log("CLOSE: ", close);
    return close;
  };
  _goBack = () => store.dispatch(NavigationActions.back());

  _closeDrawer = () =>
    store.dispatch(
      NavigationActions.navigate({
        routeName: "DrawerClose"
      })
    );
}
