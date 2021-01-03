import React from 'react'
import "./MainFeed.css"
import Button from '@material-ui/core/Button';

import Post from "./Post"
import { useAuth } from "./contexts/AuthContext";

function MainFeed({posts}) {
    //posts=JSON.parse(posts);
    //console.log("posts in Mainfeed",posts);
    //console.log("posts",posts);
    const {currentUser}=useAuth();
    return (
        <div className="mainfeed">
            <form action="http://127.0.0.1:5000/upload" method="POST" encType="multipart/form-data">
            
             <input type="text" name="caption" className="caption_text" placeholder="hey what is on your mind?"></input>
             <input type="file" name="file" className="fileupload"></input>
             <input type="hidden" name="author" value={currentUser.email}></input>
            <div className="btn">
            <Button type="submit" variant="contained" color="primary" >post</Button>

            </div> 
            </form>
            <Post user="liverpoolfc" userimage="download.jpg" postimage="maadurga.jpg" likes="974" caption="Durgapuja 2020"/>
            <Post user="souradeep dutta" userimage="tempsnip.png" postimage="983712_v9_ba.jpg" likes="1974" caption=" GOAT 💪"/>
             {
                 posts.map((post,index)=>{
                     //console.log(post);
                     return(
                         <Post user={post.author} userimage="tempsnip.png"  postimage={`http://127.0.0.1:5000/image/${post.image}`} likes={post.Like} caption={post.caption} key={index}/>
                     )
                 })
             }
        </div>
    )
}

export default MainFeed
