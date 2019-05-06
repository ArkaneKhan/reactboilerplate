import ActionTypes from '../../Store/Types';
import { NavigationActions } from 'react-navigation'
import HttpServiceManager from '../../HttpServiceManager/HttpServiceManager';
import constant from '../../HttpServiceManager/constant';

export const signUpChange = (text, type) => {
  return {
    type: type,
    payload: text
  }
}

export const signUp = (reqData) => {

  return (dispatch) => {
    dispatch({type: ActionTypes.SIGNUP_LOADING})
    HttpServiceManager.getInstance().request(constant.userSignup, reqData,'post').then(({ response, meta }) => {
      HttpServiceManager.getInstance().userToken = response.token
      dispatch({
        type: ActionTypes.SIGNUP_SUCCESS,
        payload: response
      });
      dispatch(NavigationActions.navigate({ routeName: 'LocationScreen' }));
    })
      .catch((error) => {
        dispatch({
          type: ActionTypes.SIGNUP_FAIL,
          payload: error
        });
      });
  }
}