import React,{useRef} from 'react'
import "./Mymodal.css"
import { useAuth } from "./contexts/AuthContext"
//import ClearIcon from '@material-ui/icons/Clear';

function Mymodal({isModal,modalHandler,updateDp}) {
    const {currentUser}=useAuth();
    var buttonref=useRef();
    var inputref = useRef();
    async function handleSubmit(e){
       e.preventDefault();
       var file = inputref.current.files[0];
       var image = URL.createObjectURL(file);
       updateDp(image);
       var formdata = new FormData();
       formdata.append("file",file);
       formdata.append("user",currentUser.email);
       const options = {
        method: 'POST',
        body: formdata,
        // If you add this, upload won't work
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // }
      };
      var resp = await fetch("http://127.0.0.1:5000/profile/update-image",options);
      var data = await resp.text();
      console.log(data);

    }
 
    return (
        <div className="modal1">
      
        <form onSubmit={handleSubmit} encType="multipart/formdata">
          <div className="modal__option" onClick={(e)=>{var button = buttonref.current; button.click();}}>
            
              <h5 style={{color:"blue"}}>Change profile photo</h5>
              <button type="submit" ref={buttonref} style={{display:"none"}}></button>
             
              
          </div>

          <div className="modal__option">
          <label htmlFor="dp" style={{flex:0}}><h5>Upload photo</h5></label>
          <input type="file" ref={inputref} name="file" id="dp" style={{display:'none'}}></input>
              
          </div>
          <div className="modal__option">
              <h5>Remove current photo</h5>
          </div>
          <div className="modal__option" style={{borderBottom:"0px"}} onClick={modalHandler}>
              <h5 style={{color:"red",cursor:"pointer"}}>cancel</h5>
          </div>
          </form>
           
            
        </div>
    )
}

export default Mymodal
