import axios from "axios";
import { Dispatch } from "react";
//import axios from "../services/axios.services"
import {
  AUTH_USER,
  AUTH_ERROR,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  CREATE_ITEM,
  RETRIEVE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "./types";

// CRUD API class
import SlooviCrudApiService from "../services/crudeapi.services";

import Config from "../config/config"

// AUTHENTICATION  ACTION DISPATCHES
interface CredentialsProps {
  name: string;
  password: string;
}

/*
*@name: authenticator Actions
*@desc: when dispatched would trigger user authentication

*/
export const authAction = (
  credentials: CredentialsProps,
  redirectTo: () => void
) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const data: string = JSON.stringify(credentials);

      const responseApi = await fetch(Config.baseUrl+"/login", {
        method: "POST",
        body: data,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          credentials: "include",
        },
      });

      const apiResponse = await responseApi.json();

      //console.log(apiResponse.results);
      localStorage.setItem("token", apiResponse.results.token);
      localStorage.setItem("company_id", apiResponse.results.company_id);

      dispatch({
        type: AUTH_USER,
        payload: apiResponse.results.token,
      });
     // console.log("you are here");

      redirectTo();
    } catch (error) {
      //console.log(error);
      dispatch({ type: AUTH_ERROR, payload: "Not authorized" });
    }
  };
};
// FETCH DROPDOWN USERS DISPATCHES
interface AssignedUsersProps {
  username: string;
  firstname: string;
  lastname: string;
}

/*
*@name: admins fetches or assigned users
*@desc: when dispatched would trigger list of assigned users

*/
const fetchRequest = () => ({ type: FETCH_USERS_REQUEST });

/*
*@name: admins fetches or assigned users
*@desc: when dispatched would trigger failed results

*/
const fetchFailure = (error: string) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

/*
*@name: admins fetches or assigned users
*@desc: when dispatched would trigger list of assigned users

*/
const fetchSuccess = (users: { name: string; company_id: string }[]) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

/*
*@name: admins fetches or assigned users
*@desc: action figures to get api data

*/
export const getAssignedUsers = () => async (dispatch: Dispatch<any>) => {
  dispatch(fetchRequest());
  try {
    const company_id = localStorage.getItem("company_id");
    const token = localStorage.getItem("token");

    const responseApi = await fetch(Config.baseUrl+
      `/team?product=outreach&company_id=${company_id}`,
      {
        method: "GET",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          credentials: "include",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );

    const apiResponse = await responseApi.json();

    ////console.log(apiResponse.results.data);
    let users: {
      first: string;
      company_id: string;
      last: string;
      user_id: string;
    }[] = apiResponse.results.data;
    const usersList: { name: string; company_id: string; user_id: string }[] =
      users.map((user) => ({
        name: user.first + " " + user.last,
        company_id: user.company_id,
        user_id: user.user_id,
      }));

    ////console.log(usersList);
    dispatch(fetchSuccess(usersList));
  } catch (error) {
    ////console.log(error.message);
    dispatch(fetchFailure(error.message));
  }
};

// CRUD API DISPATCHES
interface TaskProps {
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

export const createTask =
  (data: TaskProps) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await SlooviCrudApiService.createTask(data);

      const resolvedData = await res.json();
      ////console.log(resolvedData)
      dispatch({
        type: CREATE_ITEM,
        payload: resolvedData.results,
      });

      return Promise.resolve(res.results);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const getTasks = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await SlooviCrudApiService.getTasks();
    ////console.log("has been called")

    const resolvedData = await res.json();
    ////console.log(resolvedData)
    dispatch({
      type: RETRIEVE_ITEM,
      payload: resolvedData.results,
    });

    return Promise.resolve(res.results);
  } catch (err) {
    ////console.log(err);
  }
};

export const updateTask =
  (id: string, data: TaskProps) => async (dispatch: Dispatch<any>) => {
    try {
      const res = await SlooviCrudApiService.updateTask(id, data);

      const resolvedData = await res.json();
      //console.log("Api is reaching...")
      //console.log(resolvedData.results)

      dispatch({
        type: UPDATE_ITEM,
        payload: resolvedData.results,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const deleteTask =
  (e: React.MouseEvent<HTMLElement>, id: string) =>
  async (dispatch: Dispatch<any>) => {
    try {
      const res = await SlooviCrudApiService.deleteTask(id);

      const resolvedData = await res.json();

      //console.log(resolvedData.results)

      dispatch({
        type: DELETE_ITEM,
        payload: { id },
      });
    } catch (err) {
      ////console.log(err);
    }
  };

export const getTask = (id: string) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await SlooviCrudApiService.getTask(id);

    dispatch({
      type: RETRIEVE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    ////console.log(err);
  }
};
