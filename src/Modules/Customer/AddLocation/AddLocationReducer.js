import ActionTypes from '../../../Store/Types';
const INITIAL_STATE = {
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_LOCATION_LOADING:
      return ({
        ...state,
        loading: true
      });
    case ActionTypes.USER_LOCATION_CHANGED:
    case ActionTypes.ADD_LOCATION_FAIL :
      return ({
        ...state,
        loading: false
      });
    default:
      return state;
  }
}