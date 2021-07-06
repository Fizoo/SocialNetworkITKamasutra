import React from 'react';
import s from './Friends.module.css';
import {NavLink} from "react-router-dom";

const Friends = (props) => {
    return (
        <div className={s.friends}>
            <div className={s.friend}>
                <NavLink to='friends'>Friends</NavLink>

            </div>
            <div className={s.friendLogo}>
                <a href="">
                    <img src="https://i.pinimg.com/originals/6e/50/80/6e50801a96af2b4ef48072854cfd1917.jpg" alt=""/>
                </a>
                <a href="">
                    <img src="https://i.pinimg.com/originals/6e/50/80/6e50801a96af2b4ef48072854cfd1917.jpg" alt=""/>
                </a>
                <a href="">
                    <img src="https://i.pinimg.com/originals/6e/50/80/6e50801a96af2b4ef48072854cfd1917.jpg" alt=""/>
                </a>
            </div>
        </div>
    );
};

export default Friends;