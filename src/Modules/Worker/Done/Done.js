import React, { PureComponent } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Card, Statusbar, JobsContent } from '../../../ReuseableComponents';
import { Images } from '../../../Assets';
import {AppConstants} from '../../../AppConstants';
import { getCustomerRequests } from '../../../Store/Action';
import ActionTypes from '../../../Store/Types';
import { connect } from 'react-redux';
import HttpServiceManager from '../../../HttpServiceManager/HttpServiceManager';
import constant from '../../../HttpServiceManager/constant';

class Done extends PureComponent {

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
  //   this.getCustomerRequests();
  // }

  render() {
    return (
      <FlatList
        extraData={this.props.doneRequests}
        data={this.props.doneRequests}
        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
        onEndReached={this.handleLoadMore.bind(this)}
        onEndReachedThreshold={0}
        onRefresh={() => this.getCustomerRequests()}
        refreshing={this.props.refreshing}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => this._renderItems(item)} />

    );
  }

  getCustomerRequests = (refreshing = true, page = 1) => {
    this.props.getCustomerRequests(
      'complete',
      [ActionTypes.GET_DONE_REQUESTS, ActionTypes.GET_DONE_REQUESTS_SUCCESS,
      ActionTypes.GET_DONE_REQUESTS_LOADMORE, ActionTypes.GET_DONE_REQUESTS_FAIL],
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
      <Card
        onPress={() => this.props.navigation.navigate('WorkerDetailScreen', { requestType: AppConstants.done, item: item })}
        border={item.status == 'Complete'? Images.acceptBorder : item.status == 'Finish'?  Images.finishBorder : Images.rejectBorder}>
        <Statusbar contentStyle={"light-content"} />
        <JobsContent image={{ uri: constant.baseImageURL + item.user.image_url }} customerName={item.user.username} jobNumber={item.job_number} schedule_date={item.schedule_date} amount={item.service.amount}
          badgeImage={item.status == 'Complete'? Images.acceptBadge : item.status == 'Finish'? Images.finishBadge : Images.rejectBadge}
        />
      </Card>
    )
  }
}

const mapStateToProp = state => {

  return {
    user: state.signIn.user,
    doneRequests: state.done.done,
    refreshing: state.done.refreshing,
    nextPage: state.todo.nextPage,
    currentPage: state.todo.currentPage,
  };
};
export default connect(mapStateToProp,
  {
    getCustomerRequests
  }
)(Done);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
