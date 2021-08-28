import {ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {profileAPI} from "../api/profile-API";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    profile: null as null|ProfileType,
    status: "" as string,
    newPostText:''
};

const profileReducer = (state = initialState, action:ActionTypes):InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case DELETE_POST:
            return {...state, posts: state.posts.filter(p => p.id != action.postId)}

        case SAVE_PHOTO_SUCCESS:
            debugger;
            return {...state, profile: {...state.profile, photos: action.photos }as ProfileType}
        default:
            return state;
    }
}

export const actions = {
     addPostActionCreator:  (newPostText:string)=> ({type: ADD_POST, newPostText}  as const),
     setUserProfile : (profile:ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
     setStatus : (status:string) => ({type: SET_STATUS, status} as const),
     deletePost : (postId:number)=> ({type: DELETE_POST, postId} as const),
     savePhotoSuccess : (photos:PhotosType)=> ({type: SAVE_PHOTO_SUCCESS, photos} as const)
}

export const getUserProfile = (userId:number):ThunkType => async (dispatch:any) => {
    const response = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response));
}

export const getStatus = (userId:number):ThunkType => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response));
}

export const updateStatus = (status:string):ThunkType => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);

        if (response.resultCode === ResultCodesEnum.Success) {
            dispatch(actions.setStatus(status));
        }
    } catch(error) {
        //
    }
}

export const savePhoto = (file:File):ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);

    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}
export const saveProfile = (profile:ProfileType):ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.resultCode === 0) {
        if(userId!=null){
            dispatch(getUserProfile(userId))
        }
        else {
            throw new Error('UserId null')
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: response.messages[0] }));
        return Promise.reject(response.messages[0]);
    }
}

export default profileReducer;

type ActionTypes=InferActionTypes<typeof actions>
type ThunkType=BaseThunkType<ActionTypes | FormAction>
export type InitialStateType=typeof initialState