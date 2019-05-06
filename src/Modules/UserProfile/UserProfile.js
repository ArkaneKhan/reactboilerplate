import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Images, UIFont, fonts, fontSize, colors, css, headerStyle } from '../../Assets';
import { ProfilePicView, Statusbar } from '../../ReuseableComponents';
import { AppConstants } from '../../AppConstants';
import { heightRatio, widthRatio } from '../../utility/utility';
import { connect } from 'react-redux';
import constant from '../../HttpServiceManager/constant';
import { setEditUser } from '../../Store/Action';
import { DrawerActions } from "react-navigation";

let navStyle = '';

class UserProfile extends Component {

  static navigationOptions = ({ navigation }) => {
    navStyle = headerStyle(navigation.getParam('userType', null))
    return {
      headerStyle: { backgroundColor: navStyle.backgroundColor, borderBottomWidth: 0, elevation: 0 },
      headerTitleStyle: { color: navStyle.color },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
          <Image style={[styles.iconHome, { tintColor: navStyle.color }]} resizeMode='contain' source={Images.icMenu} />
        </TouchableOpacity>
      ),
      headerRight: (
        <TouchableOpacity
          onPress={() => navigation.state.params.onEditPress()}>
          <Image style={[styles.iconHome, { tintColor: navStyle.color }]} resizeMode='contain' source={Images.icEdit} />
        </TouchableOpacity>
      ),
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ onEditPress: this.onEditPress, userType: this.props.user.user_type })
  }

  render() {
    return (
      <View style={styles.container}>
        <Statusbar color={navStyle.backgroundColor} contentStyle={navStyle.contentStyle} />
        <ProfilePicView
          imgViewStyle={styles.imgViewStyle}
          imgStyle={{ height: 115, width: 115, borderRadius: 115 / 2 }}
          image={{ uri: constant.baseImageURL + this.props.user.image_url }} />
        <View style={styles.textContainer}>
          <Text style={styles.lable}>{AppConstants.name}</Text>
          <Text style={styles.value}>{this.props.user.username}</Text>

          <Text style={styles.lable}>{AppConstants.email}</Text>
          <Text style={styles.value}>{this.props.user.email}</Text>

          <Text style={styles.lable}>{AppConstants.phone}</Text>
          <Text style={styles.value}>{this.props.user.mobile_no === '' ? AppConstants.phone : this.props.user.mobile_no}</Text>
        </View>
      </View>
    );
  }

  onEditPress = () => {
    this.props.setEditUser(this.props.user, this.props.navigation.state.params.userType)
  }
}

const mapStateToProp = state => {
  return {
    user: state.signIn.user,
  };
};

export default connect(mapStateToProp, { setEditUser })(UserProfile);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgGrey,
    flex: 1,
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
  },
  imgViewStyle: {
    height: 119,
    width: 119,
    borderRadius: 119 / 2,
    marginTop: heightRatio(165),
    marginBottom: heightRatio(193),
  },
  lable: {
    ...UIFont.font(fonts.regular, fontSize.medium, colors.themeColor),
    marginBottom: 5
  },
  value: {
    ...UIFont.font(fonts.regular, fontSize.xLarge, colors.lightBlack),
    marginBottom: 25
  },
  iconHome: {
    marginHorizontal: 15,
    width: 26,
    height: 26,
  },
})
