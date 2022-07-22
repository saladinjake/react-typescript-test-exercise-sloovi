import React, { useEffect, Dispatch } from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getAssignedUsers, getTasks } from "../../actions/";
import AuthInterceptor from "../../hocs/AuthorizationGate";
import AddTask from "./TaskEvent/Task";

// we need this
import { DefaultingRootState } from "../../reducers";

/*
 * @author: test code exercires
 *  @desc: fAKE MOCK UP SAMPLE DESIGN TEMPLATE : NAV BAR COMPONENT
 */
const MockUpNavbar = () => {
  return (
    <div className="nav-bar">
      <div className="left-component">
        <div className="hambugger">x</div>
        <div className="logo">logo</div>
        <div className="search-bar search"></div>
      </div>
      <div className="right-component">
        <div className="icon1"></div>
        <div className="icon1"></div>
        <div className="icon2"></div>

        <div className="icon4"></div>
        <div className="icon5"></div>
        <div className="icon6"></div>
      </div>
    </div>
  );
};

/*
 * @author: test code exercires
 *  @desc:fAKE MOCK UP SAMPLE DESIGN TEMPLATE : SIDE BAR COMPONENT
 */
const MockUpSidebar = () => {
  return (
    <div className="sidebar-iconic">
      <div className="icon1"></div>
      <div className="icon2"></div>

      <div className="icon4"></div>
      <div className="icon5"></div>
      <div className="icon6"></div>

      <div className="icon1"></div>
      <div className="icon2"></div>

      <div className="icon4"></div>
      <div className="icon5"></div>
      <div className="icon6"></div>
      <div className="icon1"></div>
      <div className="icon2"></div>

      <div className="icon4"></div>
      <div className="icon5"></div>
      <div className="icon6"></div>
    </div>
  );
};

/*
 * @author: test code exercires
 *  @desc:fAKE MOCK UP SAMPLE DESIGN TEMPLATE : NAV BAR COMPONENT
 */
const FakeToolBar = () => {
  return (
    <div className="horizontal-tabs">
      <div className="left-component">
        <div className="icon2"></div>
        <div className="icon2"></div>

        <div className="icon2"></div>

        <div className="icon2"></div>
        <div className="icon2"></div>
        <div className="icon2"></div>
      </div>
      <div className="right-component">
        <div className="icon1"></div>
        <div className="icon2"></div>

        <div className="icon4"></div>
        <div className="icon5"></div>
        <div className="icon6"></div>

        <div className="icon2"></div>
        <div className="icon2"></div>
        <div className="icon2"></div>
      </div>
    </div>
  );
};

/*
 * @author: test code exercires
 *  @desc: ASSIGNED USER PROPS
 */
interface userAssignment {
  name: string;
  company_id: string;
}

/*
 * @author: test code exercires
 *  @desc: SERVICE PROPS
 */
interface EnumServiceItems extends Array<userAssignment> {}

export interface DashboardProps {
  data?: EnumServiceItems[];
  getAssignedUsers: () => void;
  getTasks: () => void;
  tasks?: Array<any>;
}

/*
 * @author: test code exercires
 *  @desc: USER DASHBOARD AFTER LOGIN
 */
const Dashboard: React.SFC<DashboardProps> = ({
  data,
  tasks,
  getAssignedUsers,
  getTasks,
}) => {
  data = useSelector(
    (state: RootStateOrAny) => state.assignedUser.assignedUsers
  );

  tasks = useSelector((state: RootStateOrAny) => state);

  //console.log(tasks);

  ////console.log(data);
  useEffect(() => {
    getAssignedUsers();
    getTasks();
  }, [getAssignedUsers, getTasks]);

  //console.log(data);

  return (
    <React.Fragment>
      <MockUpNavbar />

      <div className="body-layout">
        <MockUpSidebar />

        <div className="body-widget">
          <FakeToolBar />

          <div className="workspace">
            <div className="left-space-equal">
              {data && <AddTask usersAssigned={data} />}
            </div>
            <div className="right-space-equal"></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

/*
 * @author: test code exercires
 *  @desc: STATE PROPS
 */
interface StateProps {
  auth: object;
  assignedUser: object;
  form: object;
}

/*
 * @author: test code exercires
 *  @desc: MAPPER FUNCTION TO MATCH STATE PROPS
 */
const mapStateToProps = (state: StateProps) => {
  //console.log(state);
  //const assignedUser = state.assignedUser;
  ////console.log(state.assignedUser);
  return {
    data: state,
    // tasks: state.todoReducers
  };
};

/*
 * @author: test code exercires
 *  @desc: MAPPER FUNCTION TO MAP DISPATCHERS TO ACTIONS
 */
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getAssignedUsers: () => dispatch(getAssignedUsers()),
  getTasks: () => dispatch(getTasks()),
});

/*
 * @author: test code exercires
 *  @desc: EXPORTED REDUX AWEAR COMPONENT
 */
const DashboardAuthenticated = AuthInterceptor(Dashboard);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAuthenticated);
