import React, {
  Component,
  useState,
  SyntheticEvent,
  MouseEvent,
  useEffect,
  Dispatch
} from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { createTask, getTasks } from "../../../actions";

interface TaskProps {
  id?: string | null;
  assigned_user: string; //<id value from /team api response >,
  task_date: string; //<date in 'YYYY-MM-DD' format from date field in task>,
  task_time: number; //<time from time field in task>,integer ,(for ex=01:30am means 5400 seconds)
  is_completed: number; //<0 or 1 integer data type>,
  time_zone: number; //<Give timezone value in seconds and data type is integer>,(for ex= +05:30 means 19800 seconds)
  task_msg: string; //<task description from task description field in task>
}

type DynamicDataProps<T> = {
  listItems: TaskProps[];
  removeItem: (index: string) => void;
};

type DynamicDataState = {};


interface StateProps {
  auth: object;
  assignedUser: object;
  form: object;
  taskReducer: object
}


const DynamicData: React.SFC<DynamicDataProps<any>> = (
  props
) => {
  console.log(props);
  const data = useSelector(
    (state: RootStateOrAny) => state.taskReducer
  );
  console.log(data);
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
  <div>
            {["", ""].map((index) => {
              return (
                <div
                  style={{ marginBottom: "50px" }}
                  className="card-item"
                  onClick={() => props.removeItem(index)}
                  key={index}
                >
                  <div className="main-flex-box">
                    <div className="two-colsets">
                      <a href="" className=" profile  waves-light ">
                        <img
                          src="./logo192.png"
                          alt="user-img"
                          className="img-circle"
                        />{" "}
                      </a>
                      <div className="list-columnset">
                        <p className="margin-space">sample</p>
                        <p className="margin-space">sample</p>
                      </div>
                    </div>

                    <div className="right">
                      <i className=" fa fa-edit"></i>
                      <i className="fa fa-ellipsis-h "></i>
                    </div>
                  </div>

                  <hr />

                  <div className="main-flex-box">
                    <div className="two-colsets">
                      <p className=" "></p>
                      <div className="list-columnset">
                        <p className="margin-space">sample</p>
                        <p className="margin-space">sample</p>
                      </div>
                    </div>

                    <div className="right">
                      <i className=" fa fa-phone "></i>
                      <i className="fa fa-comments-o "></i>
                      <i className="fa fa-envelope "></i>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        
  );
};

const mapStateToProps = ( state : StateProps ) => ({ data: state });
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
   getTasks: () => dispatch(getTasks()),
});

export default DynamicData;
