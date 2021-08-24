import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import style from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";

interface IProps {
    captchaUrl: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginType, IProps> & IProps> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormTypeKeys>("Email", "email", [required], Input)}
            {createField<LoginFormTypeKeys>("Password", "password", [required], Input, {type: "password"})}
            {createField<LoginFormTypeKeys>(undefined, "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && createField<LoginFormTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

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

const LoginReduxForm = reduxForm<LoginType, IProps>({form: 'login'})(LoginForm)

export type LoginType = {
    email: string
    password: number
    rememberMe: boolean
    captcha: string
}
type LoginFormTypeKeys = Extract<keyof LoginType, string>

const Login: React.FC = (props) => {

    const dispatch = useDispatch()
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const onSubmit = (formData: LoginType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }


    return isAuth
        ? <Redirect to={"/profile"}/>
        : <div>
            <h1>Login</h1>
            <LoginReduxForm
                onSubmit={onSubmit}
                captchaUrl={captchaUrl}/>
        </div>
}


export default Login