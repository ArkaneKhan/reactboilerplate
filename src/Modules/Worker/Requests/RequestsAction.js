import ActionTypes from '../../../Store/Types';
import HttpServiceManager from '../../../HttpServiceManager/HttpServiceManager';
import constant from '../../../HttpServiceManager/constant';
import { NavigationActions } from 'react-navigation'

export const processRequest = (jobId, status, Actiontypes, navigate) => {
  return (dispatch) => {
    dispatch({ type: Actiontypes[0] })
    HttpServiceManager.getInstance().request(constant.serviceBooking + '/' + jobId, { status }, 'put').then(({ response, meta }) => {
      dispatch({
        type: Actiontypes[1],
        payload: response,
        meta: meta
      });
      navigate && dispatch(NavigationActions.back());
    }).catch((error) => {
      dispatch({
        type: Actiontypes[2],
        payload: error
      });
    })
  }
}

export const getCustomerRequests = (type, Actiontypes, refreshing, page) => {

  return (dispatch) => {
    if (refreshing) {
      dispatch({ type: Actiontypes[0] })
    }
    HttpServiceManager.getInstance().request(constant.requests + '?page=' + page, { type }, 'get').then(({ response, meta }) => {
      if (refreshing) {
        dispatch({
          type: Actiontypes[1],
          payload: response,
          meta: meta
        });
      } else {
        dispatch({
          type: Actiontypes[2],
          payload: response,
          meta: meta
        });
      }
    }).catch((error) => {
      dispatch({
        type: Actiontypes[3],
        payload: error
      });
    })
  }
}
