import { take, put, call, fork } from "redux-saga/effects";
import { success, failure } from "../actions/Login";
import { NavigationActions } from "react-navigation";
import HttpServiceManager from '../services/HttpServiceManager';
import constant from "../services/constant";

function* watchRequest() {
  while (true) {
    const { payload } = yield take('LOGIN.REQUEST');

    try {
      const response = yield HttpServiceManager.getInstance().request(constant.userLogin, payload, 'post')
      console.log('response: ', response)
      // yield put(success(response.data));
      // yield put(NavigationActions.navigate({ routeName: "home" }));
      // Utils.setUserToken(response.data.token);
    } catch (err) {
      //   Utils.MessageAlertError("", err.message ? err.message : "");
      console.log("err: ", err)
      //yield put(failure(err.message));
    }
  }
}

export default function* root() {
  yield fork(watchRequest);
}
