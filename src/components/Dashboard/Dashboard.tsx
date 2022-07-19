import React from 'react';
import AuthInterceptor from '../../hocs/AuthorizationGate';

export interface DashboardProps {
    
}
 
const Feature: React.SFC<DashboardProps> = () => {
    return ( 
        <div>
            Here is the dashboard
        </div>
     );
}
 
export default AuthInterceptor(Feature);