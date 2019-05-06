import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import {heightRatio, widthRatio} from '../utility/utility';
import {css,colors} from '../Assets';

export const UploadImageView = (props) => {
  return (
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.btnStyle,props.btnStyle]}>
        <Image
          style={[styles.imgStyle,props.imgStyle]}
          source={props.image}
        />
      </TouchableOpacity>
  )
};
const styles = StyleSheet.create({

  btnStyle: {
    justifyContent:'center',
    alignItems: 'center',
    width: heightRatio(401),
    height: heightRatio(401),
    borderColor: colors.white,
    borderWidth: 5,
    borderRadius: heightRatio(401)/2,
    ...css.dropShadow,
  },
  imgStyle: {
    width: heightRatio(373),
    height: heightRatio(373),
    borderRadius: heightRatio(373)/2,
  }
})
