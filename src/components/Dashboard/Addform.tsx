import React, {
  Component,
  useState,
  SyntheticEvent,
  MouseEvent,
  useEffect,
} from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTask } from "../../actions";

interface TaskProps {
  id?: string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

// for props with action calls and other data value props
//do this
//step1
//interface DynamicDataProps<T> {
//[listItems: string ] : TaskProps[];

//}
//step2
//type ApiType<T> =  DynamicDataProps<T> & {
//  removeItem : (index: string) => void
//}

type DynamicDataProps<T> = {
  listItems: TaskProps[];
  removeItem: (index: string) => void;
};

type DynamicDataState = {};

class DynamicData extends React.Component<
  DynamicDataProps<any>,
  DynamicDataState
> {
  constructor(props: DynamicDataProps<any>) {
    super(props);
  }
  render() {
    return (
      <main className="main">
        <div className="container">
          <section className="wrapper2 wrapper-reversed " id="toggleShow">
            <div className=" main-flex">
              <p className="text text-normal">Task 0</p>
              <p
                onClick={() => console.log("show edit")}
                className="text text-normal pickle-btn2"
              >
                <i className="fa fa-plus fa-1x"></i>
              </p>
            </div>
            <form name="login" className="form ">
              {["", ""].map((index) => {
                return (
                  <div
                    style={{ marginBottom: "50px" }}
                    className="card-item"
                    onClick={() => this.props.removeItem(index)}
                    key={index}
                  >
                    <div className="main-flex-box">
                      <div className="two-colsets">
                        <a href="" className=" profile  waves-light ">
                          <img
                            src="./logo192.png"
                            alt="user-img"
                            className="img-circle"
                          />{" "}
                        </a>
                        <div className="list-columnset">
                          <p className="margin-space">sample</p>
                          <p className="margin-space">sample</p>
                        </div>
                      </div>

                      <div className="right">
                        <i className=" fa fa-edit"></i>
                        <i className="fa fa-ellipsis-h "></i>
                      </div>
                    </div>

                    <hr />

                    <div className="main-flex-box">
                      <div className="two-colsets">
                        <p className=" "></p>
                        <div className="list-columnset">
                          <p className="margin-space">sample</p>
                          <p className="margin-space">sample</p>
                        </div>
                      </div>

                      <div className="right">
                        <i className=" fa fa-phone "></i>
                        <i className="fa fa-comments-o "></i>
                        <i className="fa fa-envelope "></i>
                      </div>
                    </div>
                  </div>
                );
              })}
            </form>
          </section>
        </div>
      </main>
    );
  }
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
    <div className="container">
      <section className="wrapper wrapper-reversed " id="toggleShow">
        <div className=" main-flex">
          <p className="text text-normal">Task 0</p>
          <p
            onClick={() => props.dropDownEffect()}
            className="text text-normal pickle-btn"
          >
            <i className="fa fa-plus fa-1x"></i>
          </p>
        </div>
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
      </section>
    </div>
  );
};

interface StateProps {
  auth: object;
  assignedUser: object;
  form: object;
}

const mapStateToProps = (state: StateProps) => {
  console.log(state);
  const assignedUser = state.assignedUser;
  console.log(state.assignedUser);
  return {
    data: state,
  };
};

const EnhancedForm = connect(mapStateToProps)(FormBox);

const AddTask: React.SFC<AddTaskProps> = (props: AddTaskProps) => {
  // console.log(props.usersAssigned)

  //const [inputValues, setInputValues] = useState<{ [x: string]: string }>()

  const [allAllowedAdmin, setAllAllowedAdmin] = useState<EnumServiceItems[]>(
    []
  );

  const [inputValues, setInputValues] = useState<TaskProps>({
    id: null,

    assigned_user: "",
    task_date: "",
    task_time: 100,
    is_completed: 0,
    time_zone: 4000,
    task_msg: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [allData, setListData] = useState<TaskProps[]>([]);

  // use Effect to fetch all the tasks
  useEffect(() => {
    if (props.usersAssigned) {
      setAllAllowedAdmin(props.usersAssigned);
    }
  }, []);
  // for demo
  const addListItem = (itemToAdd: TaskProps) => {
    let currentList: TaskProps[] = allData;
    currentList.push(itemToAdd);
    setListData(currentList);
  };
  const removeListItem = (itemToRemove: string) => {
    let currentList: TaskProps[] = allData;
    currentList = currentList.filter((item) => item.id != itemToRemove);
    setListData(currentList);
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    delete inputValues.id;
    console.log("you clicked");
    props
      .createTask(inputValues)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

    console.log(inputValues);
  };

  const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    var safeSearchTypeValue: string = event.currentTarget.value;

    console.log(safeSearchTypeValue); // in chrome => B

    setInputValues({
      ...inputValues,
      assigned_user: safeSearchTypeValue,
    });
  };

  const dropDownEffect = () => {
    const formTrigger = document.getElementById(
      "formData"
    ) as HTMLButtonElement;
    const wrapper = document.querySelector(".wrapper") as HTMLButtonElement;
    if (formTrigger != null) {
      // 👉️ button has type HTMLElement here
      formTrigger.classList.toggle("dropdown-form");
      wrapper.classList.toggle("wrapper-form-visible");
    }
  };

  const newTask = () => {};

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTask}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <main
            className="main dropdown-form"
            style={{ marginTop: "-100px", marginLeft: "-100px" }}
          >
            <EnhancedForm
              handleFormSubmit={handleFormSubmit}
              dropDownEffect={dropDownEffect}
              handleInputChange={handleInputChange}
              inputValues={inputValues}
              allAllowedAdmin={allAllowedAdmin}
              handleSelectChange={handleSelectChange}
            />
          </main>
          <br />
          <br />
          <br />

          <DynamicData listItems={allData} removeItem={removeListItem} />
        </div>
      )}
    </div>
  );
};

export default connect(null, { createTask })(AddTask);
