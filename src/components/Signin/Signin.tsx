import React, { Dispatch, useState } from "react";
import { reduxForm, Field, reset } from "redux-form";
import { connect } from "react-redux";
import { authAction } from "../../actions/index";
import { History } from "history";

/*
 * @author: test code exercires
 * Auth SIGNIN PAGE PROPS
 */

export interface SigninProps {
  handleSubmit: (p: any) => any;
  resetFormFields: () => void;
  sendData: (
    values: { name: string; password: string },
    redirectTo: () => void
  ) => void;
  errorMessage: string;
  history?: History;
}

/*
 * @author: test code exercires
 *  @desc:SIGN IN PAGE
 */

const Signin: React.SFC<SigninProps> = ({
  handleSubmit,
  resetFormFields,
  sendData,
  errorMessage,
  history,
}: SigninProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const renderInput = ({ input, name, type, className }: any) => {
    return <input {...input} name={name} type={type} className={className} />;
  };

  const formDataInputs = (credentials: { name: string; password: string }) => {
    setIsLoading(true);
    sendData(credentials, () => {
      setIsLoading(false);
      setTimeout(() => {
          setIsLoading(true);
        //window.location.href = "./dashboard";
      }, 5000);
    });
    
    setTimeout(() => {
     // window.location.href = "./dashboard";
    }, 5000);
    setIsLoading(false);

    resetFormFields();
  };

  return (
    <main className="main">
      <div className="container">
        <section className="wrapper">
          <div className="heading">
            <h2>Sloovee</h2>
            <h1 className="text text-large">Sign In</h1>

            <div>{errorMessage}</div>
          </div>
          <form
            onSubmit={handleSubmit(formDataInputs)}
            name="login"
            className="form"
          >
            <label htmlFor="email">Email:</label>
            <br />
            <Field
              name="email"
              type="text"
              className="form-control"
              component={renderInput}
            />
            <br />
            <label htmlFor="email">Password:</label>
            <br />
            <Field
              name="password"
              type="password"
              className="form-control"
              component={renderInput}
            />
            <br />
            <div>{errorMessage}</div>
            {!isLoading ? (
              <button className="btn btn-primary">Signin</button>
            ) : (
              <button className="btn btn-large btn-primary" disabled>
                <i className="fa fa-spinner"></i>
              </button>
            )}
          </form>
        </section>
      </div>
    </main>
  );
};
const mapStateToProps = (state: any) => {
  return {
    errorMessage: state.auth.errorMessageessage,
  };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    resetFormFields: () => dispatch(reset("signin")),
    sendData: (
      credentials: { name: string; password: string },
      redirectTo: () => void
    ) => dispatch(authAction(credentials, redirectTo)),
  };
};

export default reduxForm({
  form: "signin",
})(connect(mapStateToProps, mapDispatchToProps)(Signin));
