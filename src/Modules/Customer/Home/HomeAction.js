import HttpServiceManager from '../../../HttpServiceManager/HttpServiceManager';
import constant from '../../../HttpServiceManager/constant';
import ActionTypes from '../../../Store/Types';
import { NavigationActions } from 'react-navigation'
import axios from 'axios';

export const getServiceProviders = (reqData, refreshing = true, page = 1, loading = false) => {
  return (dispatch) => {
    if (refreshing) {
      dispatch({ type: ActionTypes.GET_SERVICE_PROVIDERS })
    } else {
      dispatch({ type: ActionTypes.GET_SERVICE_PROVIDERS_LOADING })
    }
    HttpServiceManager.getInstance().request(constant.getServiceProviders + '?page=' + page, reqData, 'get').then(({ response, meta }) => {
      if (refreshing || loading) {
        dispatch({
          type: ActionTypes.GET_SERVICE_PROVIDERS_SUCCESS,
          payload: response,
          meta: meta
        });
      } else {
        dispatch({
          type: ActionTypes.GET_SERVICE_PROVIDERS_LOADMORE,
          payload: response,
          meta: meta
        });
      }
    })
      .catch((error) => {
        dispatch({
          type: ActionTypes.GET_SERVICE_PROVIDERS_FAIL,
          payload: error
        });
      });
  }
}

export const setCompanyDetails = (companyDetails, route) => {

  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_COMPANY_DETAILS,
      payload: companyDetails
    })
    dispatch(NavigationActions.navigate({ routeName: route }));
  }
}

export const setServiceProvidersForMap = (serviceProviders) => {

  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_SERVICE_PROVIDERS_FOR_MAP,
      payload: serviceProviders
    })
    dispatch(NavigationActions.navigate({ routeName: 'Map' }));
  }
}
