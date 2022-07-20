
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
	   // getAssignedUsers();
	  }, [getAssignedUsers]);

	  return  (
	     
     <React.Fragment>

       <div className="nav-bar">
           <div className="left-component">
              <div className="hambugger">
                x
              </div>
              <div className="logo">
                logo
              </div>
              <div className="search-bar search">
                
              </div>



           </div>
           <div className="right-component">
                <div className="icon1">
                </div>
                <div className="icon1">
                </div>
                  <div className="icon2">
                  </div>
                  

                  <div className="icon4">
                  </div>
                  <div className="icon5">
                  </div>
                  <div className="icon6">
                  </div>


               </div>

      </div>



      <div className="body-layout">

         <div className="sidebar-iconic">
              <div className="icon1">
              </div>
              <div className="icon2">
              </div>
              

              <div className="icon4">
              </div>
              <div className="icon5">
              </div>
              <div className="icon6">
              </div>


              <div className="icon1">
              </div>
              <div className="icon2">
              </div>
              

              <div className="icon4">
              </div>
              <div className="icon5">
              </div>
              <div className="icon6">
              </div>
              <div className="icon1">
              </div>
              <div className="icon2">
              </div>
              

              <div className="icon4">
              </div>
              <div className="icon5">
              </div>
              <div className="icon6">
              </div>
         

         </div>

         <div className="body-widget">

          
                
         <div className="horizontal-tabs">
              <div className="left-component">
                    <div className="icon2">
                      
                    </div>
                    <div className="icon2">
                      
                    </div>

                    <div className="icon2">
                      
                    </div>

                    <div className="icon2">
                      
                    </div>
                    <div className="icon2">
                      
                    </div>
                    <div className="icon2">
                      
                    </div>
                 </div>
                 <div className="right-component">
                 
                  <div className="icon1">
                    </div>
                    <div className="icon2">
                    </div>
                    

                    <div className="icon4">
                    </div>
                    <div className="icon5">
                    </div>
                    <div className="icon6">
                    </div>

                    <div className="icon2">
                      
                    </div>
                    <div className="icon2">
                      
                    </div>
                    <div className="icon2">
                      
                    </div>


                 </div>


         </div>

         <div className="workspace">
                   <div className="left-space-equal">

                      <AddForm/>

                   </div>
                   <div className="right-space-equal">

                   </div>
                  
         </div>

    </div>

  </div>

</React.Fragment>
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

//const DashboardAuthenticated = AuthInterceptor(Dashboard);
//export default connect(mapStateToProps, mapDispatchToProps)(DashboardAuthenticated);
export default Dashboard 

 
