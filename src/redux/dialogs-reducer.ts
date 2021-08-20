//const SEND_MESSAGE = 'SEND_MESSAGE';
import {InferActionTypes} from "./redux-store";

type ActionTypes =InferActionTypes<typeof actions>

enum actionCr{
    SEND_MESSAGE='SEND_MESSAGE'
}

interface CreatedM {
    id: number
    message: string | undefined
}
interface CreatedD {
    id: number
    name: string | undefined
}

export type InitialState=typeof initialState;

export const actions={
    sendMessageCreator: (newMessageBody:string)=> ({type: actionCr.SEND_MESSAGE, newMessageBody} as const)
}

let initialState= {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ] as Array<CreatedD> ,
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ] as Array<CreatedM>
};

const dialogsReducer = (state = initialState, action:ActionTypes):InitialState => {
    switch (action.type) {
        case actionCr.SEND_MESSAGE:
            let body:string|undefined = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}]
            };
        default:
            return state;
    }
}

export default dialogsReducer;