import React from 'react';
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsContols/FormsControls";

const maxLength10=maxLengthCreator(10);

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    placeholder={'Add post'}
                    name={'myNewPost1'}
                    validate={[required,maxLength10]}
                />
            </div>
            <div>
                <button>Add</button>
            </div>


        </form>
    );
}

export const PostForm=reduxForm({
    form:'myPostRedux'})(MyPostForm);
