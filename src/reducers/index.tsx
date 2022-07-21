import { combineReducers } from "redux";
import authReducer from "./auth";
import assignedUsersReducer from "./assigned_users";
import taskReducer from "./task";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  auth: authReducer,
  assignedUser: assignedUsersReducer,
  taskReducer: taskReducer,
  form: formReducer,
});

// define the root return type here
export type DefaultingRootState = ReturnType<typeof rootReducer>;

export default rootReducer;
