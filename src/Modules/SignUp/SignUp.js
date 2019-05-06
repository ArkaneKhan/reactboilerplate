import React, { Component } from 'react';
import {
  StyleSheet, Text, View, Image, TouchableOpacity,
  TextInput, ScrollView, FlatList, Platform
} from 'react-native';
import { TextField, Button, LinkButton, UploadImageView, Statusbar } from '../../ReuseableComponents';
import {AppConstants} from '../../AppConstants';
import { heightRatio, widthRatio, Alerts, validateEmail, uploadImage } from '../../utility/utility';
import ActionTypes from '../../Store/Types';
import { Images, UIFont, fonts, fontSize, colors } from '../../Assets';
import { connect } from 'react-redux';
import { signUpChange, signUp } from '../../Store/Action';
import { Spinner } from '../../utility/common';

class SignUp extends Component {

  imageChanged = false;

  _getSignUpDict = () => {
    return (
      dict = [
        {
          type: ActionTypes.SIGNUP_USERNAME_CHANGED,
          keyboardType: "name-phone-pad",
          value: this.props.username,
          placeholder: AppConstants.username,
          secureTextEntry: false,
          lhButton: false
        },
        {
          type: ActionTypes.SIGNUP_EMAIL_CHANGED,
          keyboardType: "email-address",
          value: this.props.email,
          placeholder: AppConstants.email,
          secureTextEntry: false,
          lhButton: false
        },
        {
          type: ActionTypes.SIGNUP_PASSWORD_CHANGED,
          keyboardType: "name-phone-pad",
          value: this.props.password,
          placeholder: AppConstants.password,
          secureTextEntry: true,
          lhButton: true
        },
        {
          type: ActionTypes.SIGNUP_CONFIRMPASSWORD_CHANGED,
          keyboardType: "name-phone-pad",
          value: this.props.confirmPassword,
          placeholder: AppConstants.confirmPassword,
          secureTextEntry: true,
          lhButton: true
        },
      ]
    )
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='always'>
        <Statusbar color={colors.white} contentStyle={'dark-content'} />
        <View style={styles.container}>
          <UploadImageView
            onPress={() => this.showImagePicker()}
            image={this.props.imageUrl === '' ? Images.userImagePlaceholder : { uri: this.props.imageUrl }}
            btnStyle={styles.imgBtnStyle}
          // imgStyle={styles.imgStyle}
          />
          <FlatList
            extraData={this._getSignUpDict()}
            data={this._getSignUpDict()}
            renderItem={({ item }) => this.renderCell(item)}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(item, index) => "" + item.type + index}
          />
          <Button
            onPress={this.signUpPressed}
            title={AppConstants.signUp}
            btnColor={colors.btnBlue}
            txtColor={colors.white} />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.textStyle}>{AppConstants.alreadyHaveAnAccount}</Text>
            <LinkButton
              onPress={() => this.props.navigation.navigate('Signin')}
              title={AppConstants.signIn}
              btnColor={colors.white}
              txtColor={colors.btnBlue}
            />
          </View>
        </View>
        {this.props.loading && <Spinner key='spinner'/>}
      </ScrollView>
    )
  }

  renderCell(item) {
    return (
      <TextField
        onChangeText={(text) => this.props.signUpChange(text, item.type)}
        value={item.value}
        placeholder={item.placeholder}
        secureTextEntry={item.secureTextEntry}
        keyboardType={item.keyboardType}
        txtInputViewStyle={item.type === ActionTypes.SIGNUP_CONFIRMPASSWORD_CHANGED ?
          { marginBottom: 25 } : null}
      />
    );
  }

  signUpPressed = () => {
    if (this.validateData()) {
      const formData = new FormData();
      formData.append('username', this.props.username);
      formData.append('email', this.props.email);
      formData.append('password', this.props.password);
      formData.append('device_type', Platform.OS);
      formData.append('device_token', '12345678');
      if(this.props.imageUrl !== '' && this.imageChanged){
        formData.append('image_url', { uri: this.props.imageUrl, name: "Profile.jpeg", type: 'image/jpeg' });
      }
      this.props.signUp(formData);
    }
  }

  validateData = () => {
    if (this.props.username === '') {
      Alerts(
        AppConstants.alertUsername
      )
      return false;
    } else if (!validateEmail(this.props.email)) {
      Alerts(
        AppConstants.alertEmail
      )
      return false;
    } else if (this.props.password === '') {
      Alerts(
        AppConstants.alertPassword
      )
      return false;
    } else if (this.props.confirmPassword === '') {
      Alerts(
        AppConstants.alertConfirmPassword
      )
      return false;
    }
    else if (this.props.confirmPassword != this.props.password) {
      Alerts(
        AppConstants.alertPasswordNotMatch
      )
      return false;
    }
    return true;
  }

  showImagePicker = () => {
    uploadImage().then((res) => {
      this.imageChanged = true
      this.props.signUpChange(res, ActionTypes.SIGNUP_IMAGE_CHANGED)
      // this.setState({ image_url: res })
    });
  }
}

const mapStateToProp = state => {
  return {
    username: state.signUp.username,
    email: state.signUp.email,
    password: state.signUp.password,
    confirmPassword: state.signUp.confirmPassword,
    imageUrl: state.signUp.imageUrl,
    loading: state.signUp.loading,
  };
};

export default connect(mapStateToProp,
  {
    signUpChange,
    signUp
  }
)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 40,
    marginLeft: 40,
  },
  imgBtnStyle: {
    marginTop: heightRatio(250),
    marginBottom: heightRatio(150),
    alignSelf: 'center'
  },
  // imgStyle: {
  //   width: widthRatio(400),
  //   height: heightRatio(400),
  // },
  buttonSignIn: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginBottom: 15,
    // marginTop: 15,
  },
  textSignUp: {
    padding: 10,
    color: '#656565',
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 15
  },
  textStyle: {
    alignSelf: 'center',
    color: colors.black,
    marginBottom: 10,
    marginRight: 5,
    ...UIFont.font(fonts.regular, fontSize.medium, colors.black)
  }

})