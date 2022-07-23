
interface TaskProps {
  id?:string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}


export const mockUsers: {name:string, company_id:string}[] = [
  {
    name:"saladin jake",
    company_id:"83928dskjds"
  }
] 






export const mockTasks: TaskProps[] = [
    {
        id: 'i-got-the-job-role-senior-frontend-8949383-dev', 
        task_msg: 'Be greatful to Allah',
        assigned_user: mockUsers[0].company_id,
        task_date: "2022-30-07",
        task_time: 3000,
        is_completed: 1,
        time_zone: 19800,
    },
    {
        id: 'i-start-a-new-life-8949383-dev', 
        task_msg: 'Donate to charity and help the poor people',
        assigned_user: mockUsers[0].company_id,
        task_date: "2022-30-08",
        task_time: 3000,
        is_completed: 0,
        time_zone: 19800,
    },
    {
        id: 'take-the-sacrifice-dedicated-to-family-responsibities-8949383-dev', 
        task_msg: 'Help siblings, father , mother, sisters, extended relatives',
        assigned_user: mockUsers[0].company_id,
        task_date: "2022-30-09",
        task_time: 3000,
        is_completed: 0,
        time_zone: 19800,
    },
    {
        id: 'i-work-smarter-to-build-trust-and-reliability-with-company-8949383-dev', 
        task_msg: 'Embrace the Plan of my future',
        assigned_user: mockUsers[0].company_id,
        task_date: "2022-30-10",
        task_time: 3000,
        is_completed: 0,
        time_zone: 19800,
    },
    //...
];

export const myPresumableTask = mockTasks[0];




interface Authenticated{
     email:string,
     password:string,
     token:string, 
     first_name:string, 
     last_name:string,
     company_id: string
}

export const mockAuthenticatedUser : Authenticated[] = [
 {
  token:"dhsdjsjshhdsqwwqq",
  email: "juwavictor@gmail.com",
  password:"saladin123",
  first_name:"saladinjake",
  last_name:"saladinjake",
  company_id:"jdseww_dskjdjwk"
}] ;
