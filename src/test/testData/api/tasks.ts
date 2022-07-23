import { 
   mockTasks, 
   mockUsers, 
   myPresumableTask 
} from "../data/testdata"


interface TaskProps {
  id?:string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

interface ErrorInterface{
	error: string
}


export const getTask = async (): Promise<TaskProps[]| ErrorInterface> => {
   if(mockTasks.length > 0){
     return promise.resolve(mockTasks)
   }
   return promise.reject({error:"No data found"})
   
}
