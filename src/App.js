import React from "react"
import Signup from "./components/Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "./contexts/AuthContext"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
//import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import PrivateRoute from "./components/PrivateRoute"
import ForgotPassword from "./components/ForgotPassword"
import UpdateProfile from "./components/UpdateProfile"
import Mainapp from "./Mainapp"
import Profile from "./Profile";
import Editinfo from "./Editinfo";

function App() {
  return (
    
      
        <Router>
          <AuthProvider>
          
            <Switch>
              <PrivateRoute exact path="/" component={Mainapp} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/profile" component={Profile} />
              <PrivateRoute path="/edit" component={Editinfo} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
        
          </AuthProvider>
        </Router>
     
   
  )
}

export default App
