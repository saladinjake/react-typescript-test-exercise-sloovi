import React, {
  Component,
  useState,
  SyntheticEvent,
  MouseEvent,
  useEffect,
} from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../actions";

interface StateProps {
  auth: object;
  assignedUser: object;
  form: object;
}


interface TaskProps {
  id?: string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

interface userAssignment {
  name: string;
  company_id: string;
}

interface EnumServiceItems extends Array<userAssignment> {}

interface AddTaskProps {
  createTask: (data: TaskProps) => Promise<any>;
  usersAssigned: EnumServiceItems[];
}

// for props with action calls and other data value props
//do this
//step1
type FormBoxProps<T> = {
  inputValues: TaskProps;
  dropDownEffect: () => void;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: React.MouseEvent<HTMLElement>) => void;
  allAllowedAdmin: EnumServiceItems[];
  handleSelectChange: (event: React.FormEvent<HTMLSelectElement>) => void;
};

type FormBoxState = {
  admins: EnumServiceItems[];
};

const FormBox: React.SFC<FormBoxProps<any>> = (props) => {
  const admins = useSelector(
    (state: RootStateOrAny) => state.assignedUser.assignedUsers
  );

  return (
    
        <form name="login" id="formData" className="form form-hidden">
          <div className="input-controlx">
            <label className="input-label expanded-width">
              Task Description
            </label>
            <input
              className="input-field"
              name="task_msg"
              value={props.inputValues?.task_msg || ""}
              onChange={props.handleInputChange}
              placeholder="Your Name"
              type="text"
              data-testid="input-field-task_msg"
            />
          </div>
          <div className="main-flex-bare">
            <div className="input-controlx">
              <label className="input-label expanded-width">Date</label>
              <input
                className="input-field"
                name="task_date"
                value={props.inputValues?.task_date || ""}
                onChange={props.handleInputChange}
                placeholder="12/12/12"
                type="date"
                data-testid="input-field-task_date"
              />
            </div>

            <div className="input-controlx">
              <label className="input-label expanded-width">Time</label>
              <input
                className="input-field"
                name="task_time"
                value={props.inputValues?.task_time || ""}
                onChange={props.handleInputChange}
                placeholder="10:02:03"
                type="time"
                data-testid="input-field-task_time"
              />
            </div>
          </div>

          <div className="input-controlx">
            <label className="input-label expanded-width">Assigned user</label>
            <select
              className="input-field"
              name="assigned_user"
              value={props.inputValues.assigned_user || ""}
              onChange={props.handleSelectChange}
              placeholder="09:12:11"
            >
              {admins &&
                admins.map((admin: EnumServiceItems) => {
                  return (
                    <option value={admin["user_id"]}>{admin["name"]}</option>
                  );
                })}
            </select>
          </div>
          <br />
          <div className="input-control spaced-form">
            <div></div>
            <div>
              <button
                className=""
                data-testid="form-submit"
                style={{ marginRight: "10px" }}
              >
                Cancel
              </button>
              <button
                className="btn btn-success "
                data-testid="form-submit"
                onClick={props.handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      
  );
};


const mapStateToProps = (state: StateProps) => {
  console.log(state);
  const assignedUser = state.assignedUser;
  console.log(state.assignedUser);
  return {
    data: state,
  };
};


const EnhancedForm = connect(mapStateToProps)(FormBox);
export default EnhancedForm;
