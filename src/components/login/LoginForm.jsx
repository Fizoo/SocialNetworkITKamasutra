import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input} from "../common/FormsContols/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import s from "../common/FormsContols/FormControls.module.css"

const maxLength10 = maxLengthCreator(30);
const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} component={Input} name={"email"} validate={[required, maxLength10]}/>
            </div>
            <div>
                <Field placeholder={'Password'} type={'password'} component={Input} name={"password"}
                       validate={[required, maxLength10]}/>
            </div>
            <div>
                <Field component={'input'} type={'checkbox'} name={"rememberMe"}/>remember me
            </div>
            {
                props.error && <div className={s.formSummaryError}>
                    {props.error}
                </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    );
};
export const LoginReduxForm = reduxForm({
    form: 'login'
})(LoginForm)

/*export default LoginForm;*/
