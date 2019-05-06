import React, { Component } from 'react';
import { Text, View, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import { TextField, Button, LinkButton, UploadImageView, Statusbar } from '../../ReuseableComponents';
import { AppConstants } from '../../AppConstants';
import { heightRatio, widthRatio, Alerts, validateEmail, uploadImage } from '../../utility/utility';
import ActionTypes from '../../Store/Types';
import { Images, UIFont, fonts, fontSize, colors, headerStyle } from '../../Assets';
import { connect } from 'react-redux';
import { editChange, updateUser } from '../../Store/Action';
import constant from '../../HttpServiceManager/constant';
import { Spinner } from '../../utility/common';

let navStyle = '';

class EditProfile extends Component {

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

  imageChanged = false;

  _getEditDict = () => {
    return (
      dict = [
        {
          type: ActionTypes.EDIT_USERNAME_CHANGED,
          keyboardType: "name-phone-pad",
          value: this.props.username,
          placeholder: AppConstants.username,
          secureTextEntry: false,
          lhButton: false
        },
        {
          type: ActionTypes.EDIT_PHONENO_CHANGED,
          keyboardType: "phone-pad",
          value: this.props.mobile_no,
          placeholder: AppConstants.phoneNumber,
          secureTextEntry: false,
          lhButton: false
        },
      ]
    )
  }

  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='always'>
        <Statusbar color={navStyle.backgroundColor} contentStyle={navStyle.contentStyle} />
        <View style={styles.container}>
          <UploadImageView
            onPress={() => this.showImagePicker()}
            image={this.props.imageUrl === '' ?
              Images.userImagePlaceholder : { uri: this.imageChanged ? this.props.imageUrl : constant.baseImageURL + this.props.imageUrl }}
            btnStyle={styles.imgBtnStyle}
          />
          <FlatList
            extraData={this._getEditDict()}
            data={this._getEditDict()}
            renderItem={({ item }) => this.renderCell(item)}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            keyExtractor={(item, index) => "" + item.type + index}
          />
          <Button
            onPress={this.savePressed}
            title={AppConstants.save}
            btnColor={colors.btnBlue}
            txtColor={colors.white} />
        </View>
        {this.props.loading && <Spinner key='spinner' />}
      </ScrollView>
    )
  }

  renderCell(item) {
    return (
      <TextField
        onChangeText={(text) => this.props.editChange(text, item.type)}
        value={item.value}
        placeholder={item.placeholder}
        secureTextEntry={item.secureTextEntry}
        keyboardType={item.keyboardType}
        txtInputViewStyle={item.type === ActionTypes.EDIT_PHONENO_CHANGED ?
          { marginBottom: 25 } : null}
      />
    );
  }

  savePressed = () => {
    if (this.validateData()) {
      const formData = new FormData();
      formData.append('username', this.props.username);
      formData.append('mobile_no', this.props.mobile_no);
      if (this.props.imageUrl !== '' && this.imageChanged) {
        formData.append('image_url', { uri: this.props.imageUrl, name: "Profile.jpeg", type: 'image/jpeg' });
      }
      this.props.updateUser(formData);
    }
  }

  validateData = () => {
    if (this.props.username === '') {
      Alerts(
        AppConstants.alertUsername
      )
      return false;
    } else if (this.props.mobile_no === '') {
      Alerts(
        AppConstants.alertPhoneNo
      )
      return false;
    }
    return true;
  }

  showImagePicker = () => {
    uploadImage().then((res) => {
      this.imageChanged = true
      this.props.editChange(res, ActionTypes.EDIT_IMAGE_CHANGED)
    });
  }
}

const mapStateToProp = state => {
  return {
    username: state.edit.user.username,
    mobile_no: state.edit.user.mobile_no,
    imageUrl: state.edit.user.image_url,
    loading: state.edit.loading,
  };
};

export default connect(mapStateToProp,
  {
    editChange,
    updateUser
  }
)(EditProfile);

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
  iconHome: {
    marginHorizontal: 15,
    width: 26,
    height: 26,
  },
});