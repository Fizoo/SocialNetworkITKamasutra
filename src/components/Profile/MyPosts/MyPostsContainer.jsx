import {addPostActionCreator} from "../../../Redux/profile_reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";

let mapStateToProps = (state) => {
    return {
        posts: state.profilePage.posts
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost:(myNewPost)=>{
            dispatch(addPostActionCreator(myNewPost))
        }
    }
}

const MyPostsContainer = connect(mapStateToProps,mapDispatchToProps)(MyPosts);
export default MyPostsContainer;