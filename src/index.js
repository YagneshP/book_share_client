import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {createStore, combineReducers, compose, applyMiddleware} from "redux";
import ReduxThunk from "redux-thunk";
import userReducer from "./store/reducers/users"

//reducer to create store
const rootRducer = combineReducers({
	user : userReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//create store
const store = createStore(rootRducer, composeEnhancers(applyMiddleware(ReduxThunk)));

ReactDOM.render(
	<Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
	</Provider>,
  document.getElementById('root')
);



