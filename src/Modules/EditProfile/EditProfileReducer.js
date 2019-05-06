const initialState = {
  error: '',
  user: null,
  loading: false
}
import ActionTypes from '../../Store/Types';

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_EDIT_USER:
      return {
        ...state,
        user: action.payload
      }
    case ActionTypes.EDIT_USER:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.EDIT_USERNAME_CHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload
        }
      }
    case ActionTypes.EDIT_PHONENO_CHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          mobile_no: action.payload
        }
      }
    case ActionTypes.EDIT_IMAGE_CHANGED:
      return {
        ...state,
        user: {
          ...state.user,
          image_url: action.payload
        }
      }
    case ActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false
      }
    case ActionTypes.EDIT_USER_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    default:
      return state;
  }
}