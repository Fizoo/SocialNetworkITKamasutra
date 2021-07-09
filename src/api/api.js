import * as axios from "axios";
import {saveProfile} from "../Redux/profile_reducer";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "f15aa505-06e2-4a52-b8b6-00d060536c9e"
    }
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollow(id = 1) {
        return instance.delete(`follow/${id}`)
    },
    follow(id = 1) {
        return instance.post(`follow/${id}`)
    },
    authMe(){
        return instance.get(`auth/me`)
    },
    getProfile(userId){
        return profileAPI.getProfile(userId);
    }
}
export const authAPI = {
    authMe(){
        return instance.get(`auth/me`)
    },
    login(email,password,rememberMe=false){
        return instance.post(`auth/login`,{email,password,rememberMe})
    },
    logout(){
        return instance.delete(`auth/login`)
    },
}
export const profileAPI = {
    getProfile(userId){
        return instance.get(`profile/${userId}`);
    },
    getStatus(userId){
        return instance.get(`profile/status/`+userId);
    },
    updateStatus(status){
        return instance.put(`profile/status`,{status:status});
    },
    savePhoto(photoFile){
        /*put  file from a form with Axios*/
        const formData=new FormData();
        formData.append('image',photoFile)
        return instance.put(`profile/photo`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })
    },
    saveProfile(profile){
        return instance.put('profile',profile);
    }
    /*,
    saveProfile(profile){
        return instance.put(`profile`,profile)
    }*/
}



