import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";



let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(applyMiddleware(thunkMiddleware)));
// @ts-ignore
window.__store__ = store;

type RootReducers=typeof reducers;
export type AppStateType=ReturnType<RootReducers>

type PropertiesTypes<T> =T extends {[key:string]:infer U}?U:never
export type InferActionTypes<T extends {[key:string]:(...args:any[])=>any}> =ReturnType<PropertiesTypes<T>>

export type BaseThunkType<A extends Action,R=Promise<void>> =ThunkAction<R, AppStateType, unknown, A>

export default store;