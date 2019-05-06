import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { UIFont, Images, fonts, fontSize, colors } from '../Assets';
import { heightRatio, widthRatio } from '../utility/utility';

export const Header = (props) => (
  <View style={styles.container}>
        {props.title === ''? null :  <Image source={Images.icLocationGrey} resizeMode='contain' style={styles.icon} />}
        <Text numberOfLines={1} style={styles.headerText}>{props.title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 20,
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowColor: colors.black,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  icon: {
    width: widthRatio(25),
    height: heightRatio(36),
    marginRight: 10,
    marginLeft: 10
  },
  headerText: {
    ...UIFont.font(fonts.bold, fontSize.small, colors.darkGrey),
    marginRight: 5,
  }
});




