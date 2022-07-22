import React, {
  Component,
  useState,
  SyntheticEvent,
  MouseEvent,
  useEffect,
} from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTask, updateTask, deleteTask } from "../../../actions";
import EnhancedForm from "./FormBox";
import DynamicData from "./TaskLists";

interface userAssignment {
  name: string;
  company_id: string;
}

interface EnumServiceItems extends Array<userAssignment> {}

/*@desc: add task props*/
interface AddTaskProps {
  createTask: (data: TaskProps) => Promise<any>;
  updateTask: (id: string, data: TaskProps) => Promise<any>;
  deleteTask: (e: React.MouseEvent<HTMLElement>, id: string) => Promise<any>;
  usersAssigned: EnumServiceItems[];
}

/*@description: task interface props*/
interface TaskProps {
  id?: string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

/*@description: Add Task component
 * contains the dynamic list component, the add task component and
 * a enhanced generic form component
 */

const AddTask: React.SFC<AddTaskProps> = (props: AddTaskProps) => {
  // ////console.log(props.usersAssigned)

  //const [inputValues, setInputValues] = useState<{ [x: string]: string }>()

  const [formMode, setFormMode] = useState("editMode");

  const [allAllowedAdmin, setAllAllowedAdmin] = useState<EnumServiceItems[]>(
    []
  );

  const [apiData, LoadedData] = useState<Array<any>>([]);

  /*@params: ()*/
  const handleToggler = () => {
    var $el = document.querySelector(".J_list") as HTMLElement;
    $el.classList.toggle("open");
    setFormMode("createMode");
    //  alert(formMode)
  };
  useEffect(() => {}, []);

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

  const [domAutoRefresh, setDomAutoRefresh] = useState(
    Math.random() * 100 + Math.floor(Math.random() * 4)
  );

  function toTimestamp(strDate: string) {
    var datumDigits: number = Date.parse(strDate);
    return datumDigits / 1000;
  }

 /*@desc: convert time to seconds
  */
 function timeToSeconds(str: string=""):number {
    let time: Array<any>  = str.split(':'),
        seconds:number = 0, minutes:number = 1;
    while (time.length > 0) {
        const timeUnit : string = time.pop()
        seconds += minutes * parseInt(timeUnit, 10);
        minutes *= 60;
    }

    return seconds;
}

/*timezone maker*/
function timezone_in_seconds() 
{  
   const dateTime: any = new Date(); 
   return -dateTime.getTimezoneOffset() * 60;
}




  /*@params: (e: React.MouseEvent<HTMLElement>, id :string ="", dataEdited : TaskProps = inputValues)
   */
  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLElement>,
    id: string = "",
    dataEdited: TaskProps = inputValues
  ) => {
    e.preventDefault();
    // do the color background effect thing on submitting
    const divBox = document.querySelector(".task-list") as HTMLElement;
    divBox.classList.add("darker-aqua");

    if (formMode == "createMode" || !id || id == null || id.length <= 0) {
      delete inputValues.id;
      //inputValues.task_time = 3000; // for now will fix this dynamically



      const submitData: TaskProps = {
        assigned_user: inputValues.assigned_user,
        task_date: inputValues.task_date,
        task_time: timeToSeconds(inputValues?.task_time?.toString()),
        is_completed: 0,
        time_zone: timezone_in_seconds(),
        task_msg: inputValues.task_msg,
      };
      props.createTask(submitData);
      setTimeout(() => {
        divBox.classList.remove("darker-aqua");
        setDomAutoRefresh(Math.random() * 100 + Math.floor(Math.random() * 4));
      }, 300);
    } else {
      // we are editing
      console.log("here edit");
      const submitData: TaskProps = {
        assigned_user: dataEdited?.assigned_user,
        task_date: dataEdited?.task_date,
        task_time: timeToSeconds(dataEdited?.task_time?.toString()),
        is_completed: 0,
        time_zone: timezone_in_seconds(),
        task_msg: dataEdited?.task_msg,
      };

      if (id && submitData) {
        delete inputValues.id;
        //inputValues.task_time =3000
        //console.log("you clicked");
        props.updateTask(id, submitData);
        setDomAutoRefresh(Math.random() * 100 + Math.floor(Math.random() * 4));
      }
    }

    // reversing animations effect
    var $el = document.querySelector(".J_list") as HTMLElement;
    $el.classList.toggle("open");

    //edit form submit and cancel
    if (localStorage.getItem("formIndex")) {
      // WAS SET  WHEN OPEN
      const formIndex: string | null = localStorage.getItem("formIndex");
      var $el = document.getElementById("taskedit_" + formIndex) as HTMLElement;
      window.location.reload()
    }
  };

  /*@params: (e: React.MouseEvent<HTMLElement>,id:string)
   */
  const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    console.log("delete parent");
    await props.deleteTask(e, id);

    //edit form submit and cancel
    if (localStorage.getItem("formIndex")) {
      // WAS SET  WHEN OPEN
      const formIndex: string | null = localStorage.getItem("formIndex");
      var $el = document.getElementById("taskedit_" + formIndex) as HTMLElement;
      window.location.reload()
    }
  };

  /*@params: (e: React.FormEvent<HTMLInputElement>)
   */
  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInputValues({
      ...inputValues,
      [name]: value,
    });

    ////console.log(inputValues);
  };

  /*@params: (event: React.FormEvent<HTMLSelectElement>)
   */
  const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    var safeSearchTypeValue: string = event.currentTarget.value;

    ////console.log(safeSearchTypeValue); // in chrome => B

    setInputValues({
      ...inputValues,
      assigned_user: safeSearchTypeValue,
    });
  };
  /*@params: ()*/
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
          <ul className="task-list">
            <li className="J_list">
              <div className="list-header" onClick={handleToggler}>
                Task
              </div>
              <div className="list-content">
                <div className="list-content-inner">
                  <span key={domAutoRefresh}></span>

                  <EnhancedForm
                    handleFormSubmit={handleFormSubmit}
                    handleInputChange={handleInputChange}
                    inputValues={inputValues}
                    allAllowedAdmin={allAllowedAdmin}
                    handleSelectChange={handleSelectChange}
                    editData={inputValues}
                    
                    mode={{ formMode, setFormMode }}
                    handleDelete={(
                      e: React.MouseEvent<HTMLElement>,
                      id: string
                    ) => handleDelete(e, id)}
                  />
                </div>
              </div>
            </li>
            <li>
              <DynamicData
                allData={allData}
                handleFormSubmit={handleFormSubmit}
                handleDelete={(e: React.MouseEvent<HTMLElement>, id: string) =>
                  handleDelete(e, id)
                }
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default connect(null, {
  createTask,
  deleteTask,
  updateTask,
})(AddTask);
