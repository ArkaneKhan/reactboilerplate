import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { UIFont, fonts, fontSize, colors } from '../Assets';
import { heightRatio } from '../utility/utility';

export const Button = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.btnStyle,
    { backgroundColor: props.btnColor },
    props.btnStyle]}
    disabled={props.disabled || false}>
    {
      props.lhsImage &&
      <Image source={props.lhsImage} resizeMode='contain' style={styles.imgStyle} />
    }
    <Text
      style={[styles.btnTxtStyle,
      { color: props.txtColor },
      props.btnTxtStyle]}>
      {props.title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({

  btnStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5,
    marginBottom: 15,
  },
  btnTxtStyle: {
    ...UIFont.font(fonts.medium, fontSize.medium, colors.black)
  },
  imgStyle: {
    height: heightRatio(62),
    width: heightRatio(62),
    position: 'absolute',
    left: 15,
  }
})

