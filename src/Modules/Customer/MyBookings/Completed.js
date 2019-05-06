
import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { ServiceCard, ServicePackageDetail, Button } from '../../../ReuseableComponents';
import { Images, UIFont, fonts, fontSize, colors, css } from '../../../Assets';
import {AppConstants} from '../../../AppConstants';
import { heightRatio, widthRatio } from '../../../utility/utility';
import { getCustomerRequests } from '../../../Store/Action';
import ActionTypes from '../../../Store/Types';
import { connect } from 'react-redux';

class Completed extends Component {

  onEndReachedCalledDuringMomentum = true;

  componentDidMount() {
    this.getCustomerRequests()
  }

  render() {
    return (
      <View style={styles.container}>

        <FlatList
          data={this.props.completedRequestData}
          extraData={this.props.completedRequestData}
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          onRefresh={() => this.getCustomerRequests()}
          refreshing={this.props.refreshing}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => this.renderItem(item, index)} />
      </View >
    );
  }

  renderItem = (item, index) => {
    return (

      <ServiceCard
        packageName={item.service.title}
        title={item.status}
        numberOfLines={2}
        amount={item.service.amount}
        description={item.service.description}>
      </ServiceCard>

    );
  };

  getCustomerRequests = (refreshing = true, page = 1) => {
    this.props.getCustomerRequests(
      'complete',
      [ActionTypes.GET_COMPLETED_LOADING, ActionTypes.GET_COMPLETED_SUCCESS,
      ActionTypes.GET_COMPLETED_LOADING_LOADMORE, ActionTypes.GET_COMPLETED_FAIL],
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
}

const mapStateToProp = state => {

  return {
    completedRequestData: state.myBookings.completedRequestData,
    loading: state.myBookings.loading,
    refreshing: state.myBookings.refreshing,
    nextPage: state.myBookings.nextPage,
    currentPage: state.myBookings.currentPage,
  };
};
export default connect(mapStateToProp,
  {
    getCustomerRequests
  }
)(Completed);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgGrey,
  },
});