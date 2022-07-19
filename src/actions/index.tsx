import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';
import { Dispatch } from 'react';

interface ValuesProps {
    name: string;
    password: string;
}

export const authAction = (values: ValuesProps, redir: () => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const resp = await axios.post("https://reqres.in/api/register", values);
            dispatch({ type: AUTH_USER, payload: resp.data.token });
            localStorage.setItem("token", resp.data.token);
            redir();
        } catch (error) {
            dispatch({ type: AUTH_ERROR, payload: "Not authorized" });
        }
    }
};