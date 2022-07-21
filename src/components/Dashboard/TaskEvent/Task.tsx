import React, {
  Component,
  useState,
  SyntheticEvent,
  MouseEvent,
  useEffect,
} from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTask } from "../../../actions";
import EnhancedForm from "./FormBox";
import DynamicData from "./TaskLists";

interface userAssignment {
  name: string;
  company_id: string;
}

interface EnumServiceItems extends Array<userAssignment> {}

interface AddTaskProps {
  createTask: (data: TaskProps) => Promise<any>;
  usersAssigned: EnumServiceItems[];
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

const AddTask: React.SFC<AddTaskProps> = (props: AddTaskProps) => {
  // console.log(props.usersAssigned)

  //const [inputValues, setInputValues] = useState<{ [x: string]: string }>()

  const [allAllowedAdmin, setAllAllowedAdmin] = useState<EnumServiceItems[]>(
    []
  );

  const [apiData, LoadedData] = useState<Array<any>>([]);

  const handleToggler = () =>{
       var $el = document.querySelector('.J_list') as HTMLElement;
       $el.classList.toggle("open")
  
   }
  useEffect(() => {}, [
      
  ]);

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



<ul className="faq-list">
   <li className="J_list" onClick={handleToggler}>
      <div className="list-header">Task</div>
      <div className="list-content">
         <div className="list-content-inner">
           
            <EnhancedForm
              handleFormSubmit={handleFormSubmit}
              dropDownEffect={dropDownEffect}
              handleInputChange={handleInputChange}
              inputValues={inputValues}
              allAllowedAdmin={allAllowedAdmin}
              handleSelectChange={handleSelectChange}
            />
         </div>
      </div>
   </li>
   <li>
   
     <DynamicData listItems={allData} removeItem={removeListItem} />
     </li>
</ul>
         
         

         
        </div>
      )}
    </div>
  );
};

export default connect(null, { createTask })(AddTask);
