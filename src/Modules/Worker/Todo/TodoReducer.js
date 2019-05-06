const INITIAL_STATE = {
  todo: [],
  error: '',
  refreshing: false,
  loading: false,
  nextPage: 0,
  currentPage: 0
}
import ActionTypes from '../../../Store/Types';

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case ActionTypes.GET_TODO_LIST:
      return {
        ...state,
        refreshing: true
      }
    case ActionTypes.GET_TODO_LIST_SUCCESS:
      return {
        ...state,
        todo: action.payload,
        nextPage: action.meta.last_page,
        refreshing: false,
        currentPage: action.meta.current_page
      }
    case ActionTypes.GET_TODO_LIST_LOADMORE:
      return {
        ...state,
        todo: [...state.todo, ...action.payload],
        nextPage: action.meta.last_page,
        currentPage: action.meta.current_page
      }
    case ActionTypes.GET_TODO_LIST_FAIL:
      return {
        ...state,
        refreshing: false
      }
    // Node push request in todo array
    // case ActionTypes.REQUEST_ACCEPT_SUCCESS:
    //   return {
    //     ...state,
    //     todo: [action.payload, ...state.todo]
    //   }
    case ActionTypes.START_SERVICE_LOADING:
      return {
        ...state,
        loading: true
      }
    case ActionTypes.START_SERVICE_SUCCESS:
      return {
        ...state,
        loading: false,
        todo: state.todo.filter((item) => item.id !== action.payload.id),
      }
    case ActionTypes.START_SERVICE_FAIL:
      return {
        ...state,
        loading: false,
      }
    default:
      return state;
  }

}

