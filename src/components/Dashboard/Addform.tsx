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

              <div className="Form">
      <div className="form-wrapper">
        <h1>Demo Form for React</h1>
        <form className="form">
          <input 
            className="form-input"
            name="task_msg" 
            value={inputValues?.task_msg || ''} 
            onChange={handleInputChange} 
            placeholder="Your Name"
            type="text"
            data-testid="form-input-task_msg"
          />
          <input 
            className="form-input"
            name="task_date" 
            value={inputValues?.task_date || ''} 
            onChange={handleInputChange} 
            placeholder="12/12/12" 
            type="date"
            data-testid="form-input-task_date"
          />
          <input 
            className="form-input" 
            name="task_time"
            value={inputValues?.task_time || ''} 
            onChange={handleInputChange} 
            placeholder="10:02:03" 
            type="time"
            data-testid="form-input-task_time"
          />
          <input 
            className="form-input"
            name="time_zone"
            value={inputValues?.time_zone || ''} 
            onChange={handleInputChange} 
            placeholder="09:12:11" 
            type="number"
            data-testid="form-input-time_zone"
          />
          <button 
            className='form-submit'
            data-testid="form-submit" 
            onClick={handleFormSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
            
          </div>
        )}
      </div>
    );
  
}

export default connect(null, { createTask })(AddTask);
