import HttpServiceManager from '../../HttpServiceManager/HttpServiceManager';
import constant from '../../HttpServiceManager/constant';
import { NavigationActions } from 'react-navigation'
import { Alerts} from "../../utility/utility"
import ActionTypes from '../../Store/Types';

export const changePasswordChange = (text,type) => {
  return {
      type: type,
      payload: text
  }
}

export const changePassword = (reqData) => {

  return (dispatch) => {
    dispatch({type:ActionTypes.CHANGE_PASSWORD_LOADING})
    HttpServiceManager.getInstance().request(constant.changePassword, reqData,'post').then(({ response,message }) => {
      dispatch({
        type: ActionTypes.CHANGE_PASSWORD_SUCCESS,
      });
      setTimeout(() => {
        Alerts(
          message,
          () => dispatch(NavigationActions.back())
        )
      }, 510);
    })
      .catch((error) => {
        dispatch({
          type: ActionTypes.CHANGE_PASSWORD_FAIL,
          payload: error
        });
      });
  }
}

export const resetChangePassword = () => {
  return {
      type: ActionTypes.RESET_CHANGE_PASSWORD,
  }
}
