import React,{useState,useRef,useEffect} from 'react'
import Header from "./Header"
import Avatar from '@material-ui/core/Avatar';
import Mymodal from "./Mymodal"
import { useAuth } from "./contexts/AuthContext"

import "./Editinfo.css"

function Editinfo() {
  const [isModal, setModal]=useState(false);
  const {currentUser}= useAuth();
  const nameref = useRef();
  const usernameref = useRef();
  const emailref = useRef();
  const bioref=useRef();
  const [dp,updateDp]=useState("https://wallpaperaccess.com/full/1331748.png");
  // const { myposts,dp:Dp,email,username,bio} = useInfo();
  //console.log(myposts);
  //const {currentUser}=useAuth();
     const [myposts,setMyPosts] = useState([]);
     //const [dp,setDp]=useState();
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
        if(userdata.dp !==undefined){
        updateDp(userdata.dp)
        console.log(dp);
        }
        if(userdata.username !==undefined)
            setUsername(userdata.username)
        if(userdata.bio !==undefined)
            setbio(userdata.bio)
        if(userdata.email !==undefined)
            setEmail(userdata.email)


       }
       getdata();
      
       
     },[])
  function modalHandler(e){
       setModal(prevVal=>!prevVal);
  }
  async function handle_form_submit(e){
            e.preventDefault();
            var username=usernameref.current.value;
            var email=emailref.current.value;
            var bio=bioref.current.value;
            var data_form={
              username:username,
              email:email,
              bio:bio,
              user:currentUser.email
            };
            var option={
              method:"POST",
              headers:{
                'Content-Type':"application/json"
              },
              body:JSON.stringify(data_form)
            }
            var resp = await fetch("http://127.0.0.1:5000/profile/update-meta",option);
            var data = await resp.text();
            //console.log(data);
  }
    return (
        <div>
            <Header dp={dp}/>
          {
            isModal &&
            <Mymodal isModal={isModal} modalHandler={modalHandler} updateDp={updateDp}/>
          }

      <div className={`container ${isModal ? "hazy" : ""}`}>
          <div className="sidebar_edit">
            <div className="item">Edit profile</div>
            <div className="item">Change password</div>
            <div className="item">Apps and Websites</div>
            <div className="item">Email and SMS</div>
          
          </div>
          <div className="update__form">  
          
            <form onSubmit={handle_form_submit}>
            <div className="super__wrap">
            <div className="edit__dp"> 
            <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5000/image/${dp}`}  />
            </div>
            <div className="edit__meta">
              <p>{username}</p>
              <p id="chngdp" onClick={modalHandler}>change profile photo</p>
            </div>
            </div>
            <div className="form__wrapper">
             <label for="name">Name</label>
             <input type="text" ref={nameref} id="name" name="name"></input>
             </div>
             <div className="form__wrapper">
             <label for="username">Username</label>
             <input type="text" id="username" ref={usernameref} name="username"></input>
             </div>
             <div className="form__wrapper">
             <label for="email">Email</label>
             <input type="text" id="email" ref={emailref} name="email"></input>
             <input type="hidden" name="user" value={currentUser.email}></input>
             </div>

             <div className="form__wrapper">
             <label for="bio">Bio</label>
             <input type="text" id="bio" ref={bioref} name="bio"></input>
             </div>
             <button type="submit">update</button>
             </form>
         
             </div>
        </div>
        </div>
    )
}

export default Editinfo
