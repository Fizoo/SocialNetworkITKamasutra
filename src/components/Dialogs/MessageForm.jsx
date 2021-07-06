import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsContols/FormsControls";
import {maxLengthCreator, required} from "../../utils/validators/validators";

const maxLength50 = maxLengthCreator(20);
const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field
                    component={Textarea}
                    name={'newMessageBody'}
                    placeholder={'Add new message'}
                    validate={[required,maxLength50]}
                />
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    );
}

export const AddMessageFormRedux=reduxForm({
    form:'dialogAddMessageForm'
})(AddMessageForm)
