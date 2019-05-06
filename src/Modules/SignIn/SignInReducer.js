import ActionTypes from "../../Store/Types";
import { AppConstants } from "../../AppConstants";
// import RNRestart from "react-native-restart";
import { setLocale } from "../../Modules/Localization/i18n";

const initialState = {
  email: "",
  password: "",
  user: null,
  error: "",
  loading: false,
  language: "",
  logout: false,
  location: null
  // userType: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNIN_EMAIL_CHANGED:
      return {
        ...state,
        email: action.payload
      };
    case ActionTypes.SIGNIN_PASSWORD_CHANGED:
      return {
        ...state,
        password: action.payload
      };
    case ActionTypes.SET_USER_TYPE:
      return {
        ...state,
        email: "",
        password: ""
        // userType: action.payload,
      };
    case ActionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        email: "",
        password: "",
        error: "",
        user: action.payload,
        loading: false
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        //userType: AppConstants.customer,
        user: action.payload
      };
    case ActionTypes.SIGNIN_FAIL:
      return {
        ...state,
        password: "",
        loading: false
      };
    case ActionTypes.RESET_SIGNIN_SIGNUP:
    case ActionTypes.RESET_SIGNIN_FORGOT:
      return {
        ...state,
        email: "",
        password: ""
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        email: "",
        password: "",
        error: "",
        user: null,
        logout: true,
        loading: false
      };
    case ActionTypes.SIGNIN_LOADING:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.SET_LANGUAGE:
      return {
        ...state,
        language: action.payload
      };
    case ActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload
      };
    case ActionTypes.USER_LOCATION_CHANGED:
      return {
        ...state,
        location: action.payload,
        loading: false
      };
    case ActionTypes.USER_LOCATION_LOADING:
      return {
        ...state,
        loading: true
      };
    case ActionTypes.RESET_USER_LOCATION_CHANGED:
      return {
        ...state,
        location: null
      };
    case ActionTypes.SET_LANGUAGE_ON_STARTUP:
      return {
        ...state,
        language: getCurrentLocale()
      };
    case ActionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
        loading: action.loading
      };
    case ActionTypes.CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        loading: false
      };
    // case 'restart':
    //   RNRestart.Restart();
    //   return state
    default:
      return state;
  }
};
