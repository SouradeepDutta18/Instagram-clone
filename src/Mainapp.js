import React,{useState,useEffect} from 'react'
import Header from "./Header"
import Feed from "./Feed"
import {useAuth} from './contexts/AuthContext';
//import {useInfo} from "./AppContext"
//import AppContext from './AppContext'
import "./App.css"
 function Mainapp() {
     const[posts,setPosts]=useState([]);
 
     const {currentUser}=useAuth();
    //  const { myposts,
    //   dp,
    //   email,
    //   username,
    //   bio}=useInfo();
    
     const [myposts,setMyPosts] = useState([]);
     const [dp,setDp]=useState("https://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png");
     const [email,setEmail]=useState(currentUser.email);
     const [username,setUsername]=useState(currentUser.email);
     const[bio,setbio]=useState("hey i am using insta!");
    
   useEffect(() => {
      async function getdata(){
       var resp = await fetch("http://127.0.0.1:5000/users");
       var data = await resp.json();
       setPosts(data);
       resp = await(fetch(`http://127.0.0.1:5000/posts/${currentUser.email}`));
       data = await resp.json();
       const userdata_resp = await(fetch(`http://127.0.0.1:5000/${currentUser.email}/metadata`));
       const userdata = await userdata_resp.json();
       
      //  setMyPosts(data.posts);
      //console.log("data:",data[0].posts);
      setMyPosts(data[0].posts)
      //console.log("userdata",userdata);
      if(userdata.dp !==undefined)
          setDp(userdata.dp)
      if(userdata.username !==undefined)
          setUsername(userdata.username)
      if(userdata.bio !==undefined)
          setbio(userdata.bio)
      if(userdata.email !==undefined)
          setEmail(userdata.email)


      }
     getdata();
      
      
   })
   
   
  // setPosts(allposts)
    //console.log("allposts:",allposts);
    
    return (
      
     
        <div>
      
          <Header dp={dp} />
        <Feed />  
        </div>
    
    )
}

export default Mainapp;
