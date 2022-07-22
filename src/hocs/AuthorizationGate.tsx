import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import { History } from "history";

/*
 * @author: test code exercires
 * Auth gate way props interface
 */
interface AuthenticatorGateWayProps {
  authorized: string;
  history?: History;
}

/*
 * @author: test code exercires
 *  @desc: Auth HOC FOR REUSABLE AUTHENTICATION AND REDIRECTIONS
 */

export default (ChildComponent: React.FC<any>) => {
  class AuthenticatorGateWay extends Component<AuthenticatorGateWayProps> {
    componentDidMount() {
      this.redirect();
    }
    componentDidUpdate() {
      this.redirect();
    }
    redirect() {
      if (!this.props.authorized) {
        this.props.history!.push("/");
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  const mapStateToProps = (state: any) => {
    return {
      authorized: state.auth.authenticated,
    };
  };

  return connect(mapStateToProps, null)(AuthenticatorGateWay);
};
