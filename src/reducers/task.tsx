import {
  CREATE_ITEM,
  RETRIEVE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
} from "../actions/types";

interface TaskProps {
  id?: string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: boolean; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

const initialState: TaskProps[] = [];

interface ActionProps {
  type: string;
  payload: TaskProps;
}

function taskReducer(tasks = initialState, action: ActionProps) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_ITEM:
      return [...tasks, payload];

    case RETRIEVE_ITEM:
      return payload;

    case UPDATE_ITEM:
      return tasks.map((singleTask) => {
        if (singleTask.id === payload.id) {
          return {
            ...singleTask,
            ...payload,
          };
        } else {
          return singleTask;
        }
      });

    case DELETE_ITEM:
      return tasks.filter(({ id }) => id !== payload.id);
    default:
      return tasks;
  }
}

export default taskReducer;
