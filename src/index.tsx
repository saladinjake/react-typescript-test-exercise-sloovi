import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

/*
 * react starter kit for spa pages
 * using redux store house for state mgt
 */
import rootReducer from "./reducers/index";
import Home from "./components/Home/Home";
import Signin from "./components/Signin/Signin";
import Signout from "./components/Signout/Signout";
import Dashboard from "./components/Dashboard/Dashboard";

/*
 *
 * using redux store house for state mgt
 */
const store = createStore(
  rootReducer,
  {
    auth: {
      authenticated: localStorage.getItem("token"),
    },
  },
  applyMiddleware(thunk)
);

/*
 *
 * dom renderer
 */
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Route path="/" exact component={Home} />
        <Route path="/signin" component={Signin} />

        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signout" component={Signout} />
      </App>
    </Router>
  </Provider>,
  document.getElementById("root")
);
