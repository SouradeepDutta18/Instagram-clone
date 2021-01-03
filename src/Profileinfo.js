 import React,{useEffect,useState,useRef} from 'react'
 import Avatar from '@material-ui/core/Avatar';
 import {useAuth} from './contexts/AuthContext';
 import GridOnIcon from '@material-ui/icons/GridOn';
 import "./Profileinfo.css"
 import {Link} from "react-router-dom"
 //import {useInfo} from "./AppContext"
 function Profileinfo() {
     const {currentUser}=useAuth();
     const [myposts,setMyPosts] = useState([]);
     const [dp,setDp]=useState("https://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png");
     const [email,setEmail]=useState(currentUser.email);
     const [username,setUsername]=useState(currentUser.email);
     const[bio,setbio]=useState("hey i am using insta!");
    //const { myposts,dp,email,username,bio} = useInfo();
    
     useEffect(() => {
       async function getdata(){
         console.log("in useeffect");
          const resp = await(fetch(`http://127.0.0.1:5000/posts/${currentUser.email}`));
         const data = await resp.json();
         const userdata_resp = await(fetch(`http://127.0.0.1:5000/${currentUser.email}/metadata`));
         const userdata = await userdata_resp.json();
         
        //  setMyPosts(data.posts);
        console.log("data:",data[0].posts);
        setMyPosts(data[0].posts)
        console.log("userdata",userdata);
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
      
       
     },[])
      
     return (
       <div className="top__wrapper"> 
        <div className="wrapper"> 
         <div className="Profile__info">
        <div className="userpic">
         <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5000/image/${dp}`}  />
         </div> 
        
           <div className="profile__sidebar">
           
             <div className="top__row">
              <p>{username}</p>
            <Link to='/edit'><button>Edit info</button></Link>  
              
             </div>
             <div className="middle__row">
               <p><strong>1</strong>post</p>
               <p><strong>36</strong>followers</p>
               <p><strong>154</strong>following</p>

             </div>
             <div className="bottom__row">
                  <h5 className="user_name_profile">{email}</h5>
                  <p className="status">{bio}</p>
                   
             </div>
           </div>
             
         </div>
         <div className="post__heading">
         <GridOnIcon/>
         <p>
          posts
         </p>
           
         </div>
         <div className="grid">
         

           
           {
            myposts.map((post,index)=>{
              return(
               <div className="item">
               <img src={`http://127.0.0.1:5000/image/${post.image}`} alt=""/>
               </div>
              )
            })  
           }
         </div>
         </div>
         </div>
     )
 }
 
 export default Profileinfo
 