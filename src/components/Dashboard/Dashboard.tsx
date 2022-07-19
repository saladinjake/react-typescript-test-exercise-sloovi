
import React, { useEffect, Dispatch } from "react";
import { 
   connect, 
   
} from "react-redux";
import { 
  getAssignedUsers 
} from "../../actions/";
import AuthInterceptor from '../../hocs/AuthorizationGate';
import AddForm from "./Addform"


export interface DashboardProps {
    data?: string[],
    getAssignedUsers : () => void
}







const Dashboard: React.SFC<DashboardProps> = ({ 
   data,       
   getAssignedUsers }) => {
	  
	  //console.log(data)
	  useEffect(() => {
	    getAssignedUsers();
	  }, [getAssignedUsers]);

	  return  (
	     <div>
         <AddForm/>

       </div>
	  );
};


interface StateProps {
    auth: object, 
    assignedUser: object, 
    form: object
}

const mapStateToProps = (state: StateProps) => {
  console.log(state)
   const  assignedUser  = state.assignedUser;
	return {

	  data: assignedUser
	}
} 
const mapDispatchToProps = (dispatch :Dispatch<any>) => ({
  getAssignedUsers: () => dispatch(getAssignedUsers()),
});

const DashboardAuthenticated = AuthInterceptor(Dashboard);
export default connect(mapStateToProps, mapDispatchToProps)(DashboardAuthenticated); 

 
