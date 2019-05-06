import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, UIFont, fonts, fontSize } from '../Assets';
import { AppConstants } from '../AppConstants';

export const TipPopup = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{AppConstants.tipPopupText}</Text>
      <View style={styles.btnViewStyle}>
        <TouchableOpacity
          onPress={props.onYesPress}
          style={[styles.btnStyle, { borderRightWidth: 0.25, borderRightColor: '#D2D2D2' }]}>
          <Text>{AppConstants.yes}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={props.onNoPress}
          style={[styles.btnStyle, { borderLeftWidth: 0.25, borderLeftColor: '#D2D2D2' }]}>
          <Text>{AppConstants.no}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    // alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#D2D2D2',
    borderRadius: 5,
    // // marginHorizontal: 25,
    // width : 324,
    height: 204
  },
  textStyle: {
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: 25,
    ...UIFont.font(fonts.regular, fontSize.medium, colors.lightBlack)
  },
  btnViewStyle: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#D2D2D2',
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 0,
  },
  btnStyle: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  btnTextStyle: {
    ...UIFont.font(fonts.regular, fontSize.medium, colors.lightBlack)
  }
});

