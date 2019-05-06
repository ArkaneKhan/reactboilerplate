import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Images, colors } from '../Assets';
import { heightRatio } from '../utility/utility';

export const Card = (props) => (

  <TouchableOpacity
    onPress={props.onPress}
    style={[styles.cardStyle, props.cardStyle]}
    disabled={props.onPress ? false : true} >
    {props.border &&
      <Image source={props.border} resizeMode='contain' style={[styles.borderStyle, props.borderStyle]} />
    }
    {props.children}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 8,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowColor: colors.black,
    elevation: 6,
    margin: 15,
    backgroundColor: colors.white,
  },
  borderStyle: {
    height: heightRatio(150),
    width: heightRatio(150),
    marginTop: -8,
    marginLeft: -16,
    position: 'absolute',
  }
})
