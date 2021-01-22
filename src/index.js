import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import userReducer from "./store/reducers/users";
import searchReducer from "./store/reducers/searchLib";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import formReducer from "./store/reducers/form";
import rentalUserReducer from "./store/reducers/rentalUser";

const persistConfig = {
  key: "root",
  storage,
};
//reducer to create store
const rootReducer = combineReducers({
  user: userReducer,
  library: searchReducer,
  form: formReducer,
  rentalUsers: rentalUserReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//create store
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));
const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(ReduxThunk))
);
const persistor = persistStore(store);
ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
