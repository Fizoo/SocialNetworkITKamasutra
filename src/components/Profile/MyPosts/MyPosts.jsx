import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {PostForm} from "./MyPostForm";

const MyPosts = (props) => {
    let postsElements =
        props.posts.map( (p,i) => <Post key={i} message={p.message} likesCount={p.likesCount}/>);


    let onAddPost=(values)=> {
        props.addPost(values.myNewPost1);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <PostForm onSubmit={onAddPost}/>
            </div>
            <div className={s.posts}>
                { postsElements }
            </div>
        </div>
    )
}


export default MyPosts;