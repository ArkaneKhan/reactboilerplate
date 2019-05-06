import moment from "moment";
import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { ProfilePicView, PriceView } from '../ReuseableComponents';
import { Images, UIFont, fonts, fontSize, colors } from '../Assets'
import { heightRatio, widthRatio } from '../utility/utility';

export const JobsContent = (props) => (

  <View style={styles.contentContainer} >

    <View style={styles.userContentContainer}>

      <ProfilePicView
        image={props.image || Images.user} />

      <View style={styles.userDetailsConatiner}>

        <View style={styles.userNameContainer}>
          <Text
            style={{ ...UIFont.font(fonts.regular, fontSize.large, colors.purple), flex: 1, flexWrap: 'wrap', marginRight: 2 }}>
            {props.customerName}
          </Text>
          {
            props.badgeImage && <Image source={props.badgeImage} style={styles.badgeImagesStyle} resizeMode='contain' />
          }

        </View>

        <View style={styles.idTimeContainer}>
          <Image source={Images.icId} style={styles.icon} />
          <Text style={styles.idTimeText}>ID :  {props.jobNumber}</Text>
        </View>

        <View style={styles.idTimeContainer}>
          <Image source={Images.icTimeGrey} style={styles.icon} />

          {/* 03-22-2019 12:00 pm */}
          {/* props.schedule_date */}
          <Text style={styles.idTimeText}>{moment(props.schedule_date).format("DD MMM hh:mm")}</Text>
        </View>

      </View>
      <PriceView price={props.amount} />
    </View>
    <View style={{ height: 1, backgroundColor: '#DCDCDC' }}></View>
    <View style={styles.serviceContainer}>
      <Text style={{ ...UIFont.font(fonts.regular, fontSize.medium, colors.darkGrey) }}>
        Premium Car Wash Service
      </Text>
      <Image source={Images.icNext} style={[styles.icon, { marginRight: 0 }]} resizeMode='contain' />
    </View>
  </View >
);

const styles = StyleSheet.create({
  contentContainer: {
    marginBottom: 15,
    marginTop: 25,
    marginLeft: 15,
    marginRight: 15
  },
  userContentContainer: {
    flexDirection: 'row',
    marginBottom: 15
  },
  userNameContainer: {
    flexDirection: 'row',
  },
  userDetailsConatiner: {
    flex: 1,
    marginRight: 15,
  },
  idTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  idTimeText: {
    ...UIFont.font(fonts.regular, fontSize.medium, colors.placeholderColor)
  },
  badgeImagesStyle: {
    height: heightRatio(62),
    width: widthRatio(62),
    marginRight: 15
  },
  icon: {
    height: heightRatio(32),
    width: heightRatio(32),
    marginRight: 15
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    alignItems: 'center'
  }

})

