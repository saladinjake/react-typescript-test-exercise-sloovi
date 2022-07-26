import React, {
  Component,
  useState,
  SyntheticEvent,
  MouseEvent,
  useEffect,
  Dispatch,
} from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { updateTask, getTasks, getTask, deleteTask } from "../../../actions";
import EnhancedForm from "./FormBox";
import SlooviCrudApiService from "../../../services/crudeapi.services";

/*
 * @author: test code exercires
 * TAKS INTERFACE PROPS
 */
interface TaskProps {
  id?: string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

/*
 * @author: test code exercires
 * DYNAMIC LISTED TASKS PROPS
 */
type DynamicDataProps<T> = {
  allData: TaskProps[];
  handleFormSubmit: (
    e: React.MouseEvent<HTMLElement>,
    id?: string,
    dataEdited?: TaskProps
  ) => void;
  handleDelete: (e: React.MouseEvent<HTMLElement>, id: string) => void;
};

/*
 * @author: test code exercires
 * DYNAMIC COMPONENT STATE PROPS
 */
type DynamicDataState = {};

interface StateProps {
  auth: object;
  assignedUser: object;
  form: object;
  taskReducer: object;
}

/*
 * @author: test code exercires
 * ASSIGNE D USERS INTERFACE
 */
interface userAssignment {
  name: string;
  company_id: string;
}

interface EnumServiceItems extends Array<userAssignment> {}

interface EditTaskProps {
  editTask: (data: TaskProps) => Promise<any>;
  usersAssigned: EnumServiceItems[];
}

/*
 * @author: test code exercires
 *  @desc: dYNAMIC COMPONENT
 * list all task , responsible for rediering edit form , animated effects on each selected edit form
 */
const DynamicData: React.SFC<DynamicDataProps<any>> = (props) => {
  //console.log(props);
  const data: Array<any> = useSelector(
    (state: RootStateOrAny) => state.taskReducer
  );
  ////console.log(data);
  useEffect(() => {
    /*
     *
     *  @reason: use effect used to get list of all fetched task
     */
    getTasks();
  }, [getTasks]);

  const [formMode, setFormMode] = useState("editMode");
  const [formId, setFormId] = useState<number>(0);

  //find a way to make thhese reusable
  const [allAllowedAdmin, setAllAllowedAdmin] = useState<EnumServiceItems[]>(
    []
  );

  const [apiData, LoadedData] = useState<Array<any>>([]);

  /*@params : none
   *@method: handleToggler
   * @reason: switcher toggles the plus icon on the ui to add task
   */

  const handleToggler = () => {
    try {
      var $el = document.querySelector(".J_list") as HTMLElement;
      $el.classList.toggle("open");
    } catch (err) {}
  };

  const [inputValues, setInputValues] = useState<TaskProps>({
    id: null,
    assigned_user: "",
    task_date: "",
    task_time: 10,
    is_completed: 0,
    time_zone: +1,
    task_msg: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const [allData, setListData] = useState<TaskProps[]>([]);

  // use Effect to fetch all the tasks
  useEffect(() => {
    //if (props.usersAssigned) {
    //setAllAllowedAdmin(props.usersAssigned);
    //}
  }, []);

  const [domAutoRefresh, setDomAutoRefresh] = useState(
    Math.random() * 100 + Math.floor(Math.random() * 4)
  );

  /*@params : async (
    e: React.MouseEvent<HTMLElement>,
    id?: string,
    inputValuesForm?: TaskProps
  )
 *@method: handleFormSubmit
 * @reason: switcher toggles the plus icon on the ui to add task
*/
  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLElement>,
    id?: string,
    inputValuesForm?: TaskProps
  ) => {
    e.preventDefault();

    try {
      const submitData: TaskProps = {
        assigned_user: inputValues.assigned_user,
        task_date: inputValues.task_date,
        task_time: inputValues.task_time,
        is_completed: 0,
        time_zone: +1,
        task_msg: inputValues.task_msg,
      };

      console.log(submitData)
      // you can either choose to overide the method or use as is
      await props.handleFormSubmit(e, id, submitData);
      setDomAutoRefresh(Math.random() * 100 + Math.floor(Math.random() * 4));
    } catch (err) {}
  };

  /*@params: (e: React.FormEvent<HTMLInputElement>)
   */

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.currentTarget;
      setInputValues({
        ...inputValues,
        [name]: value,
      });

      

      console.log(inputValues);
    } catch (err) {}
  };


  /*@desc; converts a string input back to time*/

const secondsToTime = (str:string): string =>{
    let secondsGiven: number|string = parseInt(str, 10); 
    var hoursDeduced: number|string   = Math.floor(secondsGiven / 3600);
    var minutesObtained: number|string = Math.floor((secondsGiven - (hoursDeduced * 3600)) / 60);
    secondsGiven = secondsGiven - (hoursDeduced * 3600) - (minutesObtained * 60);
    if (hoursDeduced   < 10) {hoursDeduced   = "0"+hoursDeduced;}
    if (minutesObtained < 10) {minutesObtained = "0"+minutesObtained;}
    if (secondsGiven < 10) {secondsGiven = "0"+secondsGiven;}
    let time: string    = hoursDeduced+':'+minutesObtained+':'+secondsGiven;
    return time;
}


  /*@params: (event: React.FormEvent<HTMLSelectElement>)
   */
  const handleSelectChange = (event: React.FormEvent<HTMLSelectElement>) => {
    try {
      var inputValue: string = event.currentTarget.value;

      setInputValues({
        ...inputValues,
        assigned_user: inputValue,
      });

      console.log(inputValues);
    } catch (err) {}
  };

  /*@params : (id: number)
   */
  const handleEditView = async (id: number) => {

  if (formMode == "editMode"){
   // alert("yes")
    const Loading = document.querySelector("usereffect") as HTMLElement;
    if (Loading != null) {
      Loading.classList.remove("hidden");
    }
    const nowViewing: string = window.localStorage.getItem("recentDoc")!;
    if (localStorage.getItem("recentDoc")) {
      const res = await SlooviCrudApiService.getTask(nowViewing);
      localStorage.setItem("formIndex", id.toString());
      const response = await res.json();
      //console.log(response.results);

      // convert back to time input
      var split: string = secondsToTime(response?.results?.task_time.toString());

     // console.log(split,response?.results?.task_time)
      


      setInputValues({
        ...inputValues,
        assigned_user: response.results.assigned_user,
        task_msg: response.results.task_msg,
        task_date: response.results.task_date,
        task_time: split || response.results.task_time,
        //time_zone: 19800
      });

      var $el = document.getElementById("taskedit_" + id) as HTMLElement;
      //view clips
      var $elementClip = document.querySelector("#viewer_" + id) as HTMLElement;
      $elementClip.classList.toggle("view-short-clips");
      $elementClip.classList.toggle("edit-long-clips");
      $el.classList.toggle("move_into_place");
      $el.classList.toggle("move-in-to-place-active");
      setFormMode("editMode");
      setFormId(id);
      var form = window.document.getElementById("formData" + id);
      if (form !== null) {
        form.focus();
      }
    }
    if (Loading != null) {
      Loading.classList.add("hidden");
    }
   }
  };

  /*@params : (e: React.MouseEvent<HTMLElement>,id: string)
   */

  const handleDelete = async (e: React.MouseEvent<HTMLElement>, id: string) => {
    console.log("delete called");
    await props.handleDelete(e, id);
    setDomAutoRefresh(Math.random() * 100 + Math.floor(Math.random() * 4));
  };

  return (
    <ul className="tasks" style={{ background: "#fff", padding: "5px" }}>
      <span key={domAutoRefresh}></span>
      {data.length > 0 &&
        data.map((taskGiven, index: number) => {
          return (
            <li id={"viewer_" + index} className="view-short-clips">
              <div className="" key={index}>
                <div className="list-headerx" style={{ lineHeight: "10px" }}>
                  {"Opportunity"}
                </div>

                <div
                  className="box box-white"
                  style={{ background: "#fff", marginTop: "15px" }}
                >
                  <div className="stay-in-place" id={"taskparent_" + index}>
                    <div className="main-flex-box">
                      <div className="two-colsets">
                        <a href="" className=" profile  waves-light ">
                          <img
                            src="./logo192.png"
                            alt="user-img"
                            className="img-circle"
                          />
                        </a>
                        <div className="list-columnset">
                          <p className="margin-space">{taskGiven.task_msg}</p>
                          <p className="margin-space">sample</p>
                        </div>
                      </div>

                      <div className="right">
                        <i
                          onClick={() => {
                            localStorage.setItem("recentDoc", taskGiven.id);
                            handleEditView(index);
                          }}
                          className=" fa fa-edit pointer"
                        ></i>
                        <i className="hidden usereffect">loading...</i>
                        <i className="fa fa-ellipsis-h "></i>
                      </div>
                    </div>
                  </div>

                  <div
                    id={"taskedit_" + index}
                    className="move-in-to-place default-pos"
                  >
                    <EnhancedForm
                      handleFormSubmit={(
                        e: React.MouseEvent<HTMLElement>,
                        id?: string,
                        inputValues?: TaskProps
                      ) => handleFormSubmit(e, taskGiven.id, inputValues)}
                      handleInputChange={handleInputChange}
                      inputValues={inputValues}
                      allAllowedAdmin={allAllowedAdmin}
                      handleSelectChange={handleSelectChange}
                      editData={taskGiven}
                       
                      mode={{ formMode, setFormMode, formId }}
                      handleDelete={(e: React.MouseEvent<HTMLElement>, id) =>
                        handleDelete(e, taskGiven.id)
                      }
                    />
                  </div>
                </div>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default DynamicData;
