import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
// import MapView, { ProviderPropType, Marker, Callout, AnimatedRegion } from 'react-native-maps';
import { connect } from "react-redux";
import {
  getServiceProviders,
  getCurrentLocationName
} from "../../../Store/Action";
import { Images, colors } from "../../../Assets";
import { Button, Statusbar } from "../../../ReuseableComponents";
import { AppConstants } from "../../../AppConstants";
import ActionTypes from "../../../Store/Types";
import { store } from "../../../../App";
import { Spinner } from "../../../utility/common";
import { NavigationActions } from "react-navigation";

const timeout = 3000;
const options = {
  edgePadding: {
    top: 250,
    right: 250,
    bottom: 250,
    left: 250
  },
  animated: true
};

class Map extends Component {
  state = { location: null };

  render() {
    return (
      <View style={styles.container}>
        <Statusbar color={colors.white} contentStyle={"dark-content"} />
        {/* <MapView
          showsUserLocation={true}
          maxZoomLevel={17}
          onRegionChange={(region) => this.onUserLocationChange(region)}
          provider={"google"}
          ref={map => this.map = map}
          style={styles.container}
          onMapReady={this.focus}>
          {/* <MapView.Marker
            coordinate={this.props.userLocation.coordinates}
            draggable={true}
            flat={true}
            onDragEnd={(e) => this.onUserLocationChange(e)}
            zIndex={100} />}

          {this.props.serviceProvidersForMap.map((serviceProvider, index) => {
            return (
              <MapView.Marker
                coordinate={{ latitude: parseFloat(serviceProvider.latitude), longitude: parseFloat(serviceProvider.longitude) }}
                identifier={(serviceProvider.id).toString()}
                key={index}
                flat={true}
                anchor={{ x: 0.3, y: 0.8 }}
              >
                <Image source={Images.icLocationPin} style={{ height: 51, width: 33 }} />
              </MapView.Marker>
            );
          })}
        </MapView>*/}
        <TouchableOpacity
          style={styles.btnCurrentPosition}
          onPress={this.focus}
        >
          <Image
            source={Images.icCurrentLocation}
            style={styles.imageCurrentPosition}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View pointerEvents="none" style={styles.pinView}>
          <Image
            pointerEvents="none"
            source={Images.currentLocationPin}
            style={styles.pin}
          />
        </View>
        <View style={styles.btnStyle}>
          <Button
            onPress={this.onChangeLocationPress}
            title={AppConstants.changeLocation}
            btnColor={colors.btnBlue}
            txtColor={colors.white}
            btnStyle={{ flex: 1 }}
          />
        </View>
        {this.props.loading && <Spinner key="spinner" />}
      </View>
    );
  }

  onUserLocationChange(region) {
    this.setState({
      location: { latitude: region.latitude, longitude: region.longitude }
    });
  }

  focus = () => {
    this.map.fitToCoordinates([this.props.userLocation.coordinates], options);
  };

  onChangeLocationPress = () => {
    store.dispatch({ type: ActionTypes.MAP_LOCATION_LOADING });
    const latitude = this.state.location.latitude;
    const longitude = this.state.location.longitude;
    this.props.getCurrentLocationName(latitude, longitude, () =>
      store.dispatch(NavigationActions.back())
    );
  };
}

const mapStateToProp = state => {
  return {
    user: state.signIn.user,
    userLocation: state.signIn.location,
    serviceProvidersForMap: state.map.serviceProvidersForMap,
    loading: state.map.loading
  };
};
export default connect(
  mapStateToProp,
  {
    getServiceProviders,
    getCurrentLocationName
  }
)(Map);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnStyle: {
    position: "absolute",
    marginLeft: 25,
    marginRight: 25,
    bottom: 15,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "space-around",
    zIndex: 20
  },
  pinView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },
  pin: {
    height: 51,
    width: 33,
    marginBottom: 50
  },
  btnCurrentPosition: {
    position: "absolute",
    top: 5,
    right: 15,
    zIndex: 20
  },
  imageCurrentPosition: {
    height: 70,
    width: 40,
    tintColor: colors.black
  }
});

// import React, { Component } from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import MapView, { ProviderPropType, Marker, Callout, AnimatedRegion } from 'react-native-maps';
// import { connect } from 'react-redux';
// import { getServiceProviders, getCurrentLocationName } from '../../../Store/Action';
// import { Images, colors } from '../../../Assets';
// import { Button } from '../../../ReuseableComponents';
// import {AppConstants} from '../../../AppConstants';
// import ActionTypes from '../../../Store/Types';
// import {store} from '../../../../App';
// import { Spinner } from '../../../utility/common';
// import { NavigationActions } from 'react-navigation'

// const timeout = 3000;

// class Map extends Component {
//   isDraggred = false

//   state = { location: null }

//   componentDidMount() {
//     let markerIDs = [];

//     if (this.props.serviceProvidersForMap.length > 0) {
//       this.props.serviceProvidersForMap.map((item) => markerIDs.push((item.id).toString()));
//       animationTimeout = setTimeout(() => {
//         this.focusMap(markerIDs, true);
//       }, timeout);
//     }
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView
//           provider={"google"}
//           ref={map => this.map = map}
//           style={styles.container}>
//           <MapView.Marker
//             coordinate={this.props.userLocation.coordinates}
//             draggable={true}
//             flat={true}
//             onDragEnd={(e) => this.onUserLocationChange(e)}
//             zIndex={10} />

//           {this.props.serviceProvidersForMap.map((serviceProvider, index) => {
//             return (
//               <MapView.Marker
//                 coordinate={{ latitude: parseFloat(serviceProvider.latitude), longitude: parseFloat(serviceProvider.longitude) }}
//                 identifier={(serviceProvider.id).toString()}
//                 key={index}
//                 flat={true}
//                 anchor={{ x: 0.3, y: 0.8 }}
//               >
//                 <Image source={Images.icLocationPin} style={{ height: 51, width: 33 }} />
//               </MapView.Marker>
//             );
//           })}
//         </MapView>
//         <View style={styles.btnStyle}>
//           <Button
//             onPress={this.onChangeLocationPress}
//             title={AppConstants.changeLocation}
//             btnColor={colors.btnBlue}
//             txtColor={colors.white}
//             btnStyle={{ flex: 1 }} />
//         </View>
//         {this.props.loading && <Spinner key='spinner' />}
//       </View>
//     );
//   }

//   onUserLocationChange(e) {
//     this.setState({ location: e.nativeEvent.coordinate })
//     this.draggred = true
//   }

//   onChangeLocationPress = () => {
//     store.dispatch({ type: ActionTypes.MAP_LOCATION_LOADING })
//     let latitude ,longitude = ''
//     if(this.draggred){
//      latitude = this.state.location.latitude
//      longitude = this.state.location.longitude
//     }else{
//       latitude = this.props.userLocation.coordinates.latitude
//       longitude = this.props.userLocation.coordinates.longitude
//     }
//     this.props.getCurrentLocationName(
//       latitude,
//       longitude,
//       () => store.dispatch(NavigationActions.back()))
//   }

//   focusMap(markers) {
//     options = {
//       edgePadding: {
//         top: 50,
//         right: 50,
//         bottom: 50,
//         left: 50,
//       },
//       animated: true
//     }
//     if (this.map !== null) {
//       if (this.props.serviceProvidersForMap.length > 0) {
//         this.map.fitToSuppliedMarkers(markers, options);
//       }
//     }
//   }
// }

// const mapStateToProp = state => {
//   return {
//     user: state.signIn.user,
//     userLocation: state.signIn.location,
//     serviceProvidersForMap: state.map.serviceProvidersForMap,
//     loading: state.map.loading
//   };
// };
// export default connect(mapStateToProp,
//   {
//     getServiceProviders,
//     getCurrentLocationName
//   }
// )(Map);

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   btnStyle: {
//     position: 'absolute',
//     marginLeft: 25,
//     marginRight: 25,
//     bottom: 15,
//     flexDirection: "row",
//     alignSelf: "stretch",
//     justifyContent: "space-around"
//   },
// });
