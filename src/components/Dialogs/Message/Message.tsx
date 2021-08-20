import React from 'react';
import s from './../Dialogs.module.css';

interface PropsType {
    message:string|undefined
}

const Message:React.FC<PropsType> = (props) => {
    return <div className={s.dialog}>{props.message}</div>
}

export default Message;