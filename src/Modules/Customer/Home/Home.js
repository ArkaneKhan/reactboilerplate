import React, { Component } from 'react';
import { StyleSheet, Text, View, SectionList, } from 'react-native';
import { Card, VendorContent, Statusbar, SearchView } from '../../../ReuseableComponents';
import { Images, UIFont, fonts, fontSize, colors, css } from '../../../Assets';
import { AppConstants } from '../../../AppConstants';
import { heightRatio, widthRatio } from '../../../utility/utility';
import Swiper from 'react-native-swiper'
import HttpServiceManager from '../../../HttpServiceManager/HttpServiceManager';
import { connect } from 'react-redux';
import { getServiceProviders, setCompanyDetails, getCurrentLocationName, setServiceProvidersForMap } from '../../../Store/Action';
import { Spinner } from '../../../utility/common';
import SplashScreen from 'react-native-splash-screen'

class Home extends Component {
  onEndReachedCalledDuringMomentum = true;
  state = {
    keyword: '',
  }

  componentDidMount() {
    SplashScreen.hide();
    HttpServiceManager.getInstance().userToken = this.props.user.token
    this.props.navigation.setParams({
      address: this.props.userLocation.address,
      setServiceProvidersForMap: this.setServiceProvidersForMap
    })
    this._getServiceProviders()
  }

  componentDidUpdate(prevProps) {
    if (this.props.userLocation.address !== prevProps.userLocation.address) {
      this.props.navigation.setParams({ address: this.props.userLocation.address })
      this._getServiceProviders()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Statusbar color={colors.lightGrey} contentStyle={'dark-content'} />
        <SearchView
          placeholder={AppConstants.search}
          onChangeText={(text) => this.setState({ keyword: text })}
          onSearchPress={this.onSearchPress}
        />
        {/* this.props.userLocation.coordinates */}
        <SectionList
          onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.5}
          onRefresh={() => this._getServiceProviders(this.state.keyword)}
          refreshing={this.props.refreshing}
          sections={this.props.serviceProviders}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index, section }) => this.renderItems(item, index, section)}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.headingStyle}>{title}</Text>
          )}
          stickySectionHeadersEnabled={false}
        />
        {this.props.loading && <Spinner key='spinner' />}
      </View >
    )
  }

  _getServiceProviders = (keyword = '', refreshing = true, page = 1, loading = false) => {
    const reqData = { ...this.props.userLocation.coordinates, keyword }
    this.props.getServiceProviders(reqData, refreshing, page, loading)
  }

  checkLocationError = (error) => {
    const { code, message } = error
    if (code === 1) {
      alert(message)
    } else if (code === 2) {
      alert(message)
    } else if (code === 3) {
      alert(message)
    }
  }

  renderItems = (item, index, section) => {
    switch (section.type) {
      case 'list':
        return (
          <View style={styles.sectionContainer}>
            <Swiper showsPagination={true}
              dotStyle={css.paginationNonActive}
              activeDotStyle={css.paginationActive}
              paginationStyle={{ bottom: 0 }}
              loop={false}>

              {this.renderSwiperItems(item.data)}

            </Swiper>
          </View>)
      case 'table':
        return (
          <View style={[styles.sectionContainer, { height: heightRatio(550) }]}>
            <Card key={item.identifier} onPress={() => this.onCompanyPress(item)}>
              <VendorContent item={item} onPress={() => this.onCompanyPress(item)} />
            </Card>
          </View>
        )
    }
  }

  renderSwiperItems = (item) => {
    let swiperItem = item.map((item) => (
      <Card key={item} onPress={() => this.onCompanyPress(item)}>
        <VendorContent item={item} onPress={() => this.onCompanyPress(item)} />
      </Card>
    ))
    return swiperItem
  }

  onCompanyPress(item) {
    this.props.setCompanyDetails(item, 'CustomerCompanyProfileStack')
  }

  onSearchPress = () => {
    this._getServiceProviders(this.state.keyword, false, 1, true)
  }

  setServiceProvidersForMap = () => {
    if (this.props.userLocation !== null) {
      this.props.setServiceProvidersForMap(this.props.serviceProviders)
    } else {
      this.props.navigation.navigate('Map')
    }
  }

  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      if (this.props.currentPage !== this.props.nextPage) {
        this._getServiceProviders(this.state.keyword, false, this.props.currentPage + 1)
      }
      this.onEndReachedCalledDuringMomentum = true;
    }
  }
}

const mapStateToProp = state => {
  return {
    user: state.signIn.user,
    userLocation: state.signIn.location,
    serviceProviders: state.home.serviceProviders,
    refreshing: state.home.refreshing,
    loading: state.home.loading,
    nextPage: state.home.nextPage,
    currentPage: state.home.currentPage,
  };
};
export default connect(mapStateToProp,
  {
    getServiceProviders,
    setCompanyDetails,
    getCurrentLocationName,
    setServiceProvidersForMap
  }
)(Home);

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bgGrey,
    flex: 1
  },
  sectionContainer: {
    width: '100%',
    height: heightRatio(600),
  },
  headingStyle: {
    marginLeft: 15,
    marginVertical: 15,
    ...UIFont.font(fonts.bold, fontSize.large, colors.lightBlack),
  },
});









