import React, { Dispatch } from 'react';
import { reduxForm, Field, reset } from 'redux-form';
import { connect } from 'react-redux';
import { authAction } from "../../actions/index";
import { History } from 'history';

export interface SigninProps {
    handleSubmit: (p: any) => any;
    resetFormFields: () => void;
    sendData: (values: { name: string; password: string }, redirectTo: () => void) => void;
    errorMessage: string;
    history?: History;
}

const Signin: React.SFC<SigninProps> = ({ 
    handleSubmit, 
    resetFormFields, 
    sendData, 
    errorMessage, 
    history 
}: SigninProps) => {

    const renderInput = ({ input, name, type }: any) => {
        return (
            <input {...input} name={name} type={type} />
        );
    };

    const formDataInputs = (credentials: { name: string; password: string }) => {
        sendData(credentials, () => {
           window.location.href="./dashboard"
        });
      
        resetFormFields();

    };

    return (
        <form onSubmit={handleSubmit(formDataInputs)}>
            <label htmlFor="email" >Email:</label><br />
            <Field
                name="email"
                type="text"
                component={renderInput}
            /><br />
            <label htmlFor="email" >Password:</label><br />
            <Field
                name="password"
                type="password"
                component={renderInput}
            /><br />
            <div>{errorMessage}</div>
            <button >Signin</button>
        </form>
    );
}
const mapStateToProps = (state: any) => {
    return {
        errorMessage: state.auth.errorMessageessage
    };
};
const mapDispatchToProps = (dispatch: Dispatch<any>) => {
    return {
        resetFormFields: () => dispatch(reset("signin")),
        sendData: (credentials: { name: string; password: string }, redirectTo: () => void) => dispatch(authAction(credentials, redirectTo))
    };
}

export default reduxForm({
    form: "signin"
})(connect(mapStateToProps, mapDispatchToProps)(Signin));