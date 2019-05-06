import React from 'react';
import { Text, View, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { ProfilePicView, PriceView, BorderButton, Button, } from '../ReuseableComponents';
import { heightRatio } from '../utility/utility';
import {AppConstants} from '../AppConstants';
import moment from "moment";
import { Images, UIFont, fonts, fontSize, colors, } from '../Assets';

export const JobsDetailContent = (props) => (
  <View style={styles.parentContainer}>
    <ScrollView>
      <View style={[styles.containerStyle, { flexDirection: 'row' }]}>
        <ProfilePicView
          image={props.image || Images.user}
          imgViewStyle={{ marginLeft: 0 }}
        />
        <Text
          style={[styles.headignTextStyle, { flex: 1, flexWrap: 'wrap', alignSelf: 'center' }]}>
          {props.customerName}
        </Text>
        <PriceView
          price={props.amount}
          priceStyle={{ alignSelf: 'center' }}
        />
      </View>
      {console.warn('status: ',props.status)}
      {props.status && (props.status === 'Complete' || props.status === 'finish' || props.status === 'Reject') &&
        <View style={styles.containerStyle}>
          <Text style={styles.headignTextStyle}>Status</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Image
              source={props.status == 'Complete' ? Images.icComplete : props.status == 'finish' ? Images.icFinish : Images.icReject}
              ressizeMode='contain' style={styles.icon} />
            <Text style={{ ...UIFont.font(fonts.regular, fontSize.medium, getTextColor(props.status)) }}>
              {props.status}
            </Text>
          </View>
        </View>
      }
      <View style={styles.containerStyle}>
        <Text style={styles.headignTextStyle}>Details</Text>
        <View style={styles.childContainers}>
          <Image source={Images.icId} ressizeMode='contain' style={styles.icon} />
          <Text style={styles.detailsTextStyle}>ID : {props.jobNumber}</Text>
        </View>
        <View style={[styles.childContainers, { justifyContent: 'space-between' },]}>
          <View style={[styles.childContainers, { marginTop: 0 }]}>
            <Image source={Images.icTimeGrey} ressizeMode='contain' style={styles.icon} />
            <Text style={styles.detailsTextStyle}>{moment(props.scheduleDate).format("DD MMM hh:ss")}</Text>
          </View>
          <View>
            {/* {props.status && props.status == 'reject' || props.status == 'complete' || props.status == 'pending' ?
              null
              : */}
            <BorderButton
              title={AppConstants.schedule}
            />
            {/* } */}
          </View>
        </View>
        <View style={styles.childContainers}>
          <Image source={Images.icEmail} ressizeMode='contain' style={styles.icon} />
          <Text style={styles.detailsTextStyle}>{props.customerEmail}</Text>
        </View>
        <View style={styles.childContainers}>
          <Image source={Images.icPhone} ressizeMode='contain' style={styles.icon} />
          <Text style={styles.detailsTextStyle}>{props.mobileNo}</Text>
        </View>
      </View>
      <View style={styles.containerStyle}>
        <Text style={styles.headignTextStyle}>Description</Text>
        <Text style={{ ...UIFont.font(fonts.regular, fontSize.small, colors.darkGrey) }}>{props.description}</Text>
      </View>
      <View style={styles.containerStyle}>
        <Text style={styles.headignTextStyle}>Service</Text>
        <FlatList
          // extraData={this.props.language}
          //data={['Full Body Car Polish', 'Full Body Soap Wash', 'Rim Polish']}
          data={props.service_detail}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => "" + item + index}
          renderItem={({ item }) =>
            <View style={styles.childContainers}>
              <Image source={Images.icTick} ressizeMode='contain' style={styles.icon} />
              <Text style={{ ...UIFont.font(fonts.regular, fontSize.small, colors.lightPurple) }}>{item}</Text>
            </View>
          }
        />
      </View>
      <View style={styles.containerStyle}>
        {props.children}
      </View>
    </ScrollView>
  </View>
);

const getTextColor = (status) => {
  if(status === 'Complete'){
    return colors.green
  }else if(status === 'Reject'){
    return colors.red
  }else if(status === 'Finish'){
    return colors.themeColor
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  icon: {
    height: heightRatio(40),
    width: heightRatio(40),
    marginRight: 20
  },
  containerStyle: {
    marginLeft: 25,
    marginTop: 20,
    marginRight: 15,
  },
  childContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  detailsTextStyle: {
    ...UIFont.font(fonts.regular, fontSize.small, colors.placeholderColor)
  },
  headignTextStyle: {
    ...UIFont.font(fonts.medium, fontSize.large, colors.purple)
  }
});
