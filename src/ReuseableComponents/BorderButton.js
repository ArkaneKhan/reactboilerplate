import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Images, UIFont, fonts, fontSize, colors, } from '../Assets';

export const BorderButton = (props) => (
  <TouchableOpacity
    style={[styles.btnStyle, props.btnStyle]}
    onPress={props.onPress} >
    <Text style={[styles.btnTextStyle, props.btnTextStyle]}>{props.title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 25,
    borderColor: colors.btnBlue
  },
  btnTextStyle: {
    ...UIFont.font(fonts.regular, fontSize.small, colors.btnBlue),
    marginLeft: 5,
    marginRight: 5
  }
});

