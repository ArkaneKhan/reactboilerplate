import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { UIFont, Images, fonts, fontSize, colors } from '../Assets';
import { heightRatio, widthRatio } from '../utility/utility';
import { Button } from '../ReuseableComponents';
import {AppConstants} from '../AppConstants';
import constant from '../HttpServiceManager/constant';
import moment from 'moment';

export const VendorContent = (props) => {

  return (
    <View style={styles.container}>
      <Image source={{ uri: constant.baseImageURL + props.item.image_url[0] }} 
        style={styles.imgStyle}
      />
      <View style={styles.contentContainer}>
        <View style={styles.timeContainer}>
          <Image source={Images.icTime} style={styles.icon} resizeMode='contain' />
          <Text style={{ ...UIFont.font(fonts.medium, fontSize.regular, colors.darkGrey), }}>
            {
              moment(moment(props.item.open_time, 'HH:mm')).format('HH:mm')
            }
          </Text>
          <Text style={{ ...UIFont.font(fonts.medium, fontSize.regular, colors.darkGrey), }}> - </Text>
          <Text style={{ ...UIFont.font(fonts.medium, fontSize.regular, colors.darkGrey), }}>
            {
              moment(moment(props.item.close_time, 'HH:mm')).format('HH:mm')
            }
          </Text>
        </View>
        <Text numberOfLines={1} style={styles.vendorName}>{props.item.name}</Text>
        <Text numberOfLines={2}>{props.item.description}</Text>
        <View style={styles.bookContainer}>
          <View style={styles.locationContainer}>
            <Image source={Images.icLocationPurple} resizeMode='contain' style={styles.icon} />
            <Text numberOfLines={1} style={styles.locationText}>{props.item.address}</Text>
          </View>
          <Button
            onPress={props.onPress}
            title={AppConstants.book}
            btnColor={colors.btnBlue}
            txtColor={colors.white}
            btnStyle={{ paddingLeft: 15, paddingRight: 15, height: 25, marginBottom: 0, borderRadius: 3 }} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  bookContainer: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 15
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 5
  },
  imgStyle: {
    // height: heightRatio(450),
    // flex:1,
    width: widthRatio(342),
    height: undefined,
    borderRadius: 8,
  },
  icon: {
    height: heightRatio(40),
    width: widthRatio(40),
    marginRight: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  locationText: {
    ...UIFont.font(fonts.medium, fontSize.small, colors.darkGrey),
    flex: 1,
    // flexWrap:'wrap',
  },
  vendorName: {
    marginTop: 5,
    ...UIFont.font(fonts.medium, fontSize.medium, colors.black)
  }
});