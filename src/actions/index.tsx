import axios from 'axios';
import { Dispatch } from 'react';
import {
  AUTH_USER, 
  AUTH_ERROR,


  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,

  CREATE_ITEM,
  RETRIEVE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM

} from "./types";

// CRUD API DISPATCHES
import SlooviCrudApiService from "../services/crudeapi.services";


// AUTHENTICATION  ACTION DISPATCHES
interface CredentialsProps {
    name: string;
    password: string;
}

export const authAction = (credentials: CredentialsProps, redirectTo: () => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const apiResponse = await axios.post("https://stage.api.sloovi.com/login", credentials);

            dispatch({ 
               type: AUTH_USER,
               payload: apiResponse.data.results.token
            });

            console.log(apiResponse)
            localStorage.setItem("token", apiResponse.data.results.token);
            localStorage.setItem("company_id", apiResponse.data.results.company_id);
            redirectTo();
        } catch (error) {
            dispatch({ type: AUTH_ERROR, payload: "Not authorized" });
        }
    }
};





// FETCH DROPDOWN USERS DISPATCHES
interface AssignedUsersProps {
    username: string;
    firstname: string;
    lastname: string;
}

const fetchRequest = () => ({ type: FETCH_USERS_REQUEST });

const fetchFailure = (error: string) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

const fetchSuccess = (users: AssignedUsersProps) => ({
  type: FETCH_USERS_SUCCESS,
  payload:  users ,
});

export const getAssignedUsers = () => async (dispatch : Dispatch<any>) => {
  dispatch(fetchRequest());
  try {
    const company_id = localStorage.getItem("company_id");
    const token = localStorage.getItem("access_token")
    const  data  = await axios.get(
      `https://stage.api.sloovi.com/team?product=outreach&company_id=${company_id}`,{
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json',
        'Content-Type': 'application/json',          
      }
    });
    console.log(data)
   // const users = data.map((user : AssignedUsersProps) => ({ name: user.firstname + " " + user.lastname  }));
    //dispatch(fetchSuccess(users));
  } catch (error) {
    console.log(error.message)
    dispatch(fetchFailure(error.message));
  }
};


// CRUD API DISPATCHES
interface TaskProps{
  assigned_user: string;   //<id value from /team api response >, 
  task_date: string;  //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: boolean; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}  


export const createTask = (data: TaskProps) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await SlooviCrudApiService.createTask(data);

    dispatch({
      type: CREATE_ITEM,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getTasks = () => async (dispatch: Dispatch<any>) => {
  try {
    const res = await SlooviCrudApiService.getTasks();

    dispatch({
      type: RETRIEVE_ITEM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTask = (id: string, data: TaskProps) => async (dispatch: Dispatch<any>) => {
  try {
    const res = await SlooviCrudApiService.updateTask(id, data);

    dispatch({
      type: UPDATE_ITEM,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTask = (id:string) => async (dispatch: Dispatch<any>) => {
  try {
    await SlooviCrudApiService.deleteTask(id);

    dispatch({
      type: DELETE_ITEM,
      payload: { id },
    });
  } catch (err) {
    console.log(err);
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
    console.log(err);
  }
};