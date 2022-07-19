import { AUTH_USER, AUTH_ERROR } from './types';
import axios from 'axios';
import { Dispatch } from 'react';

interface ValuesProps {
    name: string;
    password: string;
}


/*
company_id: "company_413ef22b6237417fb1fba7917f0f69e7"
token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NTgyMzA4MzcsIm5iZiI6MTY1ODIzMDgzNywianRpIjoiNWJhOGYwYjMtYTViOC00NzUwLWE1YzktYjUzMmFhOWQ1ZDgwIiwiaWRlbnRpdHkiOnsibmFtZSI6IlN1bmRhciBQaWNoYWkiLCJlbWFpbCI6InNtaXRod2lsbHMxOTg5QGdtYWlsLmNvbSIsInVzZXJfaWQiOiJ1c2VyXzRlZTRjZjY3YWQ0NzRhMjc5ODhiYzBhZmI4NGNmNDcyIiwiaWNvbiI6Imh0dHA6Ly93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci9jZjk0Yjc0YmQ0MWI0NjZiYjE4NWJkNGQ2NzRmMDMyYj9kZWZhdWx0PWh0dHBzJTNBJTJGJTJGczMuc2xvb3ZpLmNvbSUyRmF2YXRhci1kZWZhdWx0LWljb24ucG5nIiwiYnlfZGVmYXVsdCI6Im91dHJlYWNoIn0sImZyZXNoIjpmYWxzZSwidHlwZSI6ImFjY2VzcyJ9.OCwxx4kumc5VBwQkzZayD4SlTz0K7Ko9tRSbD4rOevM"
user_id: "user_4ee4cf67ad474a27988bc0afb84cf472"
*/

export const authAction = (values: ValuesProps, redirectTo: () => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const apiResponse = await axios.post("https://stage.api.sloovi.com/login", values);

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