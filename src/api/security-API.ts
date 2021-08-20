import {instance} from "./api";

type GetCaptchaUrlSuccessType = {
    url: string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlSuccessType>(`security/get-captcha-url`).then(res=>res.data)
    }
}