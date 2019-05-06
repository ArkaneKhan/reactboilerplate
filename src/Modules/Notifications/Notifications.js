import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { AppConstants } from '../../AppConstants';
import { heightRatio, widthRatio, Alerts, validateEmail } from '../../utility/utility';
import { Spinner } from '../../utility/common';
import { Images, UIFont, fonts, fontSize, colors, headerStyle } from '../../Assets';
import { ProfilePicView, Statusbar } from '../../ReuseableComponents';
import { DrawerActions } from "react-navigation";
import { connect } from 'react-redux';

let navStyle = '';

class Notifications extends Component {

  state = {
    data: [
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
      {
        image: Images.user,
        name: "John Smith",
        notification: "Appointment request recieved",
        time: "1min ago"
      },
    ]
  }

  static navigationOptions = ({ navigation }) => {
    navStyle = headerStyle(navigation.getParam('userType', null))
    return {
      headerStyle: { backgroundColor: navStyle.backgroundColor, borderBottomWidth: 0, elevation: 0 },
      headerTitleStyle: { color: navStyle.color },
      headerTitle: AppConstants.notifications,
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
          extraData={this.state.data}
          data={this.state.data}
          renderItem={({ item }) => this.renderCell(item)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "" + index} />
      </View>
    );
  }

  renderCell = (item) => {
    return (
      <View style={styles.cell}>
        <Image source={item.image} style={styles.image} resizeMode='contain' />
        <View style={styles.nameContainer}>
          <Text style={{ ...UIFont.font(fonts.regular, fontSize.medium, colors.lightBlack) }}>{item.name}</Text>
          <Text style={{ ...UIFont.font(fonts.regular, fontSize.small, colors.lightGreen) }}>{item.notification}</Text>
        </View>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    )
  }

}

const mapStateToProp = state => {
  return {
    user: state.signIn.user,
  };
};

export default connect(mapStateToProp)(Notifications);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGrey,
  },
  cell: {
    flexDirection: 'row',
    marginHorizontal: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    backgroundColor: colors.bgGrey,
    borderBottomColor: colors.placeholderColor,
    paddingVertical: 15,
  },
  image: {
    height: heightRatio(153),
    width: heightRatio(153),
    borderRadius: heightRatio(153 / 2),
  },
  nameContainer: {
    flex: 1,
    marginLeft: 10,
    marginRight: 5
  },
  time: {
    alignSelf: 'flex-start',
    ...UIFont.font(fonts.medium, fontSize.xSmall, colors.placeholderColor),
  },
  iconHome: {
    marginHorizontal: 15,
    width: 26,
    height: 26,
  },
});