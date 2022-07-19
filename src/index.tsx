import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from "./reducers/index";

const store = createStore(rootReducer, {
    auth: {
        authentichated: localStorage.getItem("token")
    }
}, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App>
               <div>Hello test</div>

            </App>
        </Router>
    </Provider>
    , document.getElementById('root'));


