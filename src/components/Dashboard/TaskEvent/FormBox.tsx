import React, {
  Component,
  useState,
  SyntheticEvent,
  MouseEvent,
  useEffect,
  useRef,
} from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../actions";

/*state props*/
interface StateProps {
  auth: object;
  assignedUser: object;
  form: object;
}

/*@desc: task interface props */
interface TaskProps {
  id?: string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

/*@desc: assigned users interface props */
interface userAssignment {
  name: string;
  company_id: string;
}

interface EnumServiceItems extends Array<userAssignment> {}

/*@desc: add task interface props */
interface AddTaskProps {
  createTask: (data: TaskProps) => Promise<any>;
  usersAssigned: EnumServiceItems[];
}

/*@desc: form component props type props */
type FormBoxProps<T> = {
  inputValues: TaskProps;
  handleInputChange: (e: React.FormEvent<HTMLInputElement>) => void;
  handleFormSubmit: (
    e: React.MouseEvent<HTMLElement>,
    id?: string,
    dataEdited?: TaskProps
  ) => void;
  allAllowedAdmin: EnumServiceItems[];
  handleSelectChange: (event: React.FormEvent<HTMLSelectElement>) => void;
  editData?: TaskProps;
  mode?: {
    formMode: string;
    setFormMode: React.Dispatch<React.SetStateAction<string>>;
    formId?: number;
  };
  handleDelete: (e: React.MouseEvent<HTMLElement>, id: string) => void;
};

type FormBoxState = {
  admins: EnumServiceItems[];
};

/*
*@name: formBox
*@desc: generic form used for add and editing tasks 

*/

const FormBox: React.SFC<FormBoxProps<any>> = (props) => {
  const admins = useSelector(
    (state: RootStateOrAny) => state.assignedUser.assignedUsers
  );

  //use effect to change focus type on date and time
  const [typeOfTime, setIsTime] = useState("time");
  const [typeOfDate, setIsDate] = useState("date");
  const [isFocus, setIsFocus] = useState(false);
  const [isBlur, setIsBlur] = useState(false);

  const [getTime, setTime] = useState();

  const secondsToTime = (time: number = 0) => {
    if (props.inputValues?.task_time && time == 0) {
      const timeVal = new Date(props.inputValues?.task_time * 1000)
        .toISOString()
        .slice(14, 19);
      return timeVal;
    } else if (time) {
      const timeVal = new Date(time * 1000).toISOString().slice(14, 19);
      return timeVal;
    }
  };
  // Handling input onFocus event
  const focusHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(true);
    setIsBlur(false);

    // Do something with event
    ////console.log(event);

    if (event.target.value) {
      event.target.type = "text";
      let name: string = event.target.value;
      // Validate time
      if (name.match(/^([01]?[0-9]|2[0-3])\:+[0-5][0-9]$/i)) {
        setIsTime("time");
      } else if (
        name.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) ||
        name.match(
          /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/
        ) ||
        name.match(/^\d{2}\/\d{2}\/\d{4}$/) ||
        name.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
      ) {
        setIsDate("date");
      }
    }
  };

  // Handling input onBlur event
  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocus(false);
    setIsBlur(true);
    if (event.target.value) {
      event.target.type = "text";
      let name: string = event.target.value;
      // Validate time
      if (name.match(/^([01]?[0-9]|2[0-3])\:+[0-5][0-9]$/i)) {
        //setIsTime("text");
      } else {
        //name = secondsToTime(parseInt(event.target.value));
        //event.target.value = name
      }

      if (
        name.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/) ||
        name.match(
          /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/
        ) ||
        name.match(/^\d{2}\/\d{2}\/\d{4}$/) ||
        name.match(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)
      ) {
        //setIsDate("text");
      } else {
      }
    }
  };

  useEffect(() => {
    const elementForm: HTMLCollectionOf<HTMLFormElement> =
      document.getElementsByTagName("form");
  }, []);

  return (
    <form
      name="login"
      id={"formData" + props?.mode?.formId}
      className="form form-hidden"
    >
      <div
        className="input-controlx"
        style={{ marginLeft: "-20px", marginRight: "10px" }}
      >
        <label className="input-label expanded-width">Task Description</label>
        <input
          className="input-field form-control"
          name="task_msg"
          value={
            props?.inputValues?.task_msg || props?.editData?.task_msg || ""
          }
          onChange={props.handleInputChange}
          placeholder="Enter your task"
          type="text"
          data-testid="input-field-task_msg"
          defaultValue={props?.editData?.task_msg || ""}
        />
      </div>
      <div className="main-flex-bare">
        <div
          className="input-controlx"
          style={{ marginLeft: "-20px", marginRight: "10px" }}
        >
          <label className="input-label expanded-width custom-space">
            Date
          </label>
          <input
            className="input-field form-control"
            name="task_date"
            value={
              props?.inputValues?.task_date ||
              props?.editData?.task_date ||
              "1222/12/12"
            }
            onChange={props.handleInputChange}
            placeholder="1222-12-12"
            type={"date"}
            defaultValue={props?.editData?.task_date || "1222/12/12"}
            data-testid="input-field-task_date"
          />
        </div>

        <div className="input-controlx">
          <label className="input-label expanded-width">Time</label>
          <input
            className="input-field form-control"
            name="task_time"
            value={
              props?.inputValues?.task_time ||
              secondsToTime(props?.editData?.task_time) ||
              ""
            }
            onChange={props.handleInputChange}
            placeholder="10:02:03"
            type={typeOfTime}
            data-testid="input-field-task_time"
            defaultValue={props?.editData?.task_time || ""}
            onFocus={focusHandler}
            onBlur={blurHandler}
          />
        </div>
      </div>

      <div
        className="input-controlx"
        style={{ marginLeft: "-20px", marginRight: "10px" }}
      >
        <label className="input-label expanded-width">Assigned user</label>
        <select
          className="input-field form-control"
          name="assigned_user"
          value={
            props?.inputValues?.assigned_user ||
            props?.editData?.assigned_user ||
            ""
          }
          onChange={props.handleSelectChange}
          placeholder="09:12:11"
          defaultValue={props?.editData?.assigned_user || ""}
        >
          {admins &&
            admins.map((admin: EnumServiceItems) => {
              //console.log(admins)
              return <option value={admin["user_id"]}>{admin["name"]}</option>;
            })}
        </select>
      </div>
      <br />
      <div className="input-control spaced-form">
        <div>
          {" "}
          <i
            onClick={(e: React.MouseEvent<HTMLElement>) =>
              props.handleDelete(e, "dsds")
            }
            className="fa fa-trash pointer"
          ></i>
        </div>
        <div>
          <button
            className=""
            data-testid="form-submit"
            style={{ marginRight: "10px" }}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              e.preventDefault();
              const elementForm = document.getElementById(
                "formData" + props?.mode?.formId
              ) as HTMLFormElement;

              if (elementForm != null) {
                elementForm.reset();
                var $el = document.querySelector(".J_list") as HTMLElement;
                $el.classList.toggle("open");

                if (localStorage.getItem("formIndex")) {
                  const formIndex: string | null =
                    localStorage.getItem("formIndex");
                  var $el2 = document.getElementById(
                    "taskedit_" + formIndex
                  ) as HTMLElement;
                  //view clips
                  var $elementClip = document.querySelector(
                    "#viewer_" + formIndex
                  ) as HTMLElement;
                  $elementClip.classList.toggle("view-short-clips");
                  $elementClip.classList.toggle("edit-long-clips");

                  $el2.classList.toggle("move_into_place");
                  $el2.classList.toggle("move-in-to-place-active");
                }
              }
            }}
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
  ////console.log(state);
  const assignedUser = state.assignedUser;
  ////console.log(state.assignedUser);
  return {
    data: state,
  };
};

const EnhancedForm = connect(mapStateToProps)(FormBox);
export default EnhancedForm;
