import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../../../common/FormsContols/FormsControls";
import {Contact} from "./ProfileInfo";
import s from './ProfileInfo.module.css';

const ProfileDataForm = ({profile,handleSubmit,error}) => {
    return (
            <form onSubmit={handleSubmit}>

                    <div>
                        <b>Full name</b>: <Field component={Input} placeholder={'FullName'} name={'fullName'}/>
                    </div>
                    <div>

                        Looking for a job:
                        <Field component={'input'} name={'lookingForAJob'} type={'checkbox'}/>
                    </div>

                    <div>
                        <b>My professional skills</b>:
                        <Field component={Textarea} placeholder={'My professional skills'} name={'lookingForAJobDescription'}/>
                    </div>

                    <div>
                        <b>About me</b>
                        <Field component={Textarea} placeholder={'About me'} name={'AboutMe'}/>
                    </div>
                    <div>
                        <b>Contacts</b>: {Object.entries(profile.contacts).map(key => {
                        return <div key={key} className={s.contact}>
                                    <Field component={Input} placeholder={key[0]} name={'contacts.'+key[0]}/>
                        </div>
                        /*<Contact
                            key={key}
                            contactTitle={key[0]}
                            contactValue={key[1]}
                        />*/
                    })
                    }
                    </div>
                {
                    error && <div className={s.formSummaryError}>
                        {error}
                    </div>
                }
                <div>
                    <button >save</button>
                </div>
            </form>

    );
};

const ProfileFormRedux=reduxForm({
    form:'edit-profile'
})(ProfileDataForm)

export default ProfileFormRedux;
