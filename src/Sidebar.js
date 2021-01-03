import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import "./Sidebar.css"
import {Link} from "react-router-dom";
import Suggestion from "./Suggestion"
import {useAuth} from './contexts/AuthContext';
//import {useInfo} from "./AppContext"

function Sidebar(props) {
    const {currentUser}=useAuth();
   // const { myposts,dp,email,username,bio} = useInfo();
     const [myposts,setMyPosts] = useState([]);
     const [dp,setDp]=useState("https://treasuresofinnocence.org/wp-content/uploads/2016/11/icon-user-default.png");
     const [email,setEmail]=useState(currentUser.email);
     const [username,setUsername]=useState(currentUser.email);
     const[bio,setbio]=useState("hey i am using insta!");
    
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
        <div className="sidebar">
            <div className="userblock">
            <Link to="/login"><Avatar alt="Remy Sharp" src={`http://127.0.0.1:5000/image/${dp}`}/></Link> 
            <div className="metatext">
              <h5>{username}</h5>
              <p>{email}</p>
            </div>
            </div>
         <h5 className="suggyou">suggestions for you</h5>
            <Suggestion sugguserimage="download.jpg" sugguser="alex" sugg_metatext="Followed by shreyaaasaha + 1 more"/>
            <Suggestion sugguserimage="983712_v9_ba.jpg" sugguser="leomessi" sugg_metatext="Followed by alexis + 5 more"/>
            <Suggestion sugguserimage="maadurga.jpg" sugguser="maa_durga_" sugg_metatext="Followed by rohan + 10 more"/>

        </div>
    )
}

export default Sidebar
