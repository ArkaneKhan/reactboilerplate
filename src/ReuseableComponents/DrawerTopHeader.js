import React from "react";
import { View, StyleSheet, Image, Text,TouchableOpacity } from "react-native";
import { heightRatio, widthRatio } from "../utility/utility";
import { Images, UIFont, fonts, fontSize, colors } from '../Assets';
import { ProfilePicView } from '../ReuseableComponents';
import constant from '../HttpServiceManager/constant';

const DrawerTopHeader = props => {

  return (
    <TouchableOpacity style={styles.viewStyle} onPress={props.onPress}>
      <ProfilePicView
        image={{ uri : constant.baseImageURL + props.user.image_url}} />
      <View style={{ justifyContent: 'center', marginRight : widthRatio(350)}}>
        <Text numberOfLines={1} style={styles.name}>{props.user.username}</Text>
        <Text numberOfLines={1} style={styles.email}>{props.user.email}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    height: heightRatio(420),
    alignItems: "center",
    flexDirection: "row",
  },
  imageStyle: {
    width: heightRatio(320),
    height: heightRatio(320),
    marginTop: 15,
  },
  imageViewStyle: {
    width: heightRatio(200),
    height: heightRatio(200),
    borderRadius: heightRatio(200) / 2,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    marginLeft: 20,
    marginRight: heightRatio(25),
  },
  name : {
    ...UIFont.font(fonts.bold, fontSize.medium, colors.white)
  },
  email:{
    ...UIFont.font(fonts.regular, fontSize.small, colors.white),
  }
});

export default DrawerTopHeader;
