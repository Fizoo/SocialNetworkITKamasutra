
import {getAuthUserData} from "./auth-reducer";
import {AppStateType, InferActionTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState:InitialStateType = {
    initialized: false,
};

export const actions={
    initializedSuccess:()=>({type: INITIALIZED_SUCCESS} as const)
}

const appReducer = (state = initialState, action:ActionTypes):InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

export const initializeApp = ():ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData());

    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export default appReducer;
//ts
export interface InitialStateType {
    initialized:boolean
}
type ActionTypes=InferActionTypes<typeof actions>
type ThunkType=ThunkAction<void, AppStateType, unknown, ActionTypes>