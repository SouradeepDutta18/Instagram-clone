import React,{useState,useEffect} from 'react'
import MainFeed from "./MainFeed"
import Sidebar from "./Sidebar"

import "./Feed.css"
import { useAuth } from "./contexts/AuthContext"


function Feed() {
      const {currentUser}=useAuth();
      const[ username ,setUsername]= useState(currentUser.email);
      const [email,setEmail] = useState(currentUser.email)
      const [dp,setDp] = useState("https://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png")
      const [posts,setPosts]=useState([]);
    useEffect(()=>{
        async function getdata(){
              const resp_posts = await(fetch("http://127.0.0.1:5000/users"));
              const resp_posts_data = await(resp_posts.json())
              //console.log("resp_posts",resp_posts_data);
              setPosts(resp_posts_data)
              const user_resp = await(fetch(`http://127.0.0.1:5000/${currentUser.email}/metadata`));
              const user_data = await (user_resp.json())
              if(user_data.email!==undefined)
                  setEmail(user_data.email)
             if(user_data.dp!==undefined)
                  setDp(user_data.dp)
             if(user_data.username!==undefined)
                  setUsername(user_data.username)
        }
        getdata();
    },[])
   
          
       
    return (
        <div className="Feed">
            <MainFeed posts={posts}/>
            <Sidebar user={currentUser.email} userimage={dp} username={username}/>
        </div>
    )
}

export default Feed
