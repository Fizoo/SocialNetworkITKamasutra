import React from 'react';
import styles from "./users.module.css";
import User from "./User";
import Paginations from "../common/Pagination/Paginations";


let Users = (props) => {


    return <div>
        <Paginations
            totalItemsCount={props.totalUsersCount}
            pageSize={props.pageSize}
            currentPage={props.currentPage}
            onPageChanged={props.onPageChanged}
        />

        {
            props.users.map(u =>
               <User
                   key={u.id}
                   user={u}
                   followingInProgress={props.followingInProgress}
                   followed={props.followed}
                   unfollow={props.unfollow}
                   follow={props.follow}

               />
           )
        }
    </div>
}

export default Users;
