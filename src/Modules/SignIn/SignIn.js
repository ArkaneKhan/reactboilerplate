import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform
} from "react-native";
import { AppConstants } from "../../AppConstants";
import {
  heightRatio,
  widthRatio,
  Alerts,
  validateEmail
} from "../../utility/utility";
import { Spinner } from "../../utility/common";
import { Images, UIFont, fonts, fontSize, colors } from "../../Assets";
import {
  signInChange,
  signIn,
  resetSignInSignUp,
  resetSignInForgot,
  socialLogin
} from "../../Store/Action";
import { connect } from "react-redux";
import ActionTypes from "../../Store/Types";
//import { GoogleSignin, statusCodes } from "react-native-google-signin";
// import {
//   LoginManager,
//   AccessToken,
//   GraphRequest,
//   GraphRequestManager,
//   LoginBehaviorAndroid
//} from "react-native-fbsdk";
import {
  Button,
  LinkButton,
  Statusbar,
  TextField
} from "../../ReuseableComponents";
import SplashScreen from "react-native-splash-screen";

class SignIn extends Component {
  componentDidMount() {
    SplashScreen.hide();
    // GoogleSignin.configure({
    //   iosClientId:
    //     "836933833246-agp54lgouugt595u99llki31l8tt0mdf.apps.googleusercontent.com",
    //   webClientId:
    //     "836933833246-midhmbccb98tboa9sf99latsqn5dmj0i.apps.googleusercontent.com"
    // });
  }

  render() {
    return (
      <ImageBackground source={Images.bg} style={styles.bgImage}>
        <Statusbar color={colors.transparent} contentStyle={"dark-content"} />
        <ScrollView keyboardShouldPersistTaps="always">
          <Text style={[styles.textStyle, { marginTop: heightRatio(100) }]}>
            {AppConstants.pleaseSignInToContinue}
          </Text>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.contentContainer}>
            <TextField
              onChangeText={text =>
                this.props.signInChange(text, ActionTypes.SIGNIN_EMAIL_CHANGED)
              }
              value={this.props.email}
              placeholder={AppConstants.email}
              secureTextEntry={false}
            />
            <TextField
              onChangeText={text =>
                this.props.signInChange(
                  text,
                  ActionTypes.SIGNIN_PASSWORD_CHANGED
                )
              }
              value={this.props.password}
              placeholder={AppConstants.password}
              secureTextEntry={true}
              onForgotPress={this.onForgotPress}
              txtInputViewStyle={{ marginBottom: 25 }}
            />
            <Button
              onPress={this.signInPressed}
              title={AppConstants.signIn}
              btnColor={colors.btnBlue}
              txtColor={colors.white}
            />
            <View style={styles.orContainer}>
              <View
                style={{ height: 1, flex: 1, backgroundColor: "#ecf1f6" }}
              />
              <Text style={styles.ortext}>{AppConstants.or}</Text>
              <View
                style={{ height: 1, flex: 1, backgroundColor: "#ecf1f6" }}
              />
            </View>
            <View style={styles.soicalicon}>
              <View style={{ width: "50%", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={
                    () => alert("Facebook")
                    //this.FbLogin
                  }
                >
                  <Image
                    style={styles.icFb}
                    resizeMode="contain"
                    source={Images.icFb}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ width: "50%", alignItems: "center" }}>
                <TouchableOpacity
                  onPress={
                    () => alert("Google")
                    //this.googleLogin
                  }
                >
                  <Image
                    style={styles.icFb}
                    resizeMode="contain"
                    source={Images.icGoogle}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {/* <Button
              // onPress={}
              title={AppConstants.loginWithSocialMedia}
              btnColor={colors.btnGrey}
              txtColor={colors.white} /> */}
            {/* <View style={{ width: '50%', alignItems: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={this.googleLogin}>
                <Text>google</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.FbLogin}>
                <Text>facebook</Text>
              </TouchableOpacity>
            </View> */}

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={styles.textStyle}>
                {AppConstants.dontHaveAnAccount}
              </Text>
              <LinkButton
                onPress={this.signUpPressed}
                title={AppConstants.signUp}
                btnColor={colors.transparent}
                txtColor={colors.btnBlue}
              />
            </View>
          </View>
          {this.props.loading && <Spinner key="spinner" />}
        </ScrollView>
      </ImageBackground>
    );
  }

  signInPressed = () => {
    const { email, password } = this.props;
    if (this.validateData()) {
      // alert("Singin");
      this.props.signIn({ email, password });
    }
  };

  // googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log(userInfo);
  //     let data = {
  //       'name': userInfo.user.name,
  //       'email': userInfo.user.email,
  //       'image_url': userInfo.user.photo,
  //       'social_id': userInfo.user.id,
  //       'platform_id': '123456',
  //       'platform_type': 'google_plus',
  //       'device_type': Platform.OS,
  //       'device_token': '32432243',
  //     }
  //     this.props.socialLogin(data);
  //   } catch (error) {

  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log('user cancelled the login flow');
  //       // user cancelled the login flow
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log('operation (f.e. sign in) is in progress already');
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log(' play services not available or outdated');

  //       // this.props.fbLoginFailed('Play services not available or outdated');

  //       // play services not available or outdated
  //     } else {
  //       console.log(error);
  //       console.log(' some other error happened');
  //       // some other error happened
  //     }
  //   }
  // }

  // FbLogin = () => {
  //   LoginManager.LoginBehaviorAndroid = 'web_only'
  //   LoginManager.loginBehaviorIOS = 'system_account'
  //   LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
  //     (result) => {
  //       console.log("result: ", result);
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         // this.props.fbLogin();
  //         AccessToken.getCurrentAccessToken().then((data) => {
  //           console.log('Login success with permissions: '
  //             + data.accessToken.toString());

  //           let accessToken = data.accessToken
  //           const responseInfoCallback = (error, result) => {
  //             if (error) {
  //               // this.props.fbLoginFailed(error.toString());
  //               console.log(error)
  //               //alert('Error fetching data: ' + error.toString());
  //             } else {
  //               console.log(result)

  //               let data = {
  //                 'social_id': result.id,
  //                 'platform_type': 'facebook',
  //                 'device_type': Platform.OS,
  //                 'device_token': '32432243',
  //                 'platform_id': '123456',
  //                 'name': result.name,
  //                 'email': result.email,
  //                 'image_url': result.picture.data.url,
  //               }
  //               this.props.socialLogin(data);
  //               //alert('Success fetching data: ' + result.toString());
  //             }
  //           }
  //           const infoRequest = new GraphRequest(
  //             '/me',
  //             {
  //               accessToken: accessToken,
  //               parameters: {
  //                 fields: {
  //                   string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
  //                 }
  //               }
  //             },
  //             responseInfoCallback
  //           );
  //           // Start the graph request.
  //           new GraphRequestManager().addRequest(infoRequest).start()
  //         })
  //       }
  //     },
  //     (error) => {
  //       console.log('Login fail with error: ' + error);
  //     }
  //   );
  // }

  validateData = () => {
    const { email, password } = this.props;
    if (!validateEmail(email)) {
      Alerts(AppConstants.alertEmail);
      return false;
    } else if (password === "") {
      Alerts(AppConstants.alertPassword);
      return false;
    }
    return true;
  };

  signUpPressed = () => {
    this.props.resetSignInSignUp();
    this.props.navigation.navigate("Signup");
  };

  onForgotPress = () => {
    this.props.resetSignInForgot();
    this.props.navigation.navigate("Forgot");
  };
}

const mapStateToProp = state => {
  return {
    userType: state.signIn.userType,
    user: state.signIn.user,
    email: state.signIn.email,
    password: state.signIn.password,
    loading: state.signIn.loading
  };
};
export default connect(
  mapStateToProp,
  {
    signInChange,
    signIn,
    resetSignInSignUp,
    resetSignInForgot,
    socialLogin
  }
)(SignIn);

const styles = StyleSheet.create({
  bgImage: {
    height: "100%",
    width: "100%"
  },
  logo: {
    height: heightRatio(634),
    width: widthRatio(724),
    alignSelf: "center",
    marginTop: heightRatio(65)
  },
  contentContainer: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: heightRatio(87)
  },
  textStyle: {
    alignSelf: "center",
    color: colors.black,
    fontSize: 16,
    marginBottom: 10,
    marginRight: 5,
    ...UIFont.font(fonts.regular, fontSize.medium, colors.black)
  },
  icFb: {
    width: heightRatio(120),
    height: heightRatio(120)
  },
  soicalicon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: heightRatio(50)
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch"
  }
});
