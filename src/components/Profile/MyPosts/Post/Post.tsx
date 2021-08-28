import React from 'react';
import s from './Post.module.css';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../../redux/redux-store";


interface PropsType {
    message:string
    likesCount:number
}

const Post:React.FC<PropsType> = (props) => {
  return (
    <div className={s.item}>
      <img src='https://www.google.com/url?sa=i&url=https%3A%2F%2Fteleprogramma.pro%2Fcinema-stop%2F1340979-studiya-warner-bros-gotovitsya-k-rabote-nad-novym-proektom-pro-harli-u3541%2F&psig=AOvVaw1Fon6XXckDVE4S2cFnRm_u&ust=1627723491615000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCOjZj9e8ivICFQAAAAAdAAAAABAJ'
           alt='photo'/>

        { props.message }
          <div>
        <span>like</span> { props.likesCount }
      </div>
    </div>
  )
}

export default Post;