import React,{useState} from 'react'
import HomeIcon from '@material-ui/icons/Home';
import SendIcon from '@material-ui/icons/Send';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import {Link,useHistory} from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import Avatar from '@material-ui/core/Avatar';



import './Header.css';

function Header({dp}) {
  const { logout } = useAuth()
  const[clicked,setclick]=useState(false)
  const [error, setError] = useState("")
  const history = useHistory()
  //const { myposts,dp,email,username,bio} = useInfo();
  //console.log("  myposts,dp,email,username,bio ",myposts,dp,email,username,bio);
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
    return (
        <div className="Header">
            <div className="Header__left">
            <Link to="/"><img className="logo" src="5a4e432a2da5ad73df7efe7a.png" alt="instagram_logo"/>
            </Link>
            </div>
            <div className="Header__middle">
              <input type="text" placeholder="Search"></input>
            </div> 
            <div className="Header__right">
              <div className="icon">
                 <HomeIcon />
              </div>
              <div className="icon">
                <SendIcon />
                </div>
              <div className="icon">
                <ExploreIcon />
              </div>
              <div className="icon">
                <FavoriteBorderIcon />
                </div>
               <div className="icon user_icon_class" onClick={function(e){setclick((prevVal)=>{return !prevVal;})}}>
               
                <Avatar alt="Remy Sharp" src={`http://127.0.0.1:5000/image/${dp}`}  />
               { clicked &&
                <div className="dropdown">
               <div> 
                <Link to="/profile">profile</Link>
                </div>
                 <div onClick={handleLogout}>
                   logout
                 </div>
                </div>
               }

                </div>  

            </div>
        </div>
    )
}

export default Header
