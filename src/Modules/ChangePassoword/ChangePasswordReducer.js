const INITIAL_STATE = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  error: '',
  loading: false,
  success: false
}
import ActionTypes from '../../Store/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.CURRENT_PASSWORD_CHANGED:
      return { ...state, currentPassword: action.payload }
    case ActionTypes.NEW_PASSWORD_CHANGED:
      return { ...state, newPassword: action.payload }
    case ActionTypes.CONFIRM_PASSWORD_CHANGED:
      return { ...state, confirmPassword: action.payload }
    case ActionTypes.CHANGE_PASSWORD_LOADING:
      return { ...state, loading: true }
    case ActionTypes.CHANGE_PASSWORD_SUCCESS:
      return { ...state, ...INITIAL_STATE, loading: false, success: true }
    case ActionTypes.CHANGE_PASSWORD_FAIL:
      return { ...state, error: action.payload, loading: false }
    case ActionTypes.RESET_CHANGE_PASSWORD:
      return { ...state, ...INITIAL_STATE }
    default:
      return state;
  }
}