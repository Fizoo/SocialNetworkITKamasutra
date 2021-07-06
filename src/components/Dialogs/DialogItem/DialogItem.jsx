import React from 'react';
import s from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) => {

    let path = "/dialogs/" + props.id;
    return (
        <div>
            <div className={s.dialog + ' ' + s.active}>
                <div>
                    <img
                    src="https://img.freepik.com/free-photo/young-woman-with-beautiful-face_144962-1856.jpg?size=626&ext=jpg"
                    alt=""/>
                </div>
                <div>
                    <NavLink to='path'>{props.name}</NavLink>
                </div>
            </div>

        </div>

    )
}


export default DialogItem;