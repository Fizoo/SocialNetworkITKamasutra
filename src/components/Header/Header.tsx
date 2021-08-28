import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";



const Header: React.FC = (props) => {

    const  dispatch =useDispatch()
    const login=useSelector((state:AppStateType)=>state.auth.login)
    const isAuth=useSelector((state:AppStateType)=>state.auth.isAuth)
    const logouted=()=>dispatch(logout())

    return <header className={s.header}>
        <img src='https://www.freelogodesign.org/Content/img/logo-ex-7.png' />

        <div className={s.loginBlock}>
            { isAuth
                ? <div>{login} - <button onClick={logouted}>Log out</button> </div>
                : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}
export default Header;
