import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { heightRatio, widthRatio } from '../utility/utility';
import { Images, UIFont, fonts, fontSize, colors, css } from '../Assets'
import {AppConstants} from '../AppConstants';
import { Card, PriceView, BorderButton } from '.';

export class ServicePackageDetail extends Component {

  render() {
    return (
      <View style={this.props.viewStyle}>
        <FlatList
          // extraData={this.props.language}
          data={this.props.data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "" + item + index}
          renderItem={({ item }) => this.renderPackageDetail(item)} />
      </View>
    )
  }

  renderPackageDetail(item) {
    return (
      <View style={[styles.childContainers,this.props.childContainersStyle]}>
        <Image source={Images.icTick}  style={styles.icon} />
        <Text 
        style={{ ...UIFont.font(fonts.regular, fontSize.small, colors.lightPurple), flex:1 }}>{item}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
  },

  packagesContainer: {
    flexDirection: 'row',
    marginLeft: 15,
    // marginBottom : 15,
    // flex:1
  },
  description: {
    marginBottom: 15,
    ...UIFont.font(fonts.regular, fontSize.small, colors.placeholderColor)
  },
  packageName: {
    // marginTop: 15,
    // marginBottom: 5,
    marginRight: 15,
    ...UIFont.font(fonts.regular, fontSize.large, colors.purple)
  },
  childContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 15,
  },
  icon: {
    height: heightRatio(24),
    width: heightRatio(31),
    marginRight: 10,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
});