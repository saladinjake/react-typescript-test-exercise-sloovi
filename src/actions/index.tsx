import axios from 'axios';
import { Dispatch } from 'react';
import {
  AUTH_USER, 
  AUTH_ERROR,
  FETCH_USERS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS
} from "./types";

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
      `https://stage.api.sloovi.com/team?product=outreach&company_id=${company_id}&user_id=user_4ee4cf67ad474a27988bc0afb84cf472`,{
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
