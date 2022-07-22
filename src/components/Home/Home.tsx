import React from "react";
import Login from "../Signin/Signin";
export interface HomeProps {}

/*
 * @author: test code exercires
 * lANDING PAGE IS LOGIN PAGE
  @desc:
*/

const Home: React.SFC<HomeProps> = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default Home;
