import React from 'react'
import "./Post.css"
import Avatar from '@material-ui/core/Avatar';
import SendIcon from '@material-ui/icons/Send';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

function Post(props) {
    return (
        <div className="post">

           <div className="post__title">
           <Avatar alt="Remy Sharp" src={props.userimage}/>
           <p className="user">{props.user}</p>
           </div>
           <div className="image">
            <img src={props.postimage} alt="post_image"></img>
           </div>
           <div className="meta">
           <div className="meta_top">
              <FavoriteBorderIcon/>
              <ChatBubbleOutlineIcon/>
            <div className="send">
            <SendIcon/>
            </div>  
              
              
           </div>
           <div className="meta_description">
            
            <h5 className="like">{props.likes} likes</h5>
            <p><span className="user_caption">{props.user}</span> {props.caption}</p>
            
           
           </div>

           </div>
            
        </div>
         
        )
}

export default Post
