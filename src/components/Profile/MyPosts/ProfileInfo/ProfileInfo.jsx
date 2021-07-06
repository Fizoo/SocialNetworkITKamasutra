import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = ({profile,updateStatus,status}) => {

    if(!profile )
    {
        return <Preloader/>
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large} alt=""/>
                {profile.aboutMe}
               {/* <ul>
                    <p>My Contacts</p>
                   <li>facebook: {props.profile.contacts.facebook} </li>
                   <li>vk: {props.profile.contacts.vk} </li>
                   <li>instagram: {props.profile.contacts.instagram} </li>
                </ul>*/}
                <ProfileStatus
                    updateStatus={updateStatus}
                    status={status} />
            </div>
        </div>
    )
}

export default ProfileInfo;