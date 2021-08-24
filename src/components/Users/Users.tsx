import React, {useEffect} from 'react';
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import {UserSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getFollowingInProgress, getTotalUsersCount, getUsers} from "../../redux/users-selectors";
import {AppStateType} from "../../redux/redux-store";
import {follow,unfollow} from "../../redux/users-reducer";

interface PropsType {
}

let Users:React.FC<PropsType> = ( props) => {

    useEffect(()=>{
        dispatch( requestUsers(currentPage, pageSize,filter))
    },[])

    const totalUsersCount=useSelector(getTotalUsersCount)
    const currentPage=useSelector(getCurrentPage)
    const pageSize=useSelector((state:AppStateType)=>state.usersPage.pageSize)
    const filter=useSelector((state:AppStateType)=>state.usersPage.filter)
    const users=useSelector(getUsers)
    const followingInProgress=useSelector(getFollowingInProgress)

    const dispatch=useDispatch();

    const onPageChanged=(pageNumber:number)=>{
        dispatch(requestUsers(pageNumber, pageSize,filter))
    }
    const onFilterChanged=(filter:FilterType)=>{
       dispatch( requestUsers(1, pageSize,filter))
    }
    const followed=(userId:number)=>{
        dispatch(follow(userId))
    }
    const unfollowed=(userId:number)=>{
        dispatch(unfollow(userId))
    }

    return <div>
        <UserSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                                     unfollow={unfollowed}
                                     follow={followed}
                    />)}
        </div>
    </div>
}

export default Users;