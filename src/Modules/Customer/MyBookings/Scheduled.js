
import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native'
import { ServiceCard, ServicePackageDetail, Button, ModalPopup, TipPopup } from '../../../ReuseableComponents';
import { Images, UIFont, fonts, fontSize, colors, css } from '../../../Assets';
import { AppConstants } from '../../../AppConstants';
import { heightRatio, widthRatio } from '../../../utility/utility';
import Collapsible from 'react-native-collapsible';
import { getCustomerRequests, processRequest } from '../../../Store/Action';
import ActionTypes from '../../../Store/Types';
import { connect } from 'react-redux';
import moment from 'moment';
import { Spinner } from '../../../utility/common';

let scrollYPos = 0;
let isVisible = false

class Scheduled extends Component {

  onEndReachedCalledDuringMomentum = true;

  state = {
    collapsed: true,
    index: -1,
    isVisible: false
  };

  componentDidMount() {
    this.getCustomerRequests()
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.scheduleData}
          extraData={this.props.scheduleData}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          onRefresh={() => this.getCustomerRequests()}
          refreshing={this.props.refreshing}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => this.renderItem(item, index)} />
        {this.props.loading && <Spinner key='spinner' />}
      </View>
    );
  }

  renderItem = (item, index) => {
    return (
      <View>
        <ServiceCard
          onPress={() => this.onPress(index)}
          packageName={item.service.title}
          title={item.status}
          numberOfLines={2}
          amount={item.service.amount}
          description={item.service.description}>
          <Collapsible collapsed={this.state.index !== index ? true : false} align="center">
            <ServicePackageDetail
              data={item.service.service_detail}
            />
            <View style={styles.scheduleContainer}>
              <Text style={styles.packageName}>{AppConstants.schedule}</Text>
              <View style={styles.childContainers}>
                <Image source={Images.icId} ressizeMode='contain' style={styles.icon} />
                <Text style={styles.textStyle}>{AppConstants.id} : {item.job_number}</Text>
              </View>
              <View style={[styles.childContainers, { marginTop: 5, marginBottom: 15 }]}>
                <Image source={Images.icTime} ressizeMode='contain' style={styles.icon} />
                <Text style={styles.textStyle}>{moment(item.schedule_date).format("DD MMM hh:mm")}</Text>
              </View>
              {
                item.status === 'Complete' &&
                <Button
                  onPress={() => this.onConfirmPress(item.id)}
                  btnColor={colors.btnBlue}
                  txtColor={colors.white}
                  title={AppConstants.confirm} />
              }
            </View>
          </Collapsible>
        </ServiceCard>
        <ModalPopup
          backdropColor={colors.white}
          onBackdropPress={this.closeModal}
          isVisible={isVisible}>
          <TipPopup
            onYesPress={this.onYesPress}
            onNoPress={this.onNoPress}
          />
        </ModalPopup>
      </View>
    );
  };

  renderPackageDetail(item) {
    return (
      <View style={styles.childContainers}>
        <Image source={Images.icTick} ressizeMode='cover' style={styles.icon} />
        <Text style={{ ...UIFont.font(fonts.regular, fontSize.small, colors.lightPurple) }}>{item}</Text>
      </View>
    )
  }

  onConfirmPress(id) {
    isVisible = true
    this.setState({ popup: true, id:  id})
  }
  onYesPress = () => {

  }

  onNoPress = () => {
    isVisible = false
    this.setState({ popup: false,index: -1 })
    this.props.processRequest(
      this.state.id,
      'finish',
      [ActionTypes.REQUEST_CONFIRM_LOADING, ActionTypes.REQUEST_CONFIRM_SUCCESS, ActionTypes.REQUEST_CONFIRM_FAIL],
      false
    );
    // this.setState({ index: -1 });
  }

  closeModal = () => {
    isVisible = false
    this.setState({ popup: false })
  }

  getCustomerRequests = (refreshing = true, page = 1) => {
    this.props.getCustomerRequests(
      'schedule',
      [ActionTypes.GET_SCHEDULE_LOADING, ActionTypes.GET_SCHEDULE_SUCCESS,
      ActionTypes.GET_SCHEDULE_LOADMORE, ActionTypes.GET_SCHEDULE_FAIL],
      refreshing,
      page
    );
  }

  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      if (this.props.currentPage !== this.props.nextPage) {
        this.getCustomerRequests(false, this.props.currentPage + 1);
      }
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  onPress(index) {
    this.setState({ index: this.state.index === index ? -1 : index });
  };
}

const mapStateToProp = state => {
  return {
    scheduleData: state.myBookings.scheduleData,
    loading: state.myBookings.loading,
    refreshing: state.myBookings.refreshing,
    nextPage: state.myBookings.nextPage,
    currentPage: state.myBookings.currentPage,
  };
};
export default connect(mapStateToProp,
  {
    getCustomerRequests,
    processRequest
  }
)(Scheduled);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGrey,
  },
  scheduleContainer: {
    margin: 15,
  },
  packageName: {
    marginTop: 15,
    marginBottom: 5,
    ...UIFont.font(fonts.regular, fontSize.large, colors.purple)
  },
  childContainers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10
  },
  icon: {
    height: heightRatio(40),
    width: heightRatio(40),
    marginRight: 20
  },
  textStyle: {
    ...UIFont.font(fonts.regular, fontSize.small, colors.placeholderColor)
  },
});

