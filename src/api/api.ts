import axios from "axios";
import {PhotosType, UserType} from "../types/types";

export enum ResultCodesEnum{
    Success=0,
    Error=1,
}
export enum ResultCodeCaptcha{

    CaptchaIsRequired=10
}



export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers:     {
        "API-KEY": "f15aa505-06e2-4a52-b8b6-00d060536c9e"
    }
});

export type GetItemType ={
    items:Array<UserType>
    totalCount:number
    error:string|null
}


export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}