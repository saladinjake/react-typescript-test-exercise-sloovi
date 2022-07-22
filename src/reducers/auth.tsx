import { AUTH_USER, AUTH_ERROR } from "../actions/types";
const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
};
interface StateProps {
  authenticated?: string | null;
  errorMessage?: string | null;
}
interface ActionProps {
  type: string;
  payload: string;
}

/*
*@name: AUTH REDUCER
*@desc: when dispatched would trigger AUTHENTICATION OF USER

*/
export default function (
  state: StateProps = INITIAL_STATE,
  action: ActionProps
) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, errorMessage: "", authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload, authenticated: "" };
    default:
      return state;
  }
}
