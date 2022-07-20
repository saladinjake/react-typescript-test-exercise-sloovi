import React, { Component, 
  useState, 
  SyntheticEvent, 
  MouseEvent 
} from "react";
import { connect } from "react-redux";
import { createTask } from "../../actions";


interface TaskProps{
  id? : string | null;
  assigned_user: string;   
  task_date: string;  
  task_time: number; 
  is_completed: boolean; 
  time_zone: number; 
  task_msg: string; 
}

interface AddTaskProps {
    createTask: (data:TaskProps) => Promise<any>;
   
}

const AddTask = (props: AddTaskProps) => { 
  
    
    const [inputValues, setInputValues] = useState<{ [x: string]: string }>()
    const [ submitted, setSubmitted] = useState(false)

  const handleFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    const formDataInfo: TaskProps = {
      id:null,
      assigned_user: "",   
      task_date: "",
      task_time: 0, 
      is_completed: false, 
      time_zone: 0,
      task_msg: "",
    }


    
      props.createTask(formDataInfo)
      .then((data ) => {
        
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
   
  }

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget
    setInputValues(prevState => ({ ...prevState, [name]: value }))
  }



  const dropDownEffect = () =>{
     const formTrigger = document.getElementById("formData") as HTMLButtonElement;
     if (formTrigger != null) {
       // 👉️ button has type HTMLElement here
       formTrigger.classList.toggle("dropdown-form")
     }
  }



  const newTask = () =>{
    
  }

 
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




          <main className="main dropdown-form">
  <div className="container">
    <section className="wrapper wrapper-reversed " id="toggleShow">
      <div className=" main-flex">
        <p className="text text-normal">Task 0</p>
        <p onClick={() => dropDownEffect()} className="text text-normal"><i className="fa fa-plus fa-1x"></i></p>
      </div>
      <form name="login" id="formData" className="form form-hidden">
        <div className="input-controlx">
          <label  className="input-label expanded-width">Task Description</label>
          <input 
            className="input-field"
            name="task_msg" 
            value={inputValues?.task_msg || ''} 
            onChange={handleInputChange} 
            placeholder="Your Name"
            type="text"
            data-testid="input-field-task_msg"
          />
        </div>
   <div className="main-flex-bare">
        <div className="input-controlx">
          <label  className="input-label expanded-width">Date</label>
          <input 
            className="input-field"
            name="task_date" 
            value={inputValues?.task_date || ''} 
            onChange={handleInputChange} 
            placeholder="12/12/12" 
            type="date"
            data-testid="input-field-task_date"
          />
        </div>

<div className="input-controlx">
        <label  className="input-label expanded-width">Time</label>
        <input 
            className="input-field" 
            name="task_time"
            value={inputValues?.task_time || ''} 
            onChange={handleInputChange} 
            placeholder="10:02:03" 
            type="time"
            data-testid="input-field-task_time"
          />
    </div>

</div>

<div className="input-controlx">
<label  className="input-label expanded-width">Assigned user</label>
          <input 
            className="input-field"
            name="time_zone"
            value={inputValues?.time_zone || ''} 
            onChange={handleInputChange} 
            placeholder="09:12:11" 
            type="number"
            data-testid="input-field-time_zone"
          />
</div>
<br/>
        <div className="input-control spaced-form">
          <div></div>
          <div>
          <button 
            className=''
            data-testid="form-submit" 
            style={{marginRight:"10px"}}
            
          >
            Cancel
          </button>
          <button 
            className='input-submit '
            data-testid="form-submit" 
            onClick={handleFormSubmit}
          >
            Submit
          </button>
          </div>
        </div>
      </form>
      
      
    </section>
  </div>
</main>

              
            
          </div>
        )}
      </div>
    );
  
}

export default connect(null, { createTask })(AddTask);
