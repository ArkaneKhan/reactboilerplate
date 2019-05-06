import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Images, UIFont, fonts, fontSize, colors, } from '../Assets';
import { heightRatio } from '../utility/utility';

export const HighlightedRoundView = (props) => {
  return (
    <View style={[styles.viewStyle, { backgroundColor: props.backgroundColor }, props.viewStyle]}>
      <TouchableOpacity
        onPress={props.onPress}
        style={[styles.contentStyle, props.contentStyle]}>
        <Image style={styles.imageStyle} source={props.lhsImage} resizeMode='contain' />
        <Text style={[styles.textStyle, props.textStyle]}>{props.title}</Text>
        {
          props.rhsImage === undefined ?
            props.children
            :
            <Image source={props.rhsImage} style={styles.imageStyle} />
        }
        {props.badgeValue !== null ?
          <View style={[styles.badgeStyle, { backgroundColor: 'rgba(52, 52, 52, 0.3)' }]}>
            <Text style={styles.badgeContentStyle}>{props.badgeValue}</Text>
          </View>
          : null
        }
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  viewStyle: {
    borderRadius: 25,
    height: 35,
    justifyContent: 'center',
    marginBottom: 15
    // alignItems: 'center',
  },
  textStyle: {
    ...UIFont.font(fonts.regular, fontSize.medium, colors.white)
  },
  contentStyle: {
    marginLeft: 20,
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  imageStyle: {
    height: heightRatio(59),
    width: heightRatio(53),
    marginRight: 15
  },
  badgeStyle: {
    borderRadius: 25,
    height: 25,
    justifyContent: 'center',
    alignItems:'center',
    marginLeft: 15,
    // marginRight: 5,
  },
  badgeContentStyle:{
    marginLeft: 15,
    marginRight: 15,
    ...UIFont.font(fonts.regular, fontSize.small, colors.white)
  }
});
