import { combineReducers } from "redux";
import homeReducre from "./homeReducre";

const appReducer = combineReducers({
  homeReducre
});

const rootReducer = (state, action) => {
  // if (action.type === LOGOUT) {
  //   const { user, myRentRequests, ...rest } = state;
  //   state = { ...rest, user: undefined, myRentRequests: undefined };
  // }
  return appReducer(state, action);
};

export default rootReducer;
