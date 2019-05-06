import ActionTypes from '../../Store/Types';

const initialState = {
  email: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORGOT_EMAIL_CHANGED:
      return ({
        ...state,
        email: action.payload,
      });
    case ActionTypes.FORGOT_SUCCESS:
    case ActionTypes.RESET_SIGNIN_FORGOT:
      return ({
        ...state,
        ...initialState,
        loading: false
      });
    case ActionTypes.FORGOT_LOADING:
      return ({
        ...state,
        loading: true
      });
    case ActionTypes.FORGOT_FAIL:
      return ({
        ...state,
        loading: false
      });
    default:
      return state;
  }
}


