import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { UIFont, Images, fonts, fontSize, colors } from '../Assets';
import { heightRatio, widthRatio } from '../utility/utility';

export const Tab = (props) => (
  <Animated.View style={[styles.container, props.tabStyle]}>
    <TouchableOpacity
      onPress={props.onAboutPressed}
      style={styles.btnStyle} >
      <Text style={[styles.tabTextStyle, { color: props.tab === 1 ? colors.lightPurple : colors.placeholderColor }]}>
        {props.firstTabText}
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={props.onServicesPressed}
      style={styles.btnStyle} >
      <Text style={[styles.tabTextStyle, { color: props.tab === 2 ? colors.lightPurple : colors.placeholderColor }]}>
        {props.secondTabText}
      </Text>
    </TouchableOpacity>
  </Animated.View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 6,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
    shadowColor: colors.black,
    elevation: 6,
    backgroundColor: colors.white,
    elevation: 15,
  },
  btnStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    elevation: 20,
  },
  tabTextStyle: {
    ...UIFont.font(fonts.medium, fontSize.medium, colors.placeholderColor)
  }
})

