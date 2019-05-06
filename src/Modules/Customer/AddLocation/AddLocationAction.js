import HttpServiceManager from '../../../HttpServiceManager/HttpServiceManager';
import constant from '../../../HttpServiceManager/constant';
import ActionTypes from '../../../Store/Types';
import { NavigationActions } from 'react-navigation'
import axios from 'axios';
import {AppConstants} from '../../../AppConstants';

export const locationChanged = (location, navigateTo) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.USER_LOCATION_CHANGED,
      payload: location
    })
    dispatch(NavigationActions.navigate({ routeName: navigateTo }));
  }
}

export const resetLocationChanged = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.RESET_USER_LOCATION_CHANGED,
    })
  }
}

export const getCurrentLocationName = (latitude, longitude, navigateTo) => {
  const coordinates = latitude + "," + longitude;
  return (dispatch) => {
    axios.get(constant.getCurrentLocation + coordinates + constant.googleMapApiKey)
      .then(function (response) {
        if(response.data.results.length > 0){
          const { formatted_address } = response.data.results[0]
          const location = { address: formatted_address, coordinates: { latitude: latitude, longitude: longitude } }
          dispatch({
            type: ActionTypes.USER_LOCATION_CHANGED,
            payload: location
          });
          navigateTo()
        }else{
          dispatch({
            type: ActionTypes.USER_LOCATION_CHANGED_FAIL,
          });
          HttpServiceManager.checkError({message:AppConstants.alertUnknownError})
        }
      })
      .catch(function (error) {
        console.log("current location name error ", error)
      });
  }
}

