import React from 'react';
import {actions} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";

interface MapTypes {
    //dialogsPage:InitialState
    dialogsPage:any
}
interface DispatchType {
    sendMessage:(newMessageBody:string)=>void
}


let mapStateToProps = (state:AppStateType):MapTypes => {
    return {
        dialogsPage: state.dialogsPage
    }
}
let mapDispatchToProps = (dispatch:any):DispatchType => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(actions.sendMessageCreator(newMessageBody));
        }
    }
}

export default compose(
    connect<MapTypes,DispatchType,{},AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);