import axios from "./axios.services";



interface TaskProps{
  assigned_user: string;   //<id value from /team api response >, 
  task_date: string;  //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: boolean; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}  


class SlooveeCrudeApiService {
  getTasks() : Promise<any> {
    return axios.get("/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=<company_id>");
  }

  getTask(id: string): Promise<any> {
    return axios.get(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id_from_previous_test>?company_id=<company_id>`);
  }

  createTask(data: TaskProps): Promise<any> {
    return axios.post("/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=<company_id>", data);
  }

  updateTask(id:string, data: TaskProps): Promise<any> {
    return axios.put(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id>?company_id=<comapany_id>`, data);
  }

  deleteTask(id:string): Promise<any> {
    return axios.delete(`/task/lead_465c14d0e99e4972b6b21ffecf3dd691/<task_id>?company_id=<comapany_id>`);
  }


}

const Endpoint = new SlooveeCrudeApiService()
export default Endpoint;