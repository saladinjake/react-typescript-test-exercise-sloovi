import React from 'react';
import Login from "../Signin/Signin"
export interface HomeProps {

}

const Home: React.SFC<HomeProps> = () => {
    return (
        <div>
           <Login />
        </div>
    );
}

export default Home;