const INITIAL_STATE = {
    onGoing: [],
    done: [],
    error: '',
    loading: false,
    refreshing: false,
    nextPage: 0,
    currentPage: 0
}
import ActionTypes from '../../../Store/Types';

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.GET_ONGOING_LIST:
            return {
                ...state,
                refreshing: true
            }
        case ActionTypes.GET_ONGOING_LIST_SUCCESS:
            return {
                ...state,
                onGoing: action.payload,
                nextPage: action.meta.last_page,
                refreshing: false,
                currentPage: action.meta.current_page
            }
        case ActionTypes.GET_ONGOING_LIST_LOADMORE:
            return {
                ...state,
                onGoing: [...state.onGoing, ...action.payload],
                nextPage: action.meta.last_page,
                currentPage: action.meta.current_page
            }
        case ActionTypes.GET_ONGOING_LIST_FAIL:
            return {
                ...state,
                refreshing: true
            }
        case ActionTypes.DONE_REQUEST_LOADING:
            return {
                ...state,
                loading: true
            }
        // Node push todo request in onGoing array
        // case ActionTypes.START_SERVICE_SUCCESS:
        //     return {
        //         ...state,
        //         onGoing: [action.payload, ...state.onGoing,]
        //     }
        case ActionTypes.DONE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                onGoing: state.onGoing.filter((item) => item.id !== action.payload.id),
            }
        case ActionTypes.DONE_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
            }
        default:
            return state;
    }
}
