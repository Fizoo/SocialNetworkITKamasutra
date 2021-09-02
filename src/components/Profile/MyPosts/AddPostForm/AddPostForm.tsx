import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {required} from "../../../../utils/validators/validators";

interface PropsType {
}

const AddPostForm:React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    {
                        createField<KeysType>('Your post','newPostText',[required],Textarea)
                    }
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
type KeysType=GetStringKeys<AddPostFormValuesType>