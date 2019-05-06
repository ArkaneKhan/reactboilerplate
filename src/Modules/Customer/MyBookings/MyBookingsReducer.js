import ActionTypes from '../../../Store/Types';
const INITIAL_STATE = {
  scheduleData: [],
  completedRequestData: [],
  error: '',
  refreshing: false,
  loading: false,
  nextPage: 0,
  currentPage: 0
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case ActionTypes.GET_COMPLETED_LOADING:
    case ActionTypes.GET_SCHEDULE_LOADING:
      return ({
        ...state,
        refreshing: true
      });

    case ActionTypes.GET_SCHEDULE_SUCCESS:
      return ({
        ...state,
        scheduleData: action.payload,
        nextPage: action.meta.last_page,
        refreshing: false,
        currentPage: action.meta.current_page
      });
    case ActionTypes.GET_SCHEDULE_LOADMORE:
      return {
        ...state, scheduleData: [...state.scheduleData, ...action.payload],
        nextPage: action.meta.last_page,
        currentPage: action.meta.current_page
      }

    case ActionTypes.GET_COMPLETED_SUCCESS:
      return ({
        ...state,
        completedRequestData: action.payload,
        nextPage: action.meta.last_page,
        refreshing: false,
        currentPage: action.meta.current_page
      });
    case ActionTypes.GET_COMPLETED_LOADMORE:
      return {
        ...state, completedRequestData: [...state.completedRequestData, ...action.payload],
        nextPage: action.meta.last_page,
        currentPage: action.meta.current_page
      }
    case ActionTypes.GET_COMPLETED_FAIL:
    case ActionTypes.GET_SCHEDULE_FAIL:
      return {
        ...state,
        refreshing: false
      }
    case ActionTypes.REQUEST_CONFIRM_LOADING:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.REQUEST_CONFIRM_SUCCESS:
      return {
        ...state,
        loading: false,
        scheduleData: state.scheduleData.filter((item) => item.id !== action.payload.id),
        completedRequestData: [action.payload, ...state.completedRequestData,]
        // scheduleData: [action.payload, ...state.scheduleData,]
      }
    case ActionTypes.REQUEST_CONFIRM_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }
}