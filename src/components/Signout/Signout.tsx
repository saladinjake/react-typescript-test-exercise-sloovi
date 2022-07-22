import React, { useEffect, Dispatch } from "react";
import { connect } from "react-redux";
import { AUTH_USER } from "../../actions/types";
import Login from "../Signin/Signin";
export interface SignoutProps {
  logout: () => void;
}

/*
 * @author: test code exercires
 *  @desc:lOGOUT FEAUTURE NOT ASKED TO IMLEMENT
 */

const Signout: React.SFC<SignoutProps> = ({ logout }) => {
  useEffect(() => {
    localStorage.removeItem("token");
    logout();
  });

  return (
    <div>
      <Login />
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    logout: () => dispatch({ type: AUTH_USER, payload: "" }),
  };
};

export default connect(null, mapDispatchToProps)(Signout);
