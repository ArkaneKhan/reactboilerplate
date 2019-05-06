import ActionTypes from '../../Store/Types';
import { NavigationActions } from 'react-navigation'
import HttpServiceManager from '../../HttpServiceManager/HttpServiceManager';
import constant from '../../HttpServiceManager/constant';
import { Alerts } from '../../utility/utility';

export const forgotChange = (text) => {
  return {
    type: ActionTypes.FORGOT_EMAIL_CHANGED,
    payload: text
  }
}

export const forgot = (email) => {

  return (dispatch) => {
    dispatch({ type: ActionTypes.FORGOT_LOADING })
    HttpServiceManager.getInstance().request(constant.forgotPassword, { email }, 'post').then(({ response, meta, message }) => {
      dispatch({
        type: ActionTypes.FORGOT_SUCCESS,
      });
      setTimeout(() => {
        Alerts(
          message,
          () => dispatch(NavigationActions.back())
        )
      }, 510);

    }).catch((error) => {
      dispatch({
        type: ActionTypes.FORGOT_FAIL,
        payload: error
      });
    })
  }
}