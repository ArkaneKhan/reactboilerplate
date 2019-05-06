import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  ScrollView,
  FlatList
} from "react-native";
import PropTypes from "prop-types";
import DrawerTopHeader from "../../ReuseableComponents/DrawerTopHeader";
import { HighlightedRoundView } from "../../ReuseableComponents";
import { AppConstants } from "../../AppConstants";
import { WorkerDrawerRoutes, CustomerDrawerRoutes } from "./DrawerRoutes";
import { DrawerItems } from "react-navigation";
import { connect } from "react-redux";
import { logout, setCompanyDetails } from "../../Store/Action";
import { Images, UIFont, fonts, fontSize, colors, css } from "../../Assets";
// import { LoginManager } from 'react-native-fbsdk'
// import { GoogleSignin } from 'react-native-google-signin';
import { widthRatio } from "../../utility/utility";

class Sidebar extends Component {
  state = {
    isActiveId: "1",
    routes:
      this.props.user.user_type === 1
        ? [
            {
              id: "1",
              title: AppConstants.home,
              route: "CustomerHomeStack",
              lhsImage: Images.icHome,
              IsActive: true
            },
            {
              id: "2",
              title: AppConstants.myBookings,
              route: "MyBookings",
              lhsImage: Images.icMyBookings,
              IsActive: false
            },
            {
              id: "3",
              title: AppConstants.rateApplication,
              route: "RateApplication",
              lhsImage: Images.icStar,
              IsActive: false
            },
            {
              id: "4",
              title: AppConstants.inviteFriends,
              route: "InviteFriends",
              lhsImage: Images.icInviteFriends,
              IsActive: false
            },
            {
              id: "5",
              title: AppConstants.notifications,
              route: "CustomerNotificationScreen",
              lhsImage: Images.icNotification,
              IsActive: false
            },
            {
              id: "6",
              title: AppConstants.settings,
              route: "CustomerSettingStack",
              lhsImage: Images.icSettings,
              IsActive: false
            },
            {
              id: "7",
              title: AppConstants.logout,
              route: "",
              lhsImage: Images.icLogout,
              IsActive: false
            }
          ]
        : [
            {
              id: "1",
              title: AppConstants.myJobs,
              route: "WorkerHomeStack",
              lhsImage: Images.icMyJobs,
              IsActive: true
            },
            {
              id: "2",
              title: AppConstants.componayProfile,
              route: "WorkerCompanyProfileStack",
              lhsImage: Images.icProfile,
              IsActive: false
            },
            {
              id: "3",
              title: AppConstants.notifications,
              route: "WorkerNotificationScreen",
              lhsImage: Images.icNotification,
              IsActive: false
            },
            {
              id: "4",
              title: AppConstants.settings,
              route: "WorkerSettingStack",
              lhsImage: Images.icSettings,
              IsActive: false
            },
            {
              id: "5",
              title: AppConstants.logout,
              route: "",
              lhsImage: Images.icLogout,
              IsActive: false
            }
          ]
  };

  render() {
    return (
      <ImageBackground source={Images.drawer_bg} style={styles.bgImage}>
        <ScrollView>
          {this.props.user && (
            <DrawerTopHeader
              user={this.props.user}
              onPress={this.onProfilePress}
            />
          )}
          <View style={styles.screensView}>
            <FlatList
              extraData={this.state}
              data={this.state.routes}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => "" + item.title + index}
              renderItem={({ item }) => this._renderItems(item)}
            />
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  onProfilePress = () => {
    this.props.navigation.navigate("ProfileStack", {
      userType: this.props.user.user_type
    });
  };

  _renderItems = item => {
    return (
      <View style={{ flexDirection: "row" }}>
        <HighlightedRoundView
          backgroundColor={
            this.state.isActiveId === item.id
              ? "rgba(52, 52, 52, 0.2)"
              : "transparent"
          }
          title={item.title}
          lhsImage={item.lhsImage}
          onPress={() => this.onItemPress(item)}
          badgeValue={item.title === AppConstants.notifications ? 12 : null}
        />
      </View>
    );
  };

  onItemPress(item) {
    this.setState({ isActiveId: item.id });
    this.props.navigation.closeDrawer();
    if (item.title === AppConstants.componayProfile) {
      this.props.setCompanyDetails(
        this.props.user.company_id,
        "WorkerCompanyProfileStack"
      );
    } else if (
      item.title === AppConstants.notifications ||
      item.title === AppConstants.settings
    ) {
      this.props.navigation.navigate(item.route);
    } else if (item.title === AppConstants.logout) {
      if (this.props.user.platform_type === "facebook") {
        this.fbSignout();
      } else if (this.props.user.platform_type === "google") {
        this.googleSignOut();
      } else {
        this.props.logout();
      }
    } else {
      this.props.navigation.navigate(item.route);
    }
  }

  // googleSignOut = async () => {
  //   try {
  //     const isSignedIn = await GoogleSignin.isSignedIn();
  //     if (isSignedIn) {
  //       await GoogleSignin.revokeAccess();
  //       await GoogleSignin.signOut();
  //       this.props.logout()
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // fbSignout = async () => {
  //   try {
  //     await LoginManager.logOut();
  //     this.props.logout()
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  DrawerContentTypes = {
    navigation: PropTypes.object
  };
}

const mapStateToProp = state => {
  return {
    userType: state.signIn.userType,
    user: state.signIn.user
  };
};
export default connect(
  mapStateToProp,
  { logout, setCompanyDetails }
)(Sidebar);

const styles = StyleSheet.create({
  bgImage: {
    height: "100%",
    width: widthRatio(780)
  },
  screensView: {
    alignSelf: "flex-start",
    marginVertical: 20,
    marginHorizontal: 8
  }
});
