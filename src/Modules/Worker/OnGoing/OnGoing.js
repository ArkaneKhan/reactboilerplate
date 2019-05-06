import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Card, Statusbar, ProfilePicView, JobsContent, Button } from '../../../ReuseableComponents';
import { Images, colors } from '../../../Assets';
import {AppConstants} from '../../../AppConstants';
import HttpServiceManager from '../../../HttpServiceManager/HttpServiceManager';
import { connect } from 'react-redux';
import { processRequest, getCustomerRequests } from '../../../Store/Action';
import ActionTypes from '../../../Store/Types';
import constant from '../../../HttpServiceManager/constant';
import { Spinner } from '../../../utility/common';

class OnGoing extends PureComponent {

  onEndReachedCalledDuringMomentum = true;

  static navigationOptions = () => {
    return {
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.state.params._getCustomerRequests();
        defaultHandler();
      }
    };
  };

  constructor(props) {
    super(props);
    props.navigation.setParams({
      _getCustomerRequests: this.getCustomerRequests,
    })
  }

  // componentDidMount() {
  //   HttpServiceManager.getInstance().userToken = this.props.user.token;
  //   this.getCustomerRequests('ongoing', true);
  // }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          extraData={this.props.onGoingRequests}
          data={this.props.onGoingRequests}
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
      'ongoing',
      [ActionTypes.GET_ONGOING_LIST, ActionTypes.GET_ONGOING_LIST_SUCCESS,
      ActionTypes.GET_ONGOING_LIST_LOADMORE, ActionTypes.GET_ONGOING_LIST_FAIL],
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
      <Card onPress={() => this.props.navigation.navigate('WorkerDetailScreen', { requestType: AppConstants.onGoing, item: item })}>
        <Statusbar contentStyle={"light-content"} />
        <JobsContent
          image={{ uri: constant.baseImageURL + item.user.image_url }}
          customerName={item.user.username}
          jobNumber={item.job_number}
          schedule_date={item.schedule_date}
          amount={item.service.amount} />
        <View style={styles.btnView}>
          <Button
            onPress={() => this.submitRequest(item.id)}
            title={AppConstants.done}
            btnColor={colors.btnBlue}
            txtColor={colors.white}
          />
        </View>

      </Card>
    )
  }

  submitRequest(id) {
    this.props.processRequest(
      id,
      'complete',
      [ActionTypes.DONE_REQUEST_LOADING, ActionTypes.DONE_REQUEST_SUCCESS, ActionTypes.DONE_REQUEST_FAIL],
      false
    );
  }
}

const mapStateToProp = state => {

  return {
    user: state.signIn.user,
    onGoingRequests: state.onGoing.onGoing,
    refreshing: state.onGoing.refreshing,
    loading: state.onGoing.loading,
    nextPage: state.onGoing.nextPage,
    currentPage: state.onGoing.currentPage,
  };
};
export default connect(mapStateToProp,
  {
    getCustomerRequests,
    processRequest
  }
)(OnGoing);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnView: {
    margin: 15,
  }
})

