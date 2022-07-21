import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export interface HeaderProps {
  isAuth: string;
}

const Header: React.SFC<HeaderProps> = ({ isAuth }) => {
  const display = () => {
    if (isAuth) {
      return <>Sloovee</>;
    } else {
      return <></>;
    }
  };
  return <div>{display()}</div>;
};

const mapStateToProps = (state: any) => {
  return {
    isAuth: state.auth.authentichated,
  };
};

export default connect(mapStateToProps)(Header);
