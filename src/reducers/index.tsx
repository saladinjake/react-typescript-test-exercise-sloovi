import { combineReducers } from "redux";
import authReducer from "./auth";
import assignedUsersReducer from "./assigned_users"
import taskReducer from "./task"
import { reducer as formReducer } from "redux-form"

export default combineReducers({
    auth: authReducer,
    assignedUser:assignedUsersReducer,
    taskReducer: taskReducer,
    form: formReducer
});