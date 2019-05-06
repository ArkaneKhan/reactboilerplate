import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AppConstants } from '../../AppConstants';
import { Images, UIFont, fonts, fontSize, colors, headerStyle } from '../../Assets';
import { Statusbar, TextField, Button } from '../../ReuseableComponents';
import { widthRatio, heightRatio, Alerts } from '../../utility/utility';
import ActionTypes from '../../Store/Types';
import { changePasswordChange, changePassword } from '../../Store/Action';
import { connect } from 'react-redux';
import { Spinner } from '../../utility/common';

let navStyle = '';

class ChangePassword extends Component {

  static navigationOptions = ({ navigation }) => {
    navStyle = headerStyle(navigation.getParam('userType', null))
    return {
      headerStyle: { backgroundColor: navStyle.backgroundColor, borderBottomWidth: 0, elevation: 0 },
      headerTitleStyle: { color: navStyle.color },
      headerLeft: (
        <TouchableOpacity
          onPress={() => navigation.pop()}>
          <Image style={[styles.iconHome, { tintColor: navStyle.color }]} resizeMode='contain' source={Images.icBack} />
        </TouchableOpacity>
      ),
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Statusbar color={navStyle.backgroundColor} contentStyle={navStyle.contentStyle} />
        <View style={styles.textViewContainer}>
          <TextField
            onChangeText={(text) => this.props.changePasswordChange(text, ActionTypes.CURRENT_PASSWORD_CHANGED)}
            value={this.props.currentPassword}
            placeholder={AppConstants.currentPassword}
            secureTextEntry={true}
          />
          <TextField
            onChangeText={(text) => this.props.changePasswordChange(text, ActionTypes.NEW_PASSWORD_CHANGED)}
            value={this.props.newPassword}
            placeholder={AppConstants.newPassword}
            secureTextEntry={true}
          />
          <TextField
            onChangeText={(text) => this.props.changePasswordChange(text, ActionTypes.CONFIRM_PASSWORD_CHANGED)}
            value={this.props.confirmPassword}
            placeholder={AppConstants.confirmPassword}
            secureTextEntry={true}
            txtInputViewStyle={{ marginBottom: 25 }}
          />
          <Button
            onPress={this.onSavePressed}
            title={AppConstants.changePassword}
            btnColor={colors.btnBlue}
            txtColor={colors.white} />
        </View>
        {this.props.loading && <Spinner key='spinner' />}
      </View>
    );
  }

  onSavePressed = () => {
    if (this.validateData()) {
      let reqData = {
        old_password: this.props.currentPassword,
        new_password: this.props.newPassword,
        // password_confirmation: this.props.confirmPassword,
      }
      this.props.changePassword(reqData);
    }
  };

  validateData = () => {
    if (this.props.currentPassword === '') {
      Alerts(
        AppConstants.alertCurrentPassword
      )
      return false;
    } else if (this.props.newPassword === '') {
      Alerts(
        AppConstants.alertNewPassword
      )
      return false;
    }
    else if (this.props.confirmPassword === '') {
      Alerts(
        AppConstants.alertConfirmPassword
      )
      return false;
    }
    else if (this.props.confirmPassword !== this.props.newPassword) {
      Alerts(
        AppConstants.alertNewPasswordNotMatch
      )
      return false;
    }
    return true;
  }
}

const mapStateToProp = state => {

  return {
    currentPassword: state.changePassword.currentPassword,
    newPassword: state.changePassword.newPassword,
    confirmPassword: state.changePassword.confirmPassword,
    loading: state.changePassword.loading,
    success: state.changePassword.success,
    error: state.changePassword.error,
  };
};
export default connect(mapStateToProp,
  {
    changePasswordChange,
    changePassword,
  }
)(ChangePassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGrey,
  },
  textViewContainer: {
    flex: 1,
    marginTop: 25,
    marginHorizontal: 25,
  },
  iconHome: {
    marginHorizontal: 15,
    width: 26,
    height: 26,
  },
})

