import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../../assets/images/man.jpg"
import ProfileDataForm from "./ProfileDataForm";


const ProfileInfo = ({profile, updateStatus, status, isOwner, savePhoto, saveProfile}) => {

    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
       saveProfile(formData).then(() => {
           setEditMode(false)
       })

    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <img src={profile.photos.large || userPhoto} alt="" className={s.mainPhoto}/>

                {isOwner &&
                <input type="file"
                       onChange={onMainPhotoSelected}/>}
                {editMode
                    ? <ProfileDataForm
                        initialValues={profile}
                        profile={profile}
                        onSubmit={onSubmit}
                    />
                    : <ProfileData profile={profile}
                                   isOwner={isOwner}
                                   goToEditMode={() => setEditMode(true)}
                    />}

                <ProfileStatus
                    updateStatus={updateStatus}
                    status={status}/>
            </div>
        </div>
    )
}
const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <button onClick={goToEditMode}>
                Edit
            </button>
        </div>}

        <div>
            <b>Full name</b>: {profile.fullName}
        </div>
        <div>
            <b>Looking for a job:</b> {profile.lookingForAJob ? 'Yes' : 'No'}
        </div>
        {profile.lookingForAJob &&
        <div>
            <b>My professional skills</b>: {profile.lookingForAJobDescription}
        </div>
        }
        <div>
            <b>About me</b>:{profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.entries(profile.contacts).map(key => {
            return <Contact
                key={key}
                contactTitle={key[0]}
                contactValue={key[1]}
            />
        })
        }
        </div>
    </div>
}
export const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>
        {/*{contactValue !== null && <b>{contactTitle} : {contactValue}</b>}*/}
        <b>{contactTitle} : {contactValue}</b>
    </div>
}

export default ProfileInfo;