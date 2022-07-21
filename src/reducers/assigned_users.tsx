import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actions/types";
const INITIAL_STATE = {
  assignedUsers: [],
  errorMessage: "",
  loading: false,
};
interface StateProps {
  assignedUsers: string[] | null;
  errorMessage?: string | null;
  loading?: boolean | null;
}
interface ActionProps {
  type: string;
  payload: string;
}

export default function (
  state: StateProps = INITIAL_STATE,
  action: ActionProps
) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        errorMessage: "",
        assignedUsers: action.payload,
      };
    case FETCH_USERS_FAILURE:
      return {
        error: action.payload,
        loading: false,
        users: [],
      };
    default:
      return state;
  }
}
