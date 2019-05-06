import React from "react";
import {
  Image,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  Platform
} from "react-native";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator,
  DrawerActions
} from "react-navigation";
import SignUp from "./Modules/SignUp/SignUp";
import SignIn from "./Modules/SignIn/SignIn";
import Requests from "./Modules/Worker/Requests/Requests";
import Todo from "./Modules/Worker/Todo/Todo";
import UserProfile from "./Modules/UserProfile/UserProfile";
import Done from "./Modules/Worker/Done/Done";
import ForgotPassword from "./Modules/ForgotPassword/ForgotPassword";
import OnGoing from "./Modules/Worker/OnGoing/OnGoing";
// import CompanyProfile from "./Modules/CompanyProfile/CompanyProfile";
import Settings from "./Modules/Settings/Settings";
import Language from "./Modules/Language/Language";
import ChangeLanguage from "./Modules/Language/ChangeLanguage";
import Notifications from "./Modules/Notifications/Notifications";
import UserType from "./Modules/UserType/UserType";
import Sidebar from "./Modules/Drawer";
import { heightRatio, widthRatio } from "./utility/utility";
import { Images, UIFont, fonts, fontSize, colors } from "./Assets";
import { AppConstants } from "./AppConstants";
import JobsDetails from "./Modules/Worker/JobsDetails/JobsDetails";
import Home from "./Modules/Customer/Home/Home";
// import ServiceDetails from "./Modules/CompanyProfile/ServiceDetails";
import { Header } from "./ReuseableComponents";
import MyBookings from "./Modules/Customer/MyBookings/MyBookings";
import RateApplication from "./Modules/Customer/RateApplication/RateApplication";
import InviteFriends from "./Modules/Customer/InviteFriends/InviteFriends";
import EditProfile from "./Modules/EditProfile/EditProfile";
import ChangePassword from "./Modules/ChangePassoword/ChangePassword";
import Authentication from "./Modules/Authentication";
import Map from "./Modules/Customer/Map/Map";
import AddLocation from "./Modules/Customer/AddLocation/AddLocation";
// import ScheduleSummary from "./Modules/CompanyProfile/ScheduleSummary";

//=============================================
//Signup , Signin And Forgot Password Screens
//=============================================
const LoginSignupStack = createStackNavigator(
  {
    Signin: {
      screen: SignIn,
      navigationOptions: ({ navigation }) => {
        return {
          headerTransparent: true,
          gesturesEnabled: false
        };
      }
    },
    Signup: {
      screen: SignUp,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    },
    Forgot: {
      screen: ForgotPassword,
      navigationOptions: ({ navigation }) => ({
        headerTransparent: true,
        gesturesEnabled: false,
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image
              style={{
                width: 26,
                height: 26,
                marginLeft: 25,
                tintColor: colors.lightBlack
              }}
              source={Images.icBack}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )
      })
    }
  },
  {
    initialRouteName: "Signin"
  }
);

//=============================================
//Worker Tab Screens Navigator
//=============================================
const WorkerHomeTabNavigator = createMaterialTopTabNavigator(
  {
    Request: {
      screen: Requests,
      navigationOptions: ({ navigation }) => ({
        title: AppConstants.requests
      })
    },
    Todo: {
      screen: Todo,
      navigationOptions: ({ navigation }) => ({
        title: AppConstants.todo
      })
    },
    OnGoing: {
      screen: OnGoing,
      navigationOptions: ({ navigation }) => ({
        title: AppConstants.onGoing
      })
    },
    Done: {
      screen: Done,
      navigationOptions: ({ navigation }) => ({
        title: AppConstants.done
      })
    }
  },
  {
    lazy: false,
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: colors.btnBlue,
      inactiveTintColor: colors.btnGrey,
      upperCaseLabel: false,
      style: {
        backgroundColor: colors.white
      },
      indicatorStyle: {
        backgroundColor: colors.btnBlue
      }
    }
  }
);

//=============================================
//Worker Home Screen Stack Navigator
//=============================================
const WorkerHomeScreensStack = createStackNavigator(
  {
    WorkerHome: {
      screen: WorkerHomeTabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerMode: "float",
          gesturesEnabled: false,
          headerTitle: AppConstants.myJobs,
          headerTitleStyle: { color: colors.white },
          headerStyle: { backgroundColor: colors.themeColor },
          headerLeft: (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Image style={styles.iconHome} source={Images.icMenu} />
            </TouchableOpacity>
          )
        };
      }
    },
    WorkerDetailScreen: {
      screen: JobsDetails,
      navigationOptions: ({ navigation }) => {
        return {
          gesturesEnabled: false,
          headerTitle: AppConstants.details,
          headerTitleStyle: { color: colors.white },
          headerStyle: { backgroundColor: colors.themeColor },
          headerLeft: (
            <TouchableOpacity onPress={() => navigation.pop()}>
              <Image
                style={styles.iconHome}
                resizeMode="contain"
                source={Images.icBack}
              />
            </TouchableOpacity>
          )
        };
      }
    }
  },
  {
    headerLayoutPreset: "center",
    gesturesEnabled: false
  }
);

//=============================================
//Worker Company Profile Stack Navigator
//=============================================

//=============================================
//Profile Stack Navigator
//=============================================
const ProfileStack = createStackNavigator(
  {
    UserProfile: {
      screen: UserProfile,
      navigationOptions: ({ navigation }) => {
        return {
          gesturesEnabled: false,
          headerTitle: AppConstants.profile
        };
      }
    },
    EditProfile: {
      screen: EditProfile,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        headerTitle: AppConstants.editProfile
      })
    }
  },
  {
    headerLayoutPreset: "center"
  }
);

//=============================================
//Setting Screen Stack
//=============================================
const SettingStack = createStackNavigator(
  {
    Setting: {
      screen: Settings,
      navigationOptions: ({ navigation }) => ({
        headerTitle: AppConstants.settings
      })
    },
    ChangePassword: {
      screen: ChangePassword,
      navigationOptions: ({ navigation }) => ({
        headerTitle: AppConstants.changePassword
      })
    },
    ChangeLanguage: {
      screen: ChangeLanguage,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        headerTitle: AppConstants.language
      })
    }
  },
  {
    gesturesEnabled: false,
    headerLayoutPreset: "center"
  }
);

//=============================================
//Worker Drawer Screens
//=============================================
const WorkerDrawerScreenStack = createStackNavigator(
  {
    WorkerHomeStack: {
      screen: WorkerHomeScreensStack,
      navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
      })
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: () => ({
        header: null,
        headerLayoutPreset: "center",
        gesturesEnabled: false
      })
    },

    WorkerNotificationScreen: {
      screen: Notifications,
      navigationOptions: () => ({
        gesturesEnabled: false,
        headerTitle: AppConstants.notifications
        // headerTitleStyle: { color: colors.white },
      })
    },
    WorkerSettingStack: {
      screen: SettingStack,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    headerMode: "float",
    headerLayoutPreset: "center",
    gesturesEnabled: false,
    defaultNavigationOptions: ({ navigation }) => {
      return {
        // headerStyle: { backgroundColor: colors.themeColor },
        headerLayoutPreset: "center",
        headerLeft: (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Image
              style={styles.iconHome}
              resizeMode="contain"
              source={Images.icMenu}
            />
          </TouchableOpacity>
        )
      };
    },
    initialRouteName: "WorkerHomeStack"
  }
);

//=============================================
//Customer Company Profile Stack Navigator
//=============================================

//=============================================
//Customer Home Screen Stack
//=============================================
const CustomerHomeStack = createStackNavigator(
  {
    CustomerHomeScreen: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          gesturesEnabled: false,
          headerTitle: (
            <Header
              title={
                navigation.state.params
                  ? navigation.state.params.address
                  : AppConstants.currentLocation
              }
            />
          ),
          headerLeft: (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            >
              <Image
                style={[styles.iconHome, { tintColor: colors.lightBlack }]}
                resizeMode="contain"
                source={Images.icMenu}
              />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: colors.lightGrey,
            borderBottomWidth: 0,
            elevation: 0
          },
          headerRight: (
            <TouchableOpacity
              onPress={() =>
                navigation.state.params.setServiceProvidersForMap()
              }
            >
              <Image
                style={[styles.iconHome, { marginLeft: 15, marginRight: 15 }]}
                resizeMode="contain"
                source={Images.icLocationPurple}
              />
            </TouchableOpacity>
          )
        };
      }
    },

    Map: {
      screen: Map,
      navigationOptions: ({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.white,
          borderBottomWidth: 0,
          elevation: 0
        },
        headerTitle: AppConstants.map,
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.pop()}>
            <Image
              style={[styles.iconHome, { tintColor: colors.lightBlack }]}
              resizeMode="contain"
              source={Images.icBack}
            />
          </TouchableOpacity>
        ),
        gesturesEnabled: false
      })
    }
  },
  {
    headerLayoutPreset: "center",
    gesturesEnabled: false
  }
);

//=============================================
//Customer Drawer Screens
//=============================================
const CustomerDrawerScreenStack = createStackNavigator(
  {
    CustomerHomeStack: {
      screen: CustomerHomeStack,
      navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
      })
    },
    MyBookings: {
      screen: MyBookings,
      navigationOptions: () => ({
        headerTitle: AppConstants.myBookings,
        headerTitleStyle: { color: colors.lightBlack },
        gesturesEnabled: false
      })
    },
    ProfileStack: {
      screen: ProfileStack,
      navigationOptions: () => ({
        header: null,
        gesturesEnabled: false
      })
    },
    RateApplication: {
      screen: RateApplication,
      navigationOptions: () => ({
        headerTitle: AppConstants.rateApplication,
        headerTitleStyle: { color: colors.lightBlack },
        gesturesEnabled: false
      })
    },
    InviteFriends: {
      screen: InviteFriends,
      navigationOptions: () => ({
        headerTitle: AppConstants.inviteFriends,
        headerTitleStyle: { color: colors.lightBlack },
        gesturesEnabled: false
      })
    },
    CustomerNotificationScreen: {
      screen: Notifications,
      navigationOptions: () => ({
        headerTitle: AppConstants.notifications,
        headerTitleStyle: { color: colors.lightBlack },
        gesturesEnabled: false
      })
    },
    CustomerSettingStack: {
      screen: SettingStack,
      navigationOptions: () => ({
        header: null
      })
    }
  },
  {
    headerMode: "float",
    headerLayoutPreset: "center",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        gesturesEnabled: false,
        headerStyle: {
          backgroundColor: colors.white,
          elevation: 0,
          borderBottomWidth: 0
        },
        headerLeft: (
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          >
            <Image
              style={[styles.iconHome, { tintColor: colors.lightBlack }]}
              resizeMode="contain"
              source={Images.icMenu}
            />
          </TouchableOpacity>
        )
      };
    },
    initialRouteName: "CustomerHomeStack"
  }
);

//===========================================
//Worker Drawer Navigator
//===========================================
const WorkerDrawerStack = createDrawerNavigator(
  {
    WorkerDrawerStack: { screen: WorkerDrawerScreenStack }
  },
  {
    contentComponent: props => <Sidebar {...props} />,
    drawerWidth: widthRatio(780),
    drawerLockMode: "locked-closed",
    drawerPosition: "left",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    headerMode: "screen",
    headerMode: "float",
    gesturesEnabled: false,
    hideStatusBar: true,
    drawerType: "slide"
  }
);

//===========================================
//Customer Drawer Navigator
//===========================================
const CustomerDrawerStack = createDrawerNavigator(
  {
    CustomerDrawerStack: { screen: CustomerDrawerScreenStack }
  },
  {
    contentComponent: props => <Sidebar {...props} />,
    drawerWidth: widthRatio(780),
    drawerLockMode: "locked-closed",
    drawerPosition: "left",
    drawerOpenRoute: "DrawerOpen",
    drawerCloseRoute: "DrawerClose",
    drawerToggleRoute: "DrawerToggle",
    headerMode: "screen",
    headerMode: "float",
    gesturesEnabled: false,
    hideStatusBar: true,
    drawerType: "slide"
  }
);

//===========================================
//AppAllNavigation
//===========================================
const AppNavigator = createSwitchNavigator(
  {
    Authentication: {
      screen: Authentication,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    },
    Language: {
      screen: Language,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    },
    LocationScreen: {
      screen: AddLocation
    },
    AuthStack: {
      screen: LoginSignupStack
    },
    WorkerDrawerStack: {
      screen: WorkerDrawerStack,
      navigationOptions: ({ navigation }) => {
        return {
          headerLayoutPreset: "center"
        };
      }
    },
    CustomerDrawerStack: {
      screen: CustomerDrawerStack,
      navigationOptions: ({ navigation }) => {
        return {
          headerLayoutPreset: "center"
        };
      }
    }
  },
  {
    initialRouteName: "Authentication"
  }
);

export const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  iconHome: {
    marginHorizontal: 15,
    width: 26,
    height: 26
  }
});
