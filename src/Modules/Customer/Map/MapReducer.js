import ActionTypes from '../../../Store/Types';
const INITIAL_STATE = {
  serviceProvidersForMap: [],
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.SET_SERVICE_PROVIDERS_FOR_MAP:
      const data = action.payload.filter((item) => item.type === 'table')
      return ({
        ...state,
        serviceProvidersForMap: data.length > 0 ? data[0].data : data
      });
    case ActionTypes.MAP_LOCATION_LOADING:
      return ({
        ...state,
        loading: true
      });
    case ActionTypes.USER_LOCATION_CHANGED:
      return ({
        ...state,
        loading: false
      });
      case ActionTypes.USER_LOCATION_CHANGED_FAIL:
      return ({
        ...state,
        loading: false,
      });
    default:
      return state;
  }
}