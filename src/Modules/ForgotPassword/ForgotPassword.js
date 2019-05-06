import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, ScrollView } from 'react-native';
import {AppConstants} from '../../AppConstants';
import { heightRatio, widthRatio, Alerts, validateEmail } from '../../utility/utility';
import { Images, UIFont, fonts, fontSize, colors } from '../../Assets';
import { forgotChange, forgot } from '../../Store/Action';
import { connect } from 'react-redux';
import { Button, LinkButton, Statusbar, TextField } from '../../ReuseableComponents';
import { Spinner } from '../../utility/common';
class ForgotPassword extends Component {

  render() {
    return (
      <ImageBackground source={Images.bg} style={styles.bgImage}>
        <Statusbar color={colors.transparent} contentStyle={'dark-content'} />
        <View style={styles.container}>
          <TextField
            onChangeText={(text) => this.props.forgotChange(text)}
            value={this.props.email}
            placeholder={AppConstants.email}
            secureTextEntry={false}
          />
          <Button
            onPress={this.onPress}
            title={AppConstants.submit}
            btnColor={colors.btnBlue}
            txtColor={colors.white} />
        </View>
        {this.props.loading && <Spinner key='spinner'/>}
      </ImageBackground>
    );
  }

  onPress = () => {
    if (!validateEmail(this.props.email)) {
      Alerts(
        AppConstants.alertEmail
      )
    }else{
      this.props.forgot(this.props.email)
    }
  }

}

const mapStateToProp = state => {
  return {
    email: state.forgot.email,
    loading : state.forgot.loading,
  };
};
export default connect(mapStateToProp,
  {
    forgotChange,
    forgot
  }
)(ForgotPassword);

const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  container: {
    marginHorizontal: 40
  }
})
