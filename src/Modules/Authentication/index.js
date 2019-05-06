import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { LoadingView } from "../../ReuseableComponents";
import { updateAppConstants } from "../../AppConstants";
import { setLocale } from "../../Modules/Localization/i18n";
import SplashScreen from "react-native-splash-screen";

class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate();
  }
  authenticate = () => {
    // const keys = Object.keys(AppConstants)
    // const values = Object.values(es)
    // const str = ""
    // keys.map((key,index) =>console.log(key +': ' +JSON.stringify(values[index])+','))
    // keys.map((key,index) =>console.log(key +':' +' translate(' +JSON.stringify(key)+')'+','))
    // values.map((value,index) => console.log(JSON.stringify(value)+','))
    // setLocale(this.props.language);
    if (this.props.language == "") {
      setLocale(this.props.language);
      updateAppConstants();
      if (this.props.user !== null) {
        if (this.props.user.user_type === 1 && this.props.location === null) {
          navigateTo = "LocationScreen";
        } else if (
          this.props.user.user_type === 1 &&
          this.props.location !== null
        ) {
          navigateTo = "CustomerDrawerStack";
        } else {
          navigateTo = "WorkerDrawerStack";
        }
      } else {
        navigateTo = "AuthStack";
      }
    } else {
      navigateTo = "SignIn";
    }
    SplashScreen.hide();
    this.props.navigation.navigate(navigateTo);
  };

  render() {
    return <View />;
  }
}

const mapStateToProp = state => {
  return {
    user: state.signIn.user,
    language: state.signIn.language,
    location: state.signIn.location
  };
};
export default connect(mapStateToProp)(Authentication);

{
  /* <item android:drawable="@color/splashBackground"/>
<item>
<bitmap
  android:src="@drawable/launch_screen"
  android:gravity="fill"/>
</item> */
}
