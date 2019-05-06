import ActionTypes from '../../Store/Types';

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  imageUrl: '',
  error: '',
  loading: false,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_USERNAME_CHANGED:
      return ({
        ...state,
        username: action.payload,
      });
    case ActionTypes.SIGNUP_EMAIL_CHANGED:
      return ({
        ...state,
        email: action.payload,
      });
    case ActionTypes.SIGNUP_PASSWORD_CHANGED:
      return ({
        ...state,
        password: action.payload,
      });
    case ActionTypes.SIGNUP_CONFIRMPASSWORD_CHANGED:
      return ({
        ...state,
        confirmPassword: action.payload,
      });
    case ActionTypes.SIGNUP_IMAGE_CHANGED:
      return ({
        ...state,
        imageUrl: action.payload,
      });
    case ActionTypes.SIGNUP_SUCCESS:
    case ActionTypes.RESET_SIGNIN_SIGNUP:
      return ({
        ...state,
        ...initialState,
        loading: false
      });
    case ActionTypes.SIGNUP_FAIL:
      return ({
        ...state,
        password : '',
        confirmPassword : '',
        loading: false
      });
    case ActionTypes.SIGNUP_LOADING:
      return ({
        ...state,
        loading: true
      });
    default:
      return state;
  }
}