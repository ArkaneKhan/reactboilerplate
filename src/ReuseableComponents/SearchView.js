import React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { UIFont, fonts, fontSize, colors, Images} from '../Assets';
import { heightRatio, widthRatio } from '../utility/utility';

export const SearchView = (props) => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.searchButton} onPress={props.onSearchPress}>
      <Image
        resizeMode="contain"
        style={styles.imgStyle}
        source={Images.icSearch}
        tintColor={'#999999'}
      />
    </TouchableOpacity>
    <TextInput
      style={styles.textInputStyle}
      value={props.value}
      onChangeText={props.onChangeText}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      placeholder={props.placeholder}
      placeholderTextColor={colors.placeholderColor}
      autoCapitalize="none"
      autoCorrect={false}
      editable={props.editable}
      onEndEditing={props.onEndEditing}
    />
  </View>
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EBEBEB',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textInputStyle: {
    backgroundColor: colors.white,
    flex: 1,
    height: 40,
    marginHorizontal: 20,
    marginVertical: 8,
    paddingLeft: 35,
    borderRadius: 5,
    ...UIFont.font(fonts.regular, fontSize.medium, colors.black),
  },
  imgStyle: {
    width: heightRatio(48),
    height: heightRatio(48),
    alignSelf: "center",
    justifyContent: "center",
  },
  searchButton: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    left: 30,
    zIndex: 10,
  }
});

