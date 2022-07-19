import { combineReducers } from "redux";
import authUser from "./auth";
import { reducer as formReducer } from "redux-form"

export default combineReducers({
    auth: authUser,
    form: formReducer
});