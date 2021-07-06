import profileReducer from "./profile_reducer";
import dialogsReducer from "./dialogs_reducer";
import sidebarReducer from "./sidebar_reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11},
                {id: 3, message: 'Blabla', likesCount: 11},
                {id: 4, message: 'Dada', likesCount: 11}
            ],
            newPostText: ''
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Viktor'},
                {id: 6, name: 'Valera'}
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'}
            ],
            newMessage: ''
        },
        sidebar:{}
    },
    getState(){
        return this._state;
    },
    _callSubscriber() {
        console.log("Yo")
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action){
        profileReducer(this._state.profilePage,action);
        dialogsReducer(this._state.dialogsPage,action);
        sidebarReducer(this._state.sidebar,action);
        this._callSubscriber(this._state);
    }
}

export default store;
window.store =store;