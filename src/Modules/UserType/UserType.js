import React, { Component } from 'react';
import {
  StyleSheet,Text,View,Image,TouchableOpacity,TextInput,
  ImageBackground,
} from 'react-native';
import {Images,colors} from '../../Assets';
import {AppConstants} from '../../AppConstants';
import {Statusbar,Button} from '../../ReuseableComponents';
import {setUserType} from '../../Store/Action';
import { connect } from 'react-redux';

class UserType extends Component {

  componentDidMount() {
    if (this.props.user !== null) {
      const navigateTo = this.props.userType === AppConstants.customer ? 'CustomerDrawerStack' : 'WorkerDrawerStack'
      this.props.navigation.navigate(navigateTo)
    }
  }

  render() {
    return (
      <ImageBackground source={Images.splash} style={styles.bgImage}>
        <Statusbar color={'transparent'} contentStyle={"dark-content"}/>
        <View style={styles.btnContainer}>
          <Button
            onPress={() => this.props.setUserType(AppConstants.customer)}
            title={AppConstants.customer}
            btnColor={colors.btnBlue}
            txtColor={colors.white} />
          <Button
            onPress={() => this.props.setUserType(AppConstants.worker)}
            title={AppConstants.worker}
            btnColor={colors.btnGrey}
            txtColor={colors.white} />
        </View>
      </ImageBackground>
    );
  }
}

const mapStateToProp = state => {
  return {
    userType: state.signIn.userType,
    user: state.signIn.user,
  };
};
export default connect(mapStateToProp,
  {
    setUserType
  }
)(UserType);

const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
  },
  btnContainer: {
    marginRight: 30,
    marginLeft: 30,
    marginBottom: 25,
  }
});
