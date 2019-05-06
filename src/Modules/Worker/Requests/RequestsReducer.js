const INITIAL_STATE = {
  customerRequests: [],
  error: '',
  refreshing: false,
  loading: false,
  nextPage: 0,
  currentPage: 0
}
import ActionTypes from '../../../Store/Types';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.GET_CUSTOMER_REQUESTS:
      return {
        ...state,
        refreshing: true
      }
    case ActionTypes.GET_CUSTOMER_REQUESTS_SUCCESS:
      return {
        ...state,
        customerRequests: action.payload,
        nextPage: action.meta.last_page,
        refreshing: false,
        currentPage: action.meta.current_page
      }
    case ActionTypes.GET_CUSTOMER_REQUESTS_LOADMORE:
      return {
        ...state, customerRequests: [...state.customerRequests, ...action.payload],
        nextPage: action.meta.last_page,
        currentPage: action.meta.current_page
      }
    case ActionTypes.GET_CUSTOMER_REQUESTS_FAIL:
      return {
        ...state,
        refreshing: false
      }
    case ActionTypes.REQUEST_ACCEPT_LOADING:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.REQUEST_ACCEPT_SUCCESS:
      return {
        ...state,
        loading: false,
        customerRequests: state.customerRequests.filter((item) => item.id !== action.payload.id)
      }
    case ActionTypes.REQUEST_ACCEPT_FAIL:
      return {
        ...state,
        loading: false,
      }
    case ActionTypes.REQUEST_REJECT_LOADING:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.REQUEST_REJECT_SUCCESS:
      return {
        ...state, loading: false,
        customerRequests: state.customerRequests.filter((item) => item.id !== action.payload.id)
      }
    case ActionTypes.REQUEST_REJECT_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}
