import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, PermissionsAndroid, Platform } from 'react-native';
import { Images, UIFont, fonts, fontSize, colors } from '../../../Assets';
import { AppConstants } from '../../../AppConstants';
import { heightRatio, Alerts, getCurrentLocation, checkAndRequestLocation } from '../../../utility/utility';
import { connect } from 'react-redux';
import { locationChanged, resetLocationChanged, getCurrentLocationName } from '../../../Store/Action';
import { Button, GooglePlacesAutocomplete } from '../../../ReuseableComponents';
import ActionTypes from '../../../Store/Types';
import { Spinner } from '../../../utility/common';
import { store } from '../../../../App';
import { NavigationActions } from 'react-navigation'

class AddLocation extends Component {
  state = {
    text: '',
    listViewDisplayed: 'auto',
    selectedData: null
  }

  render() {

    return (
      <ImageBackground source={Images.bg} style={styles.bgImage}>
        <Text style={{ ...UIFont.font(fonts.regular, fontSize.large, colors.black), marginTop: heightRatio(400), marginBottom: 25 }}>{AppConstants.enterLocation}</Text>
        <GooglePlacesAutocomplete
          placeholder={AppConstants.enterLocation}
          //minimum length of text to search
          textInputProps={{
            onChangeText: (text) => this.onChangeText(text),
            onFocus: () => this.setState({ listViewDisplayed: 'auto' }),
          }}
          listViewDisplayed={this.state.listViewDisplayed}
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => this.onSelect(details)}

          getDefaultValue={() => ''}

          styles={{
            textInputContainer: {
              width: '100%',
              backgroundColor: '#fff',
              height: 50,
              marginHorizontal: 15,
            },
            textInput: {
              ...UIFont.font(fonts.regular, fontSize.medium, colors.black),
              height: 40
            },
            description: {
              fontWeight: 'bold'
            },
            predefinedPlacesDescription: {
              color: '#1faadb'
            }
          }}

          query={{
            // available options: https://developers.google.com/places/web-service/autocomplete
            key: 'AIzaSyB9WNflRDvFOqSdDdZQrxKX4gyPL6l0QCo',//'AIzaSyAdvcAHIr9kV6-SC5fMLwto20yAdN8ctV4',
            language: 'en', // language of the results
            // types: 'address' // default: 'geocode'
            types: ['street_address', 'geocode'],// default: 'geocode'
          }}

          currentLocation={false}
          // currentLocationLabel="Current location"
          nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
          GoogleReverseGeocodingQuery={{
            // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
          }}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
            types: 'restaurant'
          }}

          filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
          // predefinedPlaces={[homePlace, workPlace]}

          debounce={200}
        />
        <View style={{ alignSelf: 'stretch', marginTop: 30, marginHorizontal: 15 }}>
          <Button
            onPress={this.onGoPressed}
            disabled={this.state.selectedData === null ? true : false}
            title={AppConstants.go}
            btnColor={this.state.selectedData === null ? colors.placeholderColor : colors.btnBlue}
            txtColor={colors.white}
            btnStyle={{ alignSelf: 'stretch', }} />
          <Button
            onPress={this.onCurrentLocationPressed}
            title={AppConstants.useCurrentLocation}
            btnColor={colors.btnBlue}
            txtColor={colors.white}
            btnStyle={{ alignSelf: 'stretch', }} />
        </View>
        {this.props.loading && <Spinner key='spinner' />}
      </ImageBackground>
    );
  }

  onGoPressed = () => {
    store.dispatch({ type: ActionTypes.ADD_LOCATION_LOADING })
    this.props.locationChanged(this.state.selectedData, 'CustomerDrawerStack')
    // this.props.navigation.navigate('CustomerDrawerStack')
  }

  onSelect = (details) => {
    this.setState({ listViewDisplayed: false })
    const { name, formatted_address, geometry } = details
    let data = { address: formatted_address, coordinates: { latitude: geometry.location.lat, longitude: geometry.location.lng } }

    this.setState({ selectedData: data })
  }

  onCurrentLocationPressed = () => {
    if (Platform.OS === 'android') {
      checkAndRequestLocation().then((response) => {
        if (response === PermissionsAndroid.RESULTS.GRANTED) {
          this._getCurrentLocation()
        }
      }).catch((error) => {
        console.warn('error: ', error);
      })
    } else {
      this._getCurrentLocation()
    }
  }

  _getCurrentLocation = () => {
    store.dispatch({ type: ActionTypes.ADD_LOCATION_LOADING })
    getCurrentLocation().then((position) => {
      this.props.getCurrentLocationName(
        position.coords.latitude,
        position.coords.longitude,
        () => store.dispatch(NavigationActions.navigate({ routeName: 'CustomerDrawerStack' })))
    }).catch((error) => {
      store.dispatch({ type: ActionTypes.ADD_LOCATION_FAIL })
      this.checkLocationError(error)
    })
  }

  onChangeText(text) {
    this.setState({ text: text }, () => {
      if (this.state.text === '') {
        // this.props.resetLocationChanged()
        this.setState({ selectedData: null })
      }
    })
  }

  checkLocationError = (error) => {
    let alert = ''
    const { code } = error
    if (code === 1) {
      alert = AppConstants.alertLocationPermissionDenied
    } else if (code === 2) {
      alert = AppConstants.alertLocationPositionUnavailable
    } else if (code === 3) {
      alert = AppConstants.alertLocationRequestTimeout
    }
    setTimeout(() => {
      Alerts(
        alert
      )
    }, 510);
  }
}

const mapStateToProp = state => {
  return {
    location: state.signIn.location,
    loading: state.addLocation.loading,
  };
};
export default connect(mapStateToProp,
  {
    locationChanged,
    resetLocationChanged,
    getCurrentLocationName
  }
)(AddLocation)

const styles = StyleSheet.create({
  bgImage: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
  },
});