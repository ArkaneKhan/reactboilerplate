import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native'
import { AppConstants } from '../../AppConstants';
import { Images, UIFont, fonts, fontSize, colors, headerStyle } from '../../Assets';
import { Statusbar } from '../../ReuseableComponents';
import { widthRatio, heightRatio } from '../../utility/utility';
import { resetChangePassword } from '../../Store/Action';
import { connect } from 'react-redux';
import { DrawerActions } from "react-navigation";

let navStyle = '';

class Settings extends Component {
  state = {}
  routes = [
    {
      route: 'ChangePassword',
      name: AppConstants.changePassword,
      image: Images.icChangePassword
    },
    {
      route: 'ChangeLanguage',
      name: AppConstants.language,
      image: Images.icChangePassword
    },
    {
      route: '',
      name: AppConstants.aboutUs,
      image: Images.icAboutUs
    },
    {
      route: '',
      name: AppConstants.privacyPolicy,
      image: Images.icPrivacy
    },
    {
      route: '',
      name: AppConstants.termsAndCondition,
      image: Images.icTerms
    },
  ]

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
    }
  };


  componentDidMount() {
    this.props.navigation.setParams({ userType: this.props.user.user_type })
  }

  render() {
    return (
      <View style={styles.container}>
        <Statusbar color={navStyle.backgroundColor} contentStyle={navStyle.contentStyle} />
        <FlatList
          data={this.routes}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => this.renderItem(item)} />
      </View>
    );
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => this.onPress(item)} style={styles.button}>
        <Image source={item.image} resizeMode='contain' style={styles.icon} />
        <Text style={styles.btnText}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  onPress(item) {
    switch (item.route) {
      case 'ChangePassword':
        this.props.resetChangePassword()
    }
    const userType = this.props.navigation.getParam('userType', null)
    this.props.navigation.navigate(item.route, { userType })
  }

}

const mapStateToProp = state => {
  return {
    user: state.signIn.user,
  };
};

export default connect(mapStateToProp, { resetChangePassword })(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGrey,
  },
  button: {
    flexDirection: 'row',
    marginHorizontal: 25,
    paddingVertical: 25,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#CAC4FF',
  },
  btnText: {
    ...UIFont.font(fonts.regular, fontSize.large, colors.lightBlack),
  },
  icon: {
    width: widthRatio(43),
    height: heightRatio(48),
    marginRight: 20,
  },
  iconHome: {
    marginHorizontal: 15,
    width: 26,
    height: 26,
  },
});