import axios from "./axios.services";

interface TaskProps {
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

function toTimestamp(strDate: string) {
  var datumDigits: number = Date.parse(strDate);
  return datumDigits / 1000;
}

//console.log(toTimestamp("+05:30"));

const fakeData: TaskProps = {
  assigned_user: "iddd",
  task_date: "2022-12-12",
  task_time: 7, //01:30am
  is_completed: 0,
  time_zone: 2000, //(for ex= +05:30 means 19800 seconds)
  task_msg: "kf fkdkfd",
};

class SlooveeCrudeApiService {
  /*@ METHOD: getTask
   *@params: id: string
   *@desc: fetches a lists of resources
   */
  getTasks(): Promise<any> {
    const company_id = localStorage.getItem("company_id");
    const token = localStorage.getItem("token");

    return fetch(
      `/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          credentials: "include",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );
  }

  /*@METHOD: getTask
   *@params: id: string
   *@desc: fetch  a single resource
   */

  getTask(id: string): Promise<any> {
    const company_id = localStorage.getItem("company_id");
    const token = localStorage.getItem("token");

    return fetch(
      `/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          credentials: "include",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );
  }

  /*@METHOD: createTask
   *@params: data: TaskProps
   *@desc: updates a resource
   */

  createTask(data: TaskProps): Promise<any> {
    const company_id = localStorage.getItem("company_id");
    const token = localStorage.getItem("token");

    return fetch(
      `/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,
      {
        method: "POST",

        headers: {
          "Content-type": "application/json; charset=UTF-8",
          credentials: "include",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  }

  /*@METHOD: updateTask
   *@params: id: string, data: TaskProps
   *@desc: updates a resource
   */

  updateTask(id: string, data: TaskProps): Promise<any> {
    const company_id = localStorage.getItem("company_id");
    const token = localStorage.getItem("token");

    return fetch(
      `/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          credentials: "include",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      }
    );
  }
  /*@method: deleteTask
   *@params: id: string
   *@desc: deletes a resource
   */
  deleteTask(id: string): Promise<any> {
    const company_id = localStorage.getItem("company_id");
    const token = localStorage.getItem("token");

    return fetch(
      `/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          credentials: "include",
          Authorization: "Bearer " + token,
          Accept: "application/json",
        },
      }
    );
  }
}

const Endpoint = new SlooveeCrudeApiService();
export default Endpoint;
