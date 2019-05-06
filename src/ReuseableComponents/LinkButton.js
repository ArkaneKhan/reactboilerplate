import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import {UIFont,fonts,fontSize,colors} from '../Assets';

export const LinkButton = (props) => (
  <View style={[styles.btnViewStyle,props.btnViewStyle]}>
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.btnStyle,
        { backgroundColor: props.btnColor },
        props.btnStyle]}>
      <Text 
       style={[styles.btnTxtStyle,
        { color: props.txtColor },
        props.btnTxtStyle]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  </View>

);

const styles = StyleSheet.create({
  btnViewStyle:{
    // alignSelf:'center',
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    // height: 40,
  },
  btnTxtStyle: {
    ...UIFont.font(fonts.regular,fontSize.medium,colors.black)
  }
})

