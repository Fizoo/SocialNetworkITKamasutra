import React from 'react';
import s from '../MyPosts.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

interface PropsType {
}

const AddPostForm:React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={"textarea"} name="postText"/>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
    )
}

export default reduxForm<AddPostFormValuesType,PropsType>({form: 'profile-add-post'})(AddPostForm)

export type AddPostFormValuesType = {
    newPostText: string
}