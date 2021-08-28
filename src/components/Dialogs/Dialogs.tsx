import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import AddMessageForm from "./AddMessageForm/AddMessageForm";
import {actions} from "../../redux/dialogs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";



const Dialogs:React.FC = (props) => {

    const dispatch=useDispatch()
    const isAuth=useSelector((state:AppStateType)=>state.auth.isAuth)
    const dialogsPage=useSelector((state:AppStateType)=>state.dialogsPage)
    const sendMessaged=(values:string)=>{
        dispatch(actions.sendMessageCreator(values))
    }
    //let state = dialogsPage;

    let dialogsElements = dialogsPage.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = dialogsPage.messages.map( m => <Message message={m.message} key={m.id} /> );


    let addNewMessage = (values:any) => {
        sendMessaged(values.newMessageBody);
    }

    if (!isAuth)
        return <Redirect to={"/login"} /> ;

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div>{ messagesElements }</div>

            </div>
            <AddMessageForm onSubmit={addNewMessage} />
        </div>
    )
}

export default  withAuthRedirect(Dialogs)

























