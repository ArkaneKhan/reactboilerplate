import React from 'react';
import { Text, View, StatusBar } from 'react-native';

export const Statusbar = (props) => {
  return (<StatusBar
    translucent={props.translucent? props.translucent : null}
    backgroundColor={props.color}
    barStyle={props.contentStyle ? props.contentStyle : "default"} 
    hidden={props.hidden? props.hidden : false}
    />
  );
}

