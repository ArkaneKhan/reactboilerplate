import React, { PureComponent, Component } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Card, Statusbar, ProfilePicView, JobsContent, Button, } from '../../../ReuseableComponents';
import { Images, colors } from '../../../Assets';
import { AppConstants } from '../../../AppConstants';
import HttpServiceManager from '../../../HttpServiceManager/HttpServiceManager';
import { connect } from 'react-redux';
import { processRequest, getCustomerRequests } from '../../../Store/Action';
import ActionTypes from '../../../Store/Types';
import constant from '../../../HttpServiceManager/constant';
import { Spinner } from '../../../utility/common';
import { NavigationEvents } from "react-navigation";
import SplashScreen from 'react-native-splash-screen'

class Requests extends Component {

  onEndReachedCalledDuringMomentum = true;

  constructor(props) {
    super(props);
    props.navigation.setParams({
      _getCustomerRequests: this.getCustomerRequests,
    })
  }

  static navigationOptions = () => {
    return {
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.state.params._getCustomerRequests();
        defaultHandler();
      }
    };
  };

  componentDidMount() {
    SplashScreen.hide();
    HttpServiceManager.getInstance().userToken = this.props.user.token;
    this.getCustomerRequests()
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Statusbar color={colors.themeColor} contentStyle={"light-content"} />
        <FlatList
          extraData={this.props.customerRequests}
          data={this.props.customerRequests}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          onRefresh={() => this.getCustomerRequests()}
          refreshing={this.props.refreshing}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => this._renderItems(item)} />

        {this.props.loading && <Spinner key='spinner' />}
      </View>
    );
  }

  getCustomerRequests = (refreshing = true, page = 1) => {
    this.props.getCustomerRequests(
      'request',
      [ActionTypes.GET_CUSTOMER_REQUESTS, ActionTypes.GET_CUSTOMER_REQUESTS_SUCCESS,
      ActionTypes.GET_CUSTOMER_REQUESTS_LOADMORE, ActionTypes.GET_CUSTOMER_REQUESTS_FAIL],
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

  _renderItems = (item) => {
    return (
      <Card onPress={() => this.props.navigation.navigate('WorkerDetailScreen', { requestType: AppConstants.requests, item: item })}>
        <JobsContent image={{ uri: constant.baseImageURL + item.user.image_url }}
          customerName={item.user.username}
          jobNumber={item.job_number}
          schedule_date={item.schedule_date}
          amount={item.service.amount} />
        <View style={styles.btnView}>
          <Button
            onPress={() => this.acceptRequest(item.id)}
            title={AppConstants.accept}
            btnColor={colors.green}
            txtColor={colors.white}
            lhsImage={Images.icAccept}
            btnStyle={{ flex: 1, marginRight: 15, }} />
          <Button
            onPress={() => this.rejectRequest(item.id)}
            title={AppConstants.reject}
            btnColor={colors.red}
            txtColor={colors.white}
            lhsImage={Images.icReject}
            btnStyle={{ flex: 1 }} />
        </View>
      </Card>
    )
  }

  acceptRequest(id) {
    this.props.processRequest(
      id,
      'accept',
      [ActionTypes.REQUEST_ACCEPT_LOADING, ActionTypes.REQUEST_ACCEPT_SUCCESS, ActionTypes.REQUEST_ACCEPT_FAIL],
      false
    );
  }

  rejectRequest(id) {
    this.props.processRequest(
      id,
      'reject',
      [ActionTypes.REQUEST_REJECT_LOADING, ActionTypes.REQUEST_REJECT_SUCCESS, ActionTypes.REQUEST_REJECT_FAIL],
      false
    );

  }

}

const mapStateToProp = state => {

  return {
    user: state.signIn.user,
    customerRequests: state.requests.customerRequests,
    loading: state.requests.loading,
    refreshing: state.requests.refreshing,
    nextPage: state.requests.nextPage,
    currentPage: state.requests.currentPage,
  };
};
export default connect(mapStateToProp,
  {
    processRequest,
    getCustomerRequests
  }
)(Requests);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnView: {
    flexDirection: 'row',
    margin: 15,
  }
})
