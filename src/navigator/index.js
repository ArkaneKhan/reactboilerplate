//
//  index.js:
//  BoilerPlate
//
//  Created by Retrocube on 10/4/2019, 9:14:05 AM.
//  Copyright © 2019 Retrocube. All rights reserved.
//
import { dyanimcTitle } from "./navigatorHelper";
import React, { forwardRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNav from './Drawer';

const rootNavigator = forwardRef((props, ref) =>
  <NavigationContainer ref={ref}>
    {
      props.isLogin ?
        <DrawerNav />
        :
        <DrawerNav />
    }
  </NavigationContainer>
)

export default rootNavigator;
