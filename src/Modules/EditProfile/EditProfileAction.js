import ActionTypes from '../../Store/Types';
import { NavigationActions } from 'react-navigation'
import HttpServiceManager from '../../HttpServiceManager/HttpServiceManager';
import constant from '../../HttpServiceManager/constant';

export const editChange = (text, type) => {
  return {
    type: type,
    payload: text
  }
}

export const setEditUser = (user, userType) => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SET_EDIT_USER,
      payload: user
    })
    dispatch(NavigationActions.navigate({ routeName: 'EditProfile',params : {userType : userType} }))
  }
}

export const updateUser = (user) => {
  return (dispatch) => {
    dispatch({type:ActionTypes.EDIT_USER})
    HttpServiceManager.getInstance().request(constant.updateUser, user, 'post').then(({ response, meta }) => {
      dispatch({
        type: ActionTypes.EDIT_USER_SUCCESS,
        payload: response
      });
      dispatch(NavigationActions.back());
    }).catch((error) => {
      dispatch({
        type: ActionTypes.EDIT_USER_FAIL,
        payload: error
      });
    })
  }
}