import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {AddPostFormValuesType} from "./AddPostForm/AddPostForm";
import {DispatchPropsType} from "./MyPostsContainer";

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm:React.FC<InjectedFormProps<AddPostFormValuesType>> = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field name="newPostText" component={Textarea} placeholder={"Post message"}
                   validate={[required, maxLength10]} />
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>;
}

let AddNewPostFormRedux = reduxForm<AddPostFormValuesType,{}>({form: "ProfileAddNewPostForm"})(AddNewPostForm);

const MyPosts:React.FC<DispatchPropsType> = React.memo(props => {


    const posts=useSelector((state: AppStateType)=>state.profilePage.posts)


    let postsElements =
        [...posts]
            .reverse()
            .map(p => <Post key={p.id} message={p.message} likesCount={p.likesCount}/>);


    let onAddPost = (values:AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;

