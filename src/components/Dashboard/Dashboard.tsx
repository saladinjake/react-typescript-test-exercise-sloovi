import React, { useEffect, Dispatch } from "react";
import { connect, RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { getAssignedUsers } from "../../actions/";
import AuthInterceptor from "../../hocs/AuthorizationGate";
import AddTask from "./TaskEvent/Task";

// we need this
import { DefaultingRootState } from "../../reducers";

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

interface userAssignment {
  name: string;
  company_id: string;
}

interface EnumServiceItems extends Array<userAssignment> {}

export interface DashboardProps {
  data?: EnumServiceItems[];
  getAssignedUsers: () => void;
}

const Dashboard: React.SFC<DashboardProps> = ({ data, getAssignedUsers }) => {
  data = useSelector(
    (state: RootStateOrAny) => state.assignedUser.assignedUsers
  );

  console.log(data);

  console.log(data);
  useEffect(() => {
    getAssignedUsers();
  }, [getAssignedUsers]);

  console.log(data);

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

interface StateProps {
  auth: object;
  assignedUser: object;
  form: object;
}

const mapStateToProps = (state: StateProps) => {
  console.log(state);
  const assignedUser = state.assignedUser;
  console.log(state.assignedUser);
  return {
    data: state,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  getAssignedUsers: () => dispatch(getAssignedUsers()),
});

const DashboardAuthenticated = AuthInterceptor(Dashboard);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardAuthenticated);
