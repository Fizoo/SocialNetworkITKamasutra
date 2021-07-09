import React from 'react';
import s from './Profile.module.css';
import ProfileInfo from "./MyPosts/ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";


const Profile = ({profile,status,updateStatus,isOwner,savePhoto,saveProfile}) => {
    return (
        <div>
            <ProfileInfo profile={profile}
                        status={status}
                         updateStatus={updateStatus}
                         isOwner={isOwner}
                         savePhoto={savePhoto}
                         saveProfile={saveProfile}

            />
            <MyPostsContainer/>
        </div>
    )
}

export default Profile;