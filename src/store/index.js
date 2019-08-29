import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import createSagaMiddleware from "redux-saga";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native
import { createLogger } from "redux-logger";
import reducers from "../reducers";
import rootSaga from "../sagas";

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

/* redux logger config */
const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
  diff: true
});

/* redux persist config */
const persistConfig = {
  key: "root",
  storage,
  whitelist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);

/* saga config */
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  persistedReducer,
  applyMiddleware(sagaMiddleware, logger)
);
const persistor = persistStore(store);

// run the saga
sagaMiddleware.run(rootSaga);

export { store, persistor };
