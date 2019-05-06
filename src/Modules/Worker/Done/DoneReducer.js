const INITIAL_STATE = {
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
        case ActionTypes.GET_DONE_REQUESTS:
            return {
                ...state,
                refreshing: true
            }
        case ActionTypes.GET_DONE_REQUESTS_SUCCESS:
            return {
                ...state,
                done: action.payload,
                nextPage: action.meta.last_page,
                refreshing: false,
                currentPage: action.meta.current_page
            }
        case ActionTypes.GET_DONE_REQUESTS_LOADMORE:
            return {
                ...state,
                done: [...state.done, ...action.payload],
                nextPage: action.meta.last_page,
                currentPage: action.meta.current_page
            }
        case ActionTypes.GET_DONE_REQUESTS_FAIL:
            return {
                ...state,
                refreshing: true
            }
        // Node push onGoing request in done array
        // case ActionTypes.DONE_REQUEST_SUCCESS:
        //     return {
        //         ...state,
        //         done: [action.payload, ...state.done,]
        //     }
        // Node push Request in done array
        // case ActionTypes.REQUEST_REJECT_SUCCESS:
        //     return {
        //         ...state,
        //         done: [action.payload, ...state.done,]
        //     }
        default:
            return state;
    }
}
