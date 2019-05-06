import ActionTypes from '../../../Store/Types';
const INITIAL_STATE = {
  serviceProviders: [],
  companyDetails: null,
  error: '',
  refreshing: false,
  loading: false,
  nextPage: 0,
  currentPage: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_SERVICE_PROVIDERS:
      return ({
        ...state,
        refreshing: true
      });
    case ActionTypes.GET_SERVICE_PROVIDERS_LOADING:
      return ({
        ...state,
        loading: true
      });

    case ActionTypes.GET_SERVICE_PROVIDERS_SUCCESS:
      return ({
        ...state,
        serviceProviders: action.payload,
        nextPage: action.meta.last_page,
        refreshing: false,
        loading: false,
        currentPage: action.meta.current_page
      });
    case ActionTypes.GET_SERVICE_PROVIDERS_LOADMORE:
      return {
        ...state,
        serviceProviders: [...state.serviceProviders, ...action.payload],
        nextPage: action.meta.last_page,
        loading: false,
        currentPage: action.meta.current_page
      }
    case ActionTypes.GET_SERVICE_PROVIDERS_FAIL:
      return ({
        ...state,
        refreshing: false,
        loading: false
      });
    case ActionTypes.SET_COMPANY_DETAILS:
      return ({
        ...state,
        companyDetails: action.payload
      });
    case ActionTypes.LOGOUT:
      return ({
        ...state
      })
    default:
      return state;
  }
}