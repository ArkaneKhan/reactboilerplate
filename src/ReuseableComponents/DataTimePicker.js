import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import Images from "../assets";
import { heightRatio, widthRatio } from '../utility/utility';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Component } from 'React';



class DataTimePicker extends Component {
  state = {
    date: this.props.defaultValue,
    isDateTimePickerVisible: false,
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    let curr_date = this._checkDigit(date.getDate());
    let curr_month = this._checkDigit(date.getMonth() + 1); //Months are zero based
    let curr_year = date.getFullYear();
    const _date = curr_year + "-" + curr_month + "-" + curr_date
    this.props.onDateSelect(_date)
    this.setState({ date: _date });
    this._hideDateTimePicker();
  };

  _checkDigit = (date) => {
    return (date < 10 ? '0' : '') + date
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <Image source={Images.icDate} resizeMode="contain" style={styles.imgStyle} />
        <Text style={{ fontSize: 30, color: '#f2f3fb' }}>|</Text>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={this._showDateTimePicker}>
            <Text style={styles.text} numberOfLines={1}>{this.state.date}</Text>
          </TouchableOpacity>
          <Image source={Images.icDown} resizeMode='contain' style={styles.imageDrop} />
        </View> */}

        <DateTimePicker
          maximumDate={new Date(new Date().setFullYear(new Date().getFullYear() - 13))}
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ecf2f8',
    paddingTop: 10,
    paddingBottom: 10,
  },
  imageDrop: {
    position: 'absolute',
    width: widthRatio(38),
    height: heightRatio(22),
    right: 15,
    top: 13
  },
  text: {
    color: "#4a4c5b",
    fontSize: 15,
    // alignSelf: "center",
    // textAlign: "center",
    paddingLeft: widthRatio(80),
    fontFamily: "Poppins-Regular",
    paddingRight: 30,
  },
  viewStyle: {
    flexDirection: "column",
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: '#ecf2f8',
    // marginLeft: 25,
    // marginRight: 25,
    // position: "relative",
    // paddingBottom: heightRatio(5)
  },
  textInputStyle: {
    color: "#4a4c5b",
    fontSize: 15,
    // alignSelf: "center",
    // textAlign: "center",
    flex: 1,
    paddingLeft: widthRatio(80),
    fontFamily: "Poppins-Regular"
  },
  labelStyle: {
    fontSize: heightRatio(40),
    fontFamily: "Poppins-Regular"
  },
  imgStyle: {
    paddingTop: 35,
    marginLeft: 35,
    marginRight: 30,
    width: heightRatio(48),
    height: heightRatio(48),
  },
  bottomViewStyle: {
    // borderRadius: heightRatio(75),
    alignItems: "center",
    backgroundColor: "#ddd",
    // marginTop:10,
    // borderWidth:1,
    padding: 5,
    // borderColor:"#f7f8fc",
    flexDirection: "row",
    position: "relative",
    alignSelf: "flex-end"
  }
});
export default DataTimePicker;
