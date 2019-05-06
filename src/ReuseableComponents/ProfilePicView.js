import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { colors } from '../Assets';
import { heightRatio, } from '../utility/utility';

export const ProfilePicView = (props) => {
  return (
    <View style={[styles.imgViewStyle, props.imgViewStyle]}>
      <Image
        source={props.image}
        style={[styles.imgStyle, props.imgStyle]}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  imgViewStyle: {
    height: 80,
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 80/2,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: colors.black,
    elevation: 5,
    marginRight: 15,
    marginLeft: 15,
  },
  imgStyle: {
    height: 76,
    width: 76,
    borderRadius: 76/2,
  }
})

