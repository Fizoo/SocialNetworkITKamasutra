import {ResultCodeCaptcha, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import { BaseThunkType, InferActionTypes} from "./redux-store";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/security-API";


const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';

let initialState:InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null, then captcha is not required
};

export  const actions={
    setAuthUserData:(userId:number|null, email:string|null, login:string|null, isAuth:boolean):SetAuthUserDataType => ({
        type: SET_USER_DATA,
        payload:
            {userId, email, login, isAuth}
    }as const) ,
    getCaptchaUrlSuccess: (captchaUrl:string):GetCaptchaUrlSuccessType => ({
        type: GET_CAPTCHA_URL_SUCCESS, payload: {captchaUrl}
    }as const)
}

const authReducer = (state = initialState, action:ActionTypes):InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}

export const getAuthUserData = ():ThunkType => async (dispatch) => {
    let meData = await authAPI.me();

    if (meData.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = meData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email:string, password:number, rememberMe:boolean, captcha:string):ThunkType => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.resultCode === ResultCodesEnum.Success) {
        // success, get auth data
        dispatch(getAuthUserData())
    } else {
        if (response.resultCode === ResultCodeCaptcha.CaptchaIsRequired) {
            dispatch(getCaptchaUrl());
        }

        let message = response.messages.length > 0 ? response.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
}

export const getCaptchaUrl = ():ThunkType => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.url;
    dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
}

export const logout = ():ThunkType => async (dispatch) => {
    let response = await authAPI.logout();

    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

type ActionTypes =InferActionTypes<typeof actions>

type ThunkType =BaseThunkType<ActionTypes| FormAction>

export type InitialStateType={
    userId:number| null,
    email:string| null,
    login:string| null,
    isAuth:boolean|null,
    captchaUrl: string|null
}
type SetAuthUserDataTypePayload={
    userId:number|null,
    email:string|null,
    login:string|null,
    isAuth:boolean|null
}
type SetAuthUserDataType={
    type:typeof SET_USER_DATA,
    payload:SetAuthUserDataTypePayload
}

type GetCaptchaUrlSuccessType={
    type:typeof GET_CAPTCHA_URL_SUCCESS
    payload:{captchaUrl:string}
}

