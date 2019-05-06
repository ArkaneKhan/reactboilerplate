import ActionTypes from "../../Store/Types";
import { NavigationActions, StackActions } from "react-navigation";
import HttpServiceManager from "../../HttpServiceManager/HttpServiceManager";
import constant from "../../HttpServiceManager/constant";
import { setLocale } from "../../Modules/Localization/i18n";
// import RNRestart from "react-native-restart";
import { updateAppConstants } from "../../AppConstants";

export const signInChange = (text, type) => {
  return {
    type: type,
    payload: text
  };
};

export const setUserType = userType => {
  return dispatch => {
    dispatch({
      type: ActionTypes.SET_USER_TYPE,
      payload: userType
    });
    dispatch(NavigationActions.navigate({ routeName: "Signin" }));
  };
};

export const signIn = ({ email, password }) => {
  return dispatch => {
    dispatch({ type: ActionTypes.SIGNIN_LOADING });
    HttpServiceManager.getInstance()
      .request(constant.userLogin, { email, password }, "post")
      .then(({ response, meta }) => {
        HttpServiceManager.getInstance().userToken = response.token;
        dispatch({
          type: ActionTypes.SIGNIN_SUCCESS,
          payload: response
        });
        dispatch(
          NavigationActions.navigate({
            routeName:
              response.user_type === 1 ? "LocationScreen" : "WorkerDrawerStack"
          })
        );
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.SIGNIN_FAIL,
          payload: error
        });
      });
  };
};

export const socialLogin = data => {
  return dispatch => {
    dispatch({ type: ActionTypes.SIGNIN_LOADING });
    HttpServiceManager.getInstance()
      .request(constant.socialLogin, data, "post")
      .then(({ response, meta }) => {
        HttpServiceManager.getInstance().userToken = response.token;
        dispatch({
          type: ActionTypes.SIGNIN_SUCCESS,
          payload: response
        });
        dispatch(
          NavigationActions.navigate({
            routeName:
              response.user_type === 1 ? "LocationScreen" : "WorkerDrawerStack"
          })
        );
      })
      .catch(error => {
        dispatch({
          type: ActionTypes.SIGNIN_FAIL,
          payload: error
        });
      });
  };
};

export const resetSignInSignUp = () => {
  return {
    type: ActionTypes.RESET_SIGNIN_SIGNUP
  };
};

export const resetSignInForgot = () => {
  return {
    type: ActionTypes.RESET_SIGNIN_FORGOT
  };
};

export const logout = () => {
  return dispatch => {
    dispatch(NavigationActions.navigate({ routeName: "AuthStack" }));
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Signin" })]
    });
    setTimeout(dispatch.bind(null, resetAction), 510);

    dispatch({
      type: ActionTypes.LOGOUT
    });
  };
};

// export const changeLanguage = (language, navigate = false, restart = false) => {
//   return (dispatch) => {
//     setLocale(language);
//     dispatch({
//       type: ActionTypes.CHANGE_LANGUAGE,
//       payload: language,
//       loading : navigate === true ? false : true
//     })
//     if (navigate) {
//       dispatch(NavigationActions.navigate({ routeName: 'Signin' }));
//     } else {
//       setTimeout(() => {
//         dispatch({
//           type: ActionTypes.CHANGE_LANGUAGE_SUCCESS,
//         })
//         restart && RNRestart.Restart();
//       }, 1000);
//     }
//   }
// }

// export const setLanguageOnStartup = () => {
//   return {
//     type: SET_LANGUAGE_ON_STARTUP
//   }
// }
