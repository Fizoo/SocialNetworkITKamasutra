import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

interface IProps {
    captchaUrl:string|null
}

const LoginForm:React.FC<InjectedFormProps<LoginType,IProps> & IProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormTypeKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            { captchaUrl && <img src={captchaUrl} />}
            { captchaUrl &&  createField<LoginFormTypeKeys>("Symbols from image", "captcha", [required], Input, {}) }


            {error && <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>Login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginType,IProps>({form: 'login'})(LoginForm)

type MapStatePropsType={
    captchaUrl:string|null
    isAuth:boolean|null
}
type DispatchType={
    login:(email:string, password:number, rememberMe:boolean, captcha:string)=>void
}

export type LoginType={
    email:string
    password:number
    rememberMe:boolean
    captcha:string
}
type LoginFormTypeKeys=Extract <keyof LoginType,string>

const Login:React.FC<MapStatePropsType &DispatchType> = (props) => {
    const onSubmit = (formData:LoginType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
}
const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);