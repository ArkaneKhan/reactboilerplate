import React, { Component } from 'react';

import { View, Text } from 'react-native';
import { JobsDetailContent, Button } from '../../../ReuseableComponents';
import { Images, UIFont, fonts, fontSize, colors, } from '../../../Assets';
import {AppConstants} from '../../../AppConstants';
import ActionTypes from '../../../Store/Types';
import { connect } from 'react-redux';
import { processRequest, getCustomerRequests } from '../Requests/RequestsAction';
import constant from '../../../HttpServiceManager/constant';
import { Spinner } from '../../../utility/common';


class JobsDetails extends Component {

  serviceDetail = null

  constructor(props) {
    super(props);
    this.serviceDetail = this.props.navigation.state.params.item
  }

  render() {
    return (
      <JobsDetailContent

        mobileNo={this.serviceDetail.user.mobile_no}
        customerName={this.serviceDetail.user.username}
        customerEmail={this.serviceDetail.user.email}
        image={{ uri: constant.baseImageURL + this.serviceDetail.user.image_url }}

        jobNumber={this.serviceDetail.job_number}
        status={this.serviceDetail.status}
        scheduleDate={this.serviceDetail.schedule_date}

        amount={this.serviceDetail.service.amount}
        description={this.serviceDetail.service.description}
        service_detail={this.serviceDetail.service.service_detail}

      >
        {this.buttonType()}
        {
          this.props.requestLoading || this.props.todoLoading || this.props.ongoingLoading
          &&
          <Spinner key='spinner' />
        }
      </JobsDetailContent>
    );
  }

  buttonType = () => {
    const requestType = this.props.navigation.state.params.requestType
    if (requestType === AppConstants.requests) {
      return this.acceptRejectButton()
    } else if (requestType === AppConstants.todo || requestType === AppConstants.onGoing) {
      const btnText = (requestType === AppConstants.todo) ? AppConstants.startService : AppConstants.done
      return this.startServiceDoneButton(btnText)
    }
  }

  acceptRejectButton = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Button
          onPress={this.onAcceptPress}
          title={AppConstants.accept}
          btnColor={colors.green}
          txtColor={colors.white}
          lhsImage={Images.icAccept}
          btnStyle={{ flex: 1, marginRight: 15, }} />
        <Button
          onPress={this.onRejectPress}
          title={AppConstants.reject}
          btnColor={colors.red}
          txtColor={colors.white}
          lhsImage={Images.icReject}
          btnStyle={{ flex: 1 }} />
      </View>
    )
  }

  startServiceDoneButton = (btnText) => {
    return (
      <Button
        onPress={btnText === AppConstants.startService ? this.onStartServicePress : this.onDonePress}
        title={btnText}
        btnColor={colors.btnBlue}
        txtColor={colors.white}
      />
    )
  }

  onAcceptPress = () => {
    this.props.processRequest(
      this.serviceDetail.id,
      'accept',
      [ActionTypes.REQUEST_ACCEPT_LOADING, ActionTypes.REQUEST_ACCEPT_SUCCESS, ActionTypes.REQUEST_ACCEPT_FAIL],
      true
    );
  }

  onRejectPress = () => {
    this.props.processRequest(
      this.serviceDetail.id,
      'reject',
      [ActionTypes.REQUEST_ACCEPT_LOADING, ActionTypes.REQUEST_REJECT_SUCCESS, ActionTypes.REQUEST_REJECT_FAIL],
      true
    );
  }

  onStartServicePress = () => {
    this.props.processRequest(
      this.serviceDetail.id,
      'on_going',
      [ActionTypes.START_SERVICE_LOADING, ActionTypes.START_SERVICE_SUCCESS, ActionTypes.START_SERVICE_FAIL],
      true
    );

  }


  onDonePress = () => {
    this.props.processRequest(
      this.serviceDetail.id,
      'complete',
      [ActionTypes.DONE_REQUEST_LOADING, ActionTypes.DONE_REQUEST_SUCCESS, ActionTypes.DONE_REQUEST_FAIL],
      true
    );

    // this.props.navigation.navigate('Done')
  }

}

const mapStateToProp = state => {

  return {
    requestLoading: state.requests.loading,
    todoLoading: state.todo.loading,
    ongoingLoading: state.onGoing.loading,
  };
};
export default connect(mapStateToProp,
  {
    processRequest,
  }
)(JobsDetails);

