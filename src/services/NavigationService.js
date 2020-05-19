//
//  NavigationService.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:35:30 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import React from 'react';
import {
  NavigationActions,
  StackActions,
  DrawerActions
} from "react-navigation";

const navigatorRef = React.createRef();

const push = (routeName, params = {}) => {
  navigatorRef.current?.navigate(routeName, params);
}


const pop = (popCount = 1, params = {}) =>
  navigatorRef.dispatch(
    StackActions.pop(({ n: popCount, params } = { n: 1, params: {} }))
  );

const popToTop = () => navigatorRef.dispatch(StackActions.popToTop());
const reset = () => {
  const actionToDispatch = StackActions.reset({
    index: 0,
    key: "Auth", //Stack name
    actions: [NavigationActions.navigate({ routeName: "your route name" })]
  });
  navigatorRef.dispatch(actionToDispatch);
};
const openDrawer = () => navigatorRef.dispatch(DrawerActions.openDrawer());
const closeDrawer = () => navigatorRef.dispatch(DrawerActions.closeDrawer());

export {
  // setNavigatorRef,
  // getNavigatorRef,
  navigatorRef,
  push,
  pop,
  openDrawer,
  closeDrawer,
  popToTop,
  reset
};
